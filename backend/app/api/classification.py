from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.classification_service import classify_image

router = APIRouter(
    prefix="/classification",
    tags=["Classification"]
)

ALLOWED_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp"
}


@router.post("/analyze")
async def classify(
    file: UploadFile = File(...)
):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, PNG and WEBP images are allowed"
        )

    image_bytes = await file.read()

    result = await classify_image(
        image_bytes=image_bytes,
        mime_type=file.content_type
    )

    return {
        "filename": file.filename,
        "classification": result
    }