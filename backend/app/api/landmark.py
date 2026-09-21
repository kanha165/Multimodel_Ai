from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.landmark_service import identify_landmark


router = APIRouter(
    prefix="/landmark",
    tags=["Landmark"]
)


ALLOWED_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp"
}


@router.post("/identify")
async def identify(
    file: UploadFile = File(...)
):

    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, PNG and WEBP images are allowed"
        )

    image_bytes = await file.read()

    result = await identify_landmark(
        image_bytes=image_bytes,
        mime_type=file.content_type
    )

    return {
        "filename": file.filename,
        "landmark": result
    }