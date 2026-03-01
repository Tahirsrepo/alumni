🎓 College Alumni & Placement Management System

A Full-Stack Enterprise Web Application for Centralized Alumni & Placement Management

🚀 Overview

The College Alumni & Placement Management System is a full-stack web-based platform designed to streamline alumni records, student–alumni engagement, and placement activities within a centralized and secure system.

Built using a modern RESTful client–server architecture, the platform ensures scalability, security, and performance while providing seamless user experience across roles.

🏗️ System Architecture
Client (React + Vite)
        │
        ▼
REST APIs (Spring Boot)
        │
        ▼
MySQL Database
Layer	Technology
Frontend	React (Vite), Tailwind CSS
Backend	Spring Boot (REST API)
Database	MySQL
Authentication	JWT
Architecture	Client–Server (RESTful)
🔐 Core Features
👤 Role-Based Access

Admin

Alumni

Student

🔑 Secure Authentication

JWT-based login

Role-based authorization

Encrypted passwords

Protected API endpoints

🎓 Alumni Management

Profile registration & updates

Job opportunity browsing

Placement tracking

💼 Placement Management

Add placement drives

Post job opportunities

Track placement statistics

Administrative dashboard control

🖥️ Hardware Requirements
Component	Minimum
Processor	Intel i5 / AMD Ryzen 5+
RAM	8 GB (16 GB Recommended)
Storage	10 GB Free Space
Network	Stable Internet
OS	Windows 10+, macOS, Linux
💻 Software Requirements
🔹 Backend Stack
Software	Version
Java (JDK)	17
Spring Boot	3.3.4
Maven	3.9+
MySQL	8.0+
IDE	IntelliJ / Eclipse / VS Code
🔹 Frontend Stack
Software	Version
Node.js	18+
npm	9+
React	19.1.1
Vite	5+
Axios	1.12.2
Tailwind CSS	4.1.16
📂 Project Structure
College-Alumni-Placement-Management-System/
│
├── BackEnd/
│   ├── src/main/java/com/ATME/College/Alumni/
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── pom.xml
│   └── mvnw
│
├── FontEnd/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── System Arc/
└── README.md
⚙️ Backend Configuration
🗄 Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/alumni_db
spring.datasource.username=root
spring.datasource.password=root

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
🔐 JWT Configuration
jwt.secret=your_super_long_and_complex_secret_key_for_atme_alumni_system_2025!
jwt.expiration=86400000
▶️ How the System Works
1️⃣ User Access

Users access the system via the React frontend.

2️⃣ Authentication Flow

User logs in

Backend validates credentials

JWT token generated

Token stored client-side

Secured API access enabled

3️⃣ Data Processing

Spring Data JPA handles ORM

Hibernate auto-creates/updates tables

MySQL stores all system data

4️⃣ Communication

Axios handles HTTP requests

REST APIs exchange JSON

JWT protects secured endpoints

🧪 Testing

Backend API testing → Postman

Frontend testing → Browser

Database validation → MySQL Workbench

🚀 How to Run the Project
🔹 Backend Setup
cd BackEnd
./mvnw spring-boot:run

Backend URL:

http://localhost:8080
🔹 Frontend Setup
cd FontEnd
npm install
npm run dev

Frontend URL:

http://localhost:5173
🔒 Security Highlights

✔ JWT Authentication
✔ Role-Based Access Control
✔ Password Encryption
✔ Secured REST APIs

📈 Future Enhancements

Email Notifications

Resume Upload & Verification

Analytics Dashboard

Cloud Deployment (AWS / Azure)

Mobile App Integration

👨‍💻 Developed Using

Java & Spring Boot

React.js & Tailwind CSS

MySQL

REST APIs

JWT Security

🌟 Project Vision

To create a scalable, secure, and modern digital bridge between students, alumni, and institutional placement management — empowering data-driven academic networking.