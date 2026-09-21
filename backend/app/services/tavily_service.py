import os

from dotenv import load_dotenv
from tavily import TavilyClient


load_dotenv()

TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")

if not TAVILY_API_KEY:
    raise ValueError("TAVILY_API_KEY is not set in .env")


client = TavilyClient(api_key=TAVILY_API_KEY)


def search_web(query: str):
    response = client.search(
        query=query,
        search_depth="advanced",
        max_results=5
    )

    return response["results"]