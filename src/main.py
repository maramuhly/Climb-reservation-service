from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api import reserve, park_selection

app = FastAPI()

# CORS 설정 추가
origins = [
    "http://localhost:3000",  # 로컬 개발 환경
    "https://climb-reservation-service.vercel.app",  # 배포된 Vercel 도메인
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 특정 출처를 허용합니다.
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드를 허용합니다.
    allow_headers=["*"],  # 모든 HTTP 헤더를 허용합니다.
)

app.include_router(reserve.router)
app.include_router(park_selection.router)

@app.get("/")
async def health_check():
    return {"message": "CLIMB"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
