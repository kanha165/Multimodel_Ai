import io
from PIL import Image

_reader = None

def get_reader():
    global _reader
    if _reader is None:
        import easyocr
        _reader = easyocr.Reader(["en"])
    return _reader


async def extract_text(image_bytes: bytes):
    try:
        import numpy as np
        reader = get_reader()
    except Exception as e:
        raise RuntimeError(f"OCR service unavailable: {str(e)}")

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