from fastapi import (
    APIRouter,
    UploadFile,
    File,
    HTTPException,
    Form
)
from app.services.vision_service import analyze_image



router = APIRouter(
    prefix="/vision",
    tags=["Vision"]
)


ALLOWED_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp"
}


@router.post("/analyze")
async def analyze(
    file: UploadFile = File(...),
    question: str = Form(
        "What is in this image?"
    )
):

    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, PNG and WEBP images are allowed"
        )

    image_bytes = await file.read()

    answer = await analyze_image(
        image_bytes=image_bytes,
        mime_type=file.content_type,
        question=question
    )

    return {
        "filename": file.filename,
        "question": question,
        "answer": answer
    }