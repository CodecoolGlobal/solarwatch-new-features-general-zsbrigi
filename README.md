# SolarWatch

## Overview

**SolarWatch** is a full-stack web application developed using Java Spring Boot. It allows users to register or login, select a city from a predefined list, and choose a past date. The application then provides the sunrise and sunset times for that specific date and location. This tool is perfect for those who need historical solar data for various purposes.

## Getting Started

### Prerequisites

Ensure the following are installed:

- Java 17
- Maven 3.9+
- Docker
- PostgreSQL
- Node.js and npm (for the frontend)


### Installation
  To set up the project locally:
1. Clone the repository from GitHub into your desired folder:
```bash
   git clone https://github.com/CodecoolGlobal/solarwatch-new-features-general-zsbrigi

   # navigate into the project directory
   cd <foldername>
   ```
2. Backend Setup:
   - Navigate to the backend directory:
     ```bash
      cd backend_solarwatch
     ```

     - Build the project:
     ```bash
      mvn clean install
     ```
   - Set environment variables:
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
       *JWT Secret key should be 64 characters long.*

   - Run the application:
     ```bash
      mvn spring-boot:run
     ```

3. Frontend Setup:
   - Navigate to the frontend directory:
     ```bash
      cd ../frontend
     ```

   - Install dependencies:
     ```bash
      npm install
     ```

   - Start the development server:
       ```bash
        npm run dev
       ```


## Features
 ### Dockerization
  - The application is fully containerized using Docker.
  - Docker Compose manages multi-container setups, including the PostgreSQL database.
  - To run the application with Docker Compose:
    - Set environment variables in `docker-compose.yaml`.
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
         *JWT Secret key should be 64 characters long.*
    - Build and start the containers:
        ```bash
         docker compose up --build
        ```

### User Management
  - User Registration and Authentication using Spring Security and JWT tokens.
  - Features include:
    - User Registration: Allows new users to sign up.
    - Authentication: Users log in to receive a JWT token.
    - Authorization: Secures endpoints to authenticated users.
    - Role-based Access Control: Differentiates between user and admin roles.

### Frontend Integration
  - Built with React-Vite.
  - Features include:
    - RESTful API integration for smooth data exchange between frontend and backend.
    - Client-side routing with React Router for multiple pages.

### Integration Testing
  - Comprehensive integration tests using MockMvc and Mockito.
  - Tests cover API calls and database interactions to ensure system reliability.

## Usage
Using Solar Watch:
   - Register an Account:
      - Detail: Sign up to create a new account.
      ![singUpImage](.//ReadmeImages/register.png)
   - Login:
      - Use your credentials to log in.
      ![loginImage](.//ReadmeImages/login.png)
   - Sunrise and Sunset Data Retrieval:
      - Users can search for sunrise and sunset data for a specific city and date.
      ![sunriseSunsetImage](.//ReadmeImages/sunrisesunset.png)


## Technologies
Technologies used in this application:
  - Backend: Spring Boot, Spring MVC, Spring Data, JPA, Spring Security, Hibernate, PostgreSQL
  - Frontend: React-Vite, Vanilla css
  - Containerization: Docker

