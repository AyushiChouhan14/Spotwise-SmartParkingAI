from pydantic import BaseModel

class UserSchema(BaseModel):
    id: int
    name: str
    email: str

class VehicleSchema(BaseModel):
    id: int
    user_id: int
    number_plate: str
    vehicle_type: str

class ParkingSpotSchema(BaseModel):
    id: int
    lender_id: int
    location: str
    latitude: str
    longitude: str
    price_per_hour: int
    total_slots: int
    available_slots: int
    amenities: str
    is_active: bool

class BookingSchema(BaseModel):
    id: int
    user_id: int
    spot_id: int
    vehicle_id: int
    start_time: str
    end_time: str
    status: str
    total_amount: int

class RatingSchema(BaseModel):
    id: int
    user_id: int
    spot_id: int
    booking_id: int
    rating: int
    review: str