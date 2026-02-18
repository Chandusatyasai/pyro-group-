# Todo Application - Full Stack (Spring Boot + React)

A simple Todo application with Spring Boot backend and React frontend.

## Project Structure

```
sai/
├── sai/                    # Spring Boot Backend
│   └── src/main/java/com/sai/sai/
│       ├── controller/     # REST Controllers
│       ├── service/        # Business Logic
│       ├── Repository/     # Data Access Layer
│       ├── entity/         # JPA Entities
│       └── dto/            # Data Transfer Objects
└── frontend/               # React Frontend
    └── src/
        ├── components/     # React Components
        └── App.js         # Main App Component
```

## Backend Setup (Spring Boot)

### Prerequisites
- Java 17 or higher
- Maven 3.6+

### Run Backend
```bash
cd sai
./mvnw spring-boot:run
```

Or on Windows:
```bash
cd sai
mvnw.cmd spring-boot:run
```

The backend will run on `http://localhost:8080`

### API Endpoints
- `GET /api/todos` - Get all todos (optional query param: `?completed=true/false`)
- `GET /api/todos/{id}` - Get todo by id
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/{id}` - Update a todo
- `DELETE /api/todos/{id}` - Delete a todo

### H2 Console
Access H2 database console at: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: (empty)

## Frontend Setup (React)

### Prerequisites
- Node.js 14+ and npm

### Install Dependencies
```bash
cd frontend
npm install
```

### Run Frontend
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Features

### Backend
- ✅ RESTful API with proper conventions
- ✅ H2 in-memory database
- ✅ JPA/Hibernate for data persistence
- ✅ Input validation (title is mandatory)
- ✅ Clean architecture (Controller/Service/Repository/DTO)
- ✅ CORS enabled for React frontend
- ✅ Global exception handling with proper error responses
- ✅ DTO pattern for update requests

### Frontend
- ✅ Display list of todos
- ✅ Add new todo
- ✅ Mark todo as complete/incomplete
- ✅ Delete todo
- ✅ Update todo (inline edit)
- ✅ Filter todos by status (All/Active/Completed)
- ✅ Clean, functional UI
- ✅ Error handling with user-friendly messages
- ✅ Loading states for better UX
- ✅ Proper date formatting

## Todo Entity Fields
- `id` - Auto-generated
- `title` - Mandatory
- `description` - Optional
- `completed` - Boolean (default: false)
- `createdAt` - Auto-generated timestamp

