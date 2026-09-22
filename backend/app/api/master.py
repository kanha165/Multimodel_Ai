from fastapi import APIRouter, UploadFile, File, Form, HTTPException

from app.services.master_analyzer_service import master_analyze


router = APIRouter(
    prefix="/analyze",
    tags=["Master AI"]
)


ALLOWED_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp"
}


@router.post("/")
async def analyze_image(
    file: UploadFile = File(...),
    question: str = Form("")
):
    # Validate image type
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, PNG and WEBP images are allowed"
        )

    # Read image
    image_bytes = await file.read()

    if not image_bytes:
        raise HTTPException(
            status_code=400,
            detail="Image file is empty"
        )

    # Master AI analysis
    result = await master_analyze(
        image_bytes=image_bytes,
        mime_type=file.content_type,
        question=question
    )

    return {
        "filename": file.filename,
        "question": question,
        "result": result
    }