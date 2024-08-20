# SolarWatch

## Overview

**SolarWatch** is a full-stack web application developed using Java Spring Boot. It allows users to register or login, select a city from a predefined list, and choose a
past date. The application then provides the sunrise and sunset times for that specific date and location. This tool is
perfect for those who need historical solar data for various purposes.

## Features

- **User Registration:** Users can create an account and log in securely.
- **City Selection:** Users can select a city from a list of predefined locations.
- **Date Selection:** Users can choose a past date to retrieve sunrise and sunset times.
- **Data Retrieval:** The system displays the sunrise and sunset times for the selected city and date.

## Technology Stack

### Frontend

- **React.js:** A JavaScript library for building user interfaces.

### Backend

- **Java Spring:** A comprehensive framework for building enterprise-level applications.
- **Spring Data JPA:** For managing data persistence with PostgreSQL in a seamless and efficient manner.
- **Java Security:** Ensures secure user authentication and authorization.
- **Docker Compose:** Facilitates the setup and orchestration of the development environment.
- **PostgreSQL:** A relational database system used to store user data, city information, and historical solar data.

## Installation and Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (for frontend)
- **Java JDK** (for backend)
- **Docker and Docker Compose** (for containerization)
- **PostgreSQL** (if not using Docker)

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/CodecoolGlobal/solarwatch-new-features-general-zsbrigi
   cd solarWatch
   ```

2. **Frontend Setup:**

   Navigate to the `frontend` directory:

   ```bash
   cd frontend_solarwatch
   npm install
   npm start
   ```

   This will start the React development server on `http://localhost:3000`.

3. **Backend Setup:**

   Navigate to the `backend` directory:

   ```bash
   cd backend_solarwatch
   ./mvnw clean install
   ```

   You can start the Spring Boot application using:

   ```bash
   ./mvnw spring-boot:run
   ```

   The backend will run on `http://localhost:8080`.

4. **Database Setup:**

   If you are using Docker Compose, simply run:

   ```bash
   docker-compose up
   ```

   This will set up the PostgreSQL database automatically.

   If you prefer to set up PostgreSQL manually, ensure that your `application.properties` or `application.yml` file is
   configured with the correct database credentials.

5. **Accessing the Application:**

   Once both frontend and backend are running, you can access the application via your web browser
   at `http://localhost:3000`.

## Usage

1. **Register:** Create an account using the registration form.
2. **Login:** Log in with your credentials.
3. **Select a City and Date:** Choose a city from the list and a past date to retrieve the sunrise and sunset times.
4. **View Results:** The application will display the sunrise and sunset times for the selected city and date.
