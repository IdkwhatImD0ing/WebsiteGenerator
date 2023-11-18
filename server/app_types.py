from pydantic import BaseModel
from typing import List, Union
from typing_extensions import TypedDict

class Message(BaseModel):
    role: str
    content: str

class TextItem(TypedDict):
    type: str
    text: str

class ImageUrl(TypedDict):
    url: str

class ImageItem(TypedDict):
    type: str
    image_url: ImageUrl

ItemTypes = Union[TextItem, ImageItem]

class ImageMessage(BaseModel):
    role: str
    content: List[ItemTypes]

MessageTypes = Union[Message, ImageMessage]

class Conversation(BaseModel):
    type: str
    messages: List[MessageTypes]