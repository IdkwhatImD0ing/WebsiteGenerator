# Basic Fastapi Imports
from app_types import Message, ImageMessage, Conversation
from openai import AsyncOpenAI
from fastapi import FastAPI, Response, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException
from dotenv import load_dotenv

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


@app.post("/chat")
async def text_chat(conversation: Conversation):
    # Message conversion:
    for i in range(len(conversation.messages) - 1):
        # Convert all image messages to messages except the last one
        msg = conversation.messages[i]
        if isinstance(msg, ImageMessage):
            conversation.messages[i] = Message(
                role=msg.role, content=msg.content[0].text
            )

    systemMessage = Message(
        role="system",
        content="""
You are a web development agent specialized in interpreting user inputs to create HTML pages styled with TailwindCSS. 
Your task is to take user descriptions of their desired webpage and convert these descriptions into valid, renderable HTML code using TailwindCSS classes. You should not provide guidance, examples, or suggestions - focus solely on generating the HTML code based on the input given. 
Ensure that all generated HTML is valid and can be rendered correctly with TailwindCSS.
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

        return JSONResponse(
            content=response.choices[0].message.content, status_code=200
        )
    else:
        response = await client.chat.completions.create(
            model="gpt-4-vision-preview",
            messages=conversation.messages,
            max_tokens=2000,
            temperature=0,
        )

        return JSONResponse(
            content=response.choices[0].message.content, status_code=200
        )
