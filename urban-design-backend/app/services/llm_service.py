from huggingface_hub import InferenceClient
import re
import json
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path=".env.local")  # Explicitly load .env.local

HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")

# Your LLM setup
llm_client = InferenceClient(
    provider="novita",
    api_key = HUGGINGFACE_API_KEY,
)

def extract_filter_from_text(user_input):
    prompt = f"""
    Extract the filter from this query: {user_input}. Return a JSON object with
    'attribute' (e.g., height), 'operator' (e.g., >), and 'value' (e.g., 100).
    """
    response = llm_client.chat.completions.create(
        model="moonshotai/Kimi-K2-Instruct",
        messages=[{"role": "user", "content": prompt}],
    )
    content = response.choices[0].message.content

    if content:
        match = re.search(r'\{.*?\}', content, re.DOTALL)
        if match:
            try:
                return json.loads(match.group())
            except json.JSONDecodeError:
                return None
    return None