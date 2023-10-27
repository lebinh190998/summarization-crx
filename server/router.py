from fastapi import APIRouter, FastAPI, UploadFile
from service import predict
from fastapi.responses import JSONResponse

router = APIRouter(
    prefix="/summarize",
    tags=["summarize"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def health_check():
    return JSONResponse(content={"breed": "YES"})


@router.post("/")
async def summarize(full_text: str):
    try:
        print("full text:", full_text)
        return full_text
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


def init_app(app: FastAPI):
    app.include_router(router)
