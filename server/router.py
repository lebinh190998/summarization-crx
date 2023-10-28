from fastapi import APIRouter, FastAPI, Body, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from schema import TextSummarizeBody
from service import summarize

router = APIRouter(
    prefix="/summarize",
    tags=["summarize"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def health_check():
    return JSONResponse(content={"health": "good"})


@router.post("/")
async def text_summarize(body: TextSummarizeBody = Body(...)):
    try:
        data = jsonable_encoder(body)
        full_text = data.get('full_text')
        if full_text is None or full_text == "":
            raise HTTPException(
                status_code=500, detail="No text to summarize")

        print("full text:", full_text)
        summarized_text = await summarize(full_text)
        return JSONResponse(content={"summarized_text": summarized_text})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


def init_app(app: FastAPI):
    app.include_router(router)
