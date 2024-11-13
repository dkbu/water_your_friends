from datetime import datetime
from uuid import UUID

from sqlalchemy import create_engine
from sqlmodel import SQLModel, Session, select

from models import User, Friend

def create_user(name: str, session: Session):
    user = User(name=name)
    session.add(user)
    session.commit()
    return user


def add_user_friend(
        user: User, friend_name: str, contact: str, session: Session, last_contacted: datetime = datetime.now()
    ):
    friend = Friend(name=friend_name, contact_links=[contact], last_contacted=last_contacted)
    user.friends.append(friend)
    session.add(user)
    session.add(friend)
    session.commit()
    return user

def get_user_by_name(name: str, session: Session):
    stmt = select(User).where(User.name == name)
    return session.exec(stmt).first()

def get_user_by_uuid(uuuid: UUID, session: Session):
    stmt = select(User).where(User.id == uuuid)
    return session.exec(stmt).first()

def get_user_friends(user: User, name: str, session: Session, limit: int = 3):
    """ Returns a list of user's friends, sorted by last contacted
        :param user: User
        :param name: str
        :param session: Session
        :param limit: optional(int), default=3, max amount of friends to return
    """
    stmt = select(Friend).where(Friend.user_id == user.id).where(Friend.name == name).sort(
        Friend.last_contacted, ascending=True
    ).limit(limit)
    return session.exec(stmt).all()



