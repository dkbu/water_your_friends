from uuid import UUID

from fastapi import FastAPI, Request, Depends
from sqlmodel import Session

from src.depends import get_db
from src.db_service import get_user_by_uuid, get_user_friends

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Friendship is magic"}


@app.get("/user/{user_id}/friends")
async def get_user_friendlist(request: Request, user_id: UUID, name: str, db: Session = Depends(get_db)):
    """ Returns a list of user's friends, sorted by last contacted """
    user = get_user_by_uuid(user_id, db)
    friends = get_user_friends(user, name, db)

    return {"user": user.name, "friends": {f.name: (f.last_contact, f.contact_list) for f in friends}}

