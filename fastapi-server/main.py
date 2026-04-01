from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
import uvicorn

app = FastAPI()

# Static files
static_dir = "static"
app.mount("/static", StaticFiles(directory=static_dir))

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
)

# Route to check health
@app.get("/")
def read_root():
    return JSONResponse({"status": "ok", "ollama": "reachable"}, 200)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)