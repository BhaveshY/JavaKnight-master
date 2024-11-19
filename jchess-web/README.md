# JChess Web

A web-based version of JChess, allowing players to play chess online. The application is built using Spring Boot for the backend and React for the frontend, with WebSocket support for real-time game updates.

## Architecture

The application is split into two main components:

1. Backend (Spring Boot)
   - RESTful API for game management
   - WebSocket support for real-time game updates
   - Core chess game logic

2. Frontend (React)
   - Modern web interface
   - Real-time game board updates
   - WebSocket client for live game state

## Prerequisites

- Docker
- Docker Compose

## Running the Application

1. Clone the repository
2. Navigate to the project directory
3. Run the application using Docker Compose:

```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost
- Backend API: http://localhost:8080/api

## API Endpoints

- `POST /api/games` - Create a new game
- `GET /api/games/{gameId}` - Get game state
- `POST /api/games/{gameId}/start` - Start a game
- WebSocket endpoint for moves: `/ws/games/{gameId}/move`

## Development

### Backend Development

```bash
cd backend
./mvnw spring-boot:run
```

### Frontend Development

```bash
cd frontend
npm install
npm start
```

## License

This project is licensed under the same terms as the original JChess project.
