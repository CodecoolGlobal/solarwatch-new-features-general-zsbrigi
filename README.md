# SolarWatch

## Overview

**SolarWatch** is a full-stack web application developed using Java Spring Boot. It allows users to register or login, select a city from a predefined list, and choose a past date. The application then provides the sunrise and sunset times for that specific date and location. This tool is perfect for those who need historical solar data for various purposes.

## Getting Started

### Prerequisites

#### To Run the Project with Docker:
- Docker

#### To Run Backend and Frontend Separately:
- Java 17
- Maven 3.9+
- PostgreSQL
- Node.js and npm (for the frontend)

### Installation

#### Running the Project with Docker
1. Clone the repository:
   ```bash
   git clone https://github.com/CodecoolGlobal/solarwatch-new-features-general-zsbrigi
   cd <foldername>
   ```

2. Set environment variables in `docker-compose.yaml`:
   ```bash
   # db env variables
   POSTGRES_DB=YOUR_DB_NAME
   POSTGRES_USER=YOUR_DB_USERNAME
   POSTGRES_PASSWORD=YOUR_DB_PASSWORD

   ## backend env variables
   SPRING_DATASOURCE_USERNAME=YOUR_DB_USERNAME
   SPRING_DATASOURCE_PASSWORD=YOUR_DB_PASSWORD
   CODECOOL_APP_JWTSECRET=YOUR_JWT_SECRET_KEY
   ```
   *JWT Secret key should be 64 characters long and not contain illegal characters like `-`.*

3. Build and start the containers:
   ```bash
   docker compose up --build
   ```

   *Docker will automatically set up the database and run the backend and frontend services.*

#### Running Backend and Frontend Separately

##### Backend Setup:
1. Navigate to the backend directory:
   ```bash
   cd backend_solarwatch
   ```

2. Build the project:
   ```bash
   mvn clean install
   ```

3. Set environment variables:
   - If running locally, you must create the PostgreSQL database on your machine and set the connection details.
   - Option 1: Using PowerShell
     ```bash
     $env:DATABASE_URL="jdbc:postgresql://localhost:5432/solarWatch"
     $env:DATABASE_USERNAME="YOUR_DATABASE_USERNAME"
     $env:DATABASE_PASSWORD="YOUR_DATABASE_PASSWORD"
     $env:JWTSECRETKEY="YOUR_JWT_SECRET_KEY"
     ```

   - Option 2: Using Command Prompt
     ```bash
     set DATABASE_URL=jdbc:postgresql://localhost:5432/solarWatch
     set DATABASE_USERNAME=YOUR_DATABASE_USERNAME
     set DATABASE_PASSWORD=YOUR_DATABASE_PASSWORD
     set JWTSECRETKEY=YOUR_JWT_SECRET_KEY
     ```

4. Run the application:
   ```bash
   mvn spring-boot:run
   ```

##### Frontend Setup:
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Features

### Dockerization
- The application is fully containerized using Docker.
- Docker Compose manages the PostgreSQL database, backend, and frontend services.
- Running with Docker Compose eliminates the need to manually create the database or configure environment variables locally.

### User Management
- User Registration and Authentication using Spring Security and JWT tokens.
- Includes role-based access control with user and admin roles.

### Frontend Integration
- Built with React-Vite, featuring RESTful API integration and client-side routing using React Router.

### Integration Testing
- Integration tests cover API calls and database interactions to ensure system reliability.

## Usage

1. **Register an Account**:
   - Sign up to create a new account.
     ![signUpImage](.//ReadmeImages/register.png)

2. **Login**:
   - Use your credentials to log in.
     ![loginImage](.//ReadmeImages/login.png)

3. **Retrieve Sunrise and Sunset Data**:
   - Select a city and date to get solar data.
     ![sunriseSunsetImage](.//ReadmeImages/sunrisesunset.png)

## Git History

This project was developed over multiple sprints, with different features being worked on in separate repositories. This may result in an unconventional Git history structure. The separate sprint-based repositories were later consolidated into a single repository.
1. **First Sprint**: Created the project, implemented API-based data retrieval, and wrote unit tests.
2. **Second Sprint**: Integrated Spring Data JPA for database communication.
3. **Third Sprint**: Added Spring Security for user login and registration, along with a React frontend.
4. **Final Sprint**: Dockerized the project and added integration tests.


## Technologies
- **Backend**: Spring Boot, Spring MVC, Spring Data, JPA, Spring Security, Hibernate, PostgreSQL
- **Frontend**: React-Vite, Vanilla CSS
- **Containerization**: Docker