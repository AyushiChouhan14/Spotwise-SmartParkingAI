from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)

class Vehicle(Base):
    __tablename__ = "vehicles"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    number_plate = Column(String)
    vehicle_type = Column(String)

class ParkingSpot(Base):
    __tablename__ = "parking_spots"
    id = Column(Integer, primary_key=True)
    lender_id = Column(Integer)
    location = Column(String)
    latitude = Column(String)
    longitude = Column(String)
    price_per_hour = Column(Integer)
    total_slots = Column(Integer)
    available_slots = Column(Integer)
    amenities = Column(String)
    is_active = Column(Boolean)

class Booking(Base):
    __tablename__ = "bookings"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    spot_id = Column(Integer)
    vehicle_id = Column(Integer)
    start_time = Column(String)
    end_time = Column(String)
    status = Column(String)
    total_amount = Column(Integer)

class Rating(Base):
    __tablename__ = "ratings"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    spot_id = Column(Integer)
    booking_id = Column(Integer)
    rating = Column(Integer)
    review = Column(String)