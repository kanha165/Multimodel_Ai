import easyocr
import numpy as np
from PIL import Image
import io


# OCR model load
reader = easyocr.Reader(["en"])


async def extract_text(image_bytes: bytes):
    # Convert bytes to image
    image = Image.open(
        io.BytesIO(image_bytes)
    ).convert("RGB")

    # Convert PIL image to NumPy array
    image_array = np.array(image)

    # Run OCR
    results = reader.readtext(image_array)

    texts = []

    # Filter low-confidence / empty results
    for _, text, confidence in results:

        if confidence >= 0.5 and text.strip():

            texts.append({
                "text": text.strip(),
                "confidence": round(
                    float(confidence), 3
                )
            })

    return texts