from typing import List
from uuid import uuid4, UUID

from sqlalchemy.orm import Relationship
from sqlmodel import DateTime, Field, SQLModel

class User(SQLModel, table=True):
    __tablename__ = "users"

    id: UUID = Field(primary_key=True, default=uuid4())
    name: str
    friends: List["Friend"] = Relationship(back_populates="user")

class Friend(SQLModel, table=True):
    __tablename__ = "Friends"

    id: UUID = Field(primary_key=True, default=uuid4())
    user: Relationship["User"] = Field(foreign_key="user.id")
    name: str
    contact_links: List[str]
    last_contacted: DateTime


