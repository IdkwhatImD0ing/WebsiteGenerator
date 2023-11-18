# Basic Fastapi Imports
from fastapi import FastAPI, Response, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException
from dotenv import load_dotenv
load_dotenv()
from os import environ
import json
import async_timeout
import asyncio

from openai import AsyncOpenAI
from app_types import Message, ImageMessage, Conversation

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



async def stream_generator(subscription):
    async with async_timeout.timeout(GENERATION_TIMEOUT_SEC):
        try:
            async for chunk in subscription:
                if(chunk.choices[0].delta.content == None):
                    break
                yield chunk.choices[0].delta.content
        except asyncio.TimeoutError:
            raise HTTPException(status_code=504, detail="Stream timed out")

@app.post("/chat")
async def text_chat(conversation: Conversation):
    # Message conversion:
    for i in range(len(conversation.messages)-1):
        # Convert all image messages to messages except the last one
        msg = conversation.messages[i]
        if isinstance(msg, ImageMessage):
            conversation.messages[i] = Message(role=msg.role, content = msg.content[0].text)
       
    if conversation.type == "text":
        response = await client.chat.completions.create(
            model = "gpt-4-1106-preview",
            messages = conversation.messages,
            max_tokens=2000,
            temperature=0,
        )

        return JSONResponse(content=response.choices[0].message.content, status_code=200)
    else:
        response = await client.chat.completions.create(
            model = "gpt-4-vision-preview",
            messages = conversation.messages,
            max_tokens = 2000,
            temperature = 0,
        )

        return JSONResponse(content=response.choices[0].message.content, status_code=200)






