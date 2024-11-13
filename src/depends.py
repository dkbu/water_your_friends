from sqlalchemy.orm import sessionmaker
from sqlmodel import Session, create_engine, SQLModel


# TODO: 
def connect_to_db():
    sqlite_file_name = "database.db"
    sqlite_url = f"sqlite:///{sqlite_file_name}"

    connect_args = {"check_same_thread": False}
    return create_engine(sqlite_url, connect_args=connect_args)

engine = connect_to_db()
sessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def create_db_and_tables(engine):
    SQLModel.metadata.create_all(engine)


def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()
