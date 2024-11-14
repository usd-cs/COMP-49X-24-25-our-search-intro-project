# COMP 491 Intro Project by the OUR SEARCH Team
## About
This introductory project is a basic web forum where users can create posts and comments on posts. This project involves three functional requirements, such as allowing all users to view text-based posts, authenticated users to create posts and comments, and admins to delete posts and comments. It features a graphical interface and software frameworks that the OUR SEARCH team plans to use for their upcoming SEARCH project: client/server with React.js and Java Spring with a relational database. The project serves as a tool for its developers to gain experience with Agile processes and their chosen software framework.

## Prerequisites
This project will not be formally deployed, but if you want to work on it on your local machine:
* Visual Studio Code is ideal for the frontend
* IntelliJ is ideal for the backend
* MySQL 
* Frontend: node.js, Material UI
* Backend: Java, Spring Web, Spring JPA

## Installation

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Set Up MySQL Connection**
   - (a) Start a MySQL server locally or run a Docker container on port 3306:
     ```bash
     docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:latest
     ```
   - (b) Create a database called `forum`:
     ```sql
     CREATE DATABASE forum;
     ```

3. **Install Node.js** (if not already installed)
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```

4. **Configure Backend Database Connection**
   - In the backend, open `src/main/resources/application.properties` and configure the MySQL settings:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/forum
     spring.datasource.username=root
     spring.datasource.password=root
     ```

5. **Build and Run the Backend Application**
   - Go to the backend directory:
     ```bash
     cd ../backend
     ```
   - Build the project with Gradle:
     ```bash
     ./gradlew build
     ```
   - Run the Spring Boot application:
     ```bash
     ./gradlew bootRun
     ```

6. **Run the Frontend Application**
   - Go back to the frontend directory:
     ```bash
     cd ../frontend
     ```
   - Start the frontend server:
     ```bash
     npm start
     ```

## Contact 
[COMP-49X-24-25-our-search](https://github.com/orgs/usd-cs/teams/comp-49x-24-25-our-search) team on GitHub