from fastapi import APIRouter, FastAPI
from service import summarize
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
async def text_summarize(full_text: str):
    try:
        print("full text:", full_text)
        summarized_text = await summarize(full_text)
        return summarized_text
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


def init_app(app: FastAPI):
    app.include_router(router)
