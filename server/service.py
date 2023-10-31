import os
from transformers import pipeline
from nltk.tokenize import sent_tokenize

# Construct the absolute file path
base_path = os.path.dirname(os.path.abspath(__file__))


pipe = pipeline("summarization", model="facebook/bart-large-xsum")


async def summarize(full_text: str) -> str:
    pipe_out = pipe(full_text)

    summary_text = "\n".join(sent_tokenize(pipe_out[0]["summary_text"]))
    return summary_text
