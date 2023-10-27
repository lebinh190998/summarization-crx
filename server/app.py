from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pkgutil
import importlib
import os
import inspect
import os
import asyncio
from router import init_app

CURRENT_DIR = os.path.dirname(os.path.realpath(__file__))


def app_init() -> FastAPI:
    app = FastAPI()

    origins = ["*"]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=["Content-Disposition"],
        max_age=600,
    )
    app.add_middleware(ClientDisconnectMiddleware)

    init_app(app)

    return app


def load_modules(app: FastAPI = None) -> None:
    current_file = inspect.getfile(inspect.currentframe())
    package_name = os.path.basename(os.path.dirname(current_file))
    package_path = os.path.join(package_name, "routers")

    # Discover and include routers dynamically
    for _, module_name, _ in pkgutil.iter_modules([package_path]):
        module = importlib.import_module(
            f"{package_name}.routers.{module_name}")
        init_app = getattr(module, "init_app", None)
        if init_app:
            init_app(app)


# ensures that the server can detect and handle client disconnections properly
class ClientDisconnectMiddleware:
    def __init__(self, app):
        self._app = app

    async def __call__(self, scope, receive, send):
        loop = asyncio.get_running_loop()
        rv = loop.create_task(self._app(scope, receive, send))
        waiter = None
        cancelled = False
        if scope["type"] == "http":

            def add_close_watcher():
                nonlocal waiter

                async def wait_closed():
                    nonlocal cancelled
                    while True:
                        message = await receive()
                        if message["type"] == "http.disconnect":
                            if not rv.done():
                                cancelled = True
                                rv.cancel()
                            break

                waiter = loop.create_task(wait_closed())

            scope["add_close_watcher"] = add_close_watcher
        try:
            await rv
        except asyncio.CancelledError:
            if not cancelled:
                raise
        if waiter and not waiter.done():
            waiter.cancel()
