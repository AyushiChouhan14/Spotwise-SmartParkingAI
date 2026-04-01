from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)
    password = Column(String)
    phone = Column(String)
    role = Column(String)

engine = create_engine("mysql+pymysql://user:password@localhost/db_name")
Session = sessionmaker(bind=engine)
session = Session()