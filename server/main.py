# Basic Fastapi Imports
from app_types import Conversation
from app_types import ImageMessage
from app_types import Message
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi import Response
from fastapi import status
from fastapi.exceptions import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from openai import AsyncOpenAI

load_dotenv()

GENERATION_TIMEOUT_SEC = 60

client = AsyncOpenAI()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def extract_html(content):
    """

    :param content:

    """
    if "```html" in content:
        # Split the content by ```html and take the second part
        after_html = content.split("```html", 1)[1]
        # Now split by ``` and take the first part
        code_block = after_html.split("```", 1)[0]
        return code_block.strip()
    else:
        return "No HTML code block found"


@app.post("/chat")
async def text_chat(conversation: Conversation):
    # Message conversion:
    for i in range(len(conversation.messages) - 1):
        # Convert all image messages to messages except the last one
        msg = conversation.messages[i]
        if isinstance(msg, ImageMessage):
            conversation.messages[i] = Message(role=msg.role,
                                               content=msg.content[0].text)

    systemMessage = Message(
        role="system",
        content="""
You are a web development agent specialized in interpreting user inputs to create HTML pages styled with TailwindCSS.
Your task is to take user descriptions of their desired webpage and convert these descriptions into valid, renderable HTML code using TailwindCSS classes. You should not provide guidance, examples, or suggestions - focus solely on generating the HTML code based on the input given.
Ensure that all generated HTML is valid and can be rendered correctly with TailwindCSS. You will be given the current HTML code that the user has written. Always return the complete code, not just the code to add on. Also do not include markdown in your response. Only include the HTML.
Do not give an introduction or explanation. Just give the code.
""",
    )

    # Insert into beginning of conversation
    conversation.messages.insert(0, systemMessage)

    if conversation.type == "text":
        response = await client.chat.completions.create(
            model="gpt-4-1106-preview",
            messages=conversation.messages,
            max_tokens=2000,
            temperature=0,
        )

        return JSONResponse(content=extract_html(
            response.choices[0].message.content),
                            status_code=200)
    else:
        response = await client.chat.completions.create(
            model="gpt-4-vision-preview",
            messages=conversation.messages,
            max_tokens=2000,
            temperature=0,
        )

        return JSONResponse(content=extract_html(
            response.choices[0].message.content),
                            status_code=200)
