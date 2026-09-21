from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.plant_service import identify_plant


router = APIRouter(
    prefix="/plant",
    tags=["Plant"]
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

    result = await identify_plant(
        image_bytes=image_bytes,
        mime_type=file.content_type
    )

    return {
        "filename": file.filename,
        "plant": result
    }