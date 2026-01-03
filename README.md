# 🚗 Vehicle Rental System

Vehicle Rental System একটি role-based backend system, যেখানে customers গাড়ি বুক করতে পারে এবং admins বুকিং ম্যানেজ ও vehicle return হ্যান্ডেল করতে পারে।
এই প্রজেক্টটি clean architecture, business rules enforcement, এবং secure authentication অনুসরণ করে তৈরি।

---

## 🎯 Project Overview
A backend API for a vehicle rental management system that handles:

- Vehicles - Manage vehicle inventory with availability tracking
- Customers - Manage customer accounts and profiles
- Bookings - Handle vehicle rentals, returns and cost calculation
- Authentication - Secure role-based access control (Admin and Customer roles)

---

## ✨ Features
🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access (customer, admin)

🚘 Vehicle Management
- Vehicle create, update, delete (Admin only)
- Vehicle availability tracking

📅 Booking Management
- Customer booking creation
- Customer booking cancellation
- Admin booking return handling
- Automatic vehicle availability update on return

🛡 Business Rules
- Customers can only cancel bookings
- Admins can only mark bookings as returned
- Booking & vehicle consistency ensured

---

## 🛠️ Technology Stack
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/-Express.js-000000?style=flat-square&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)
![node-postgres](https://img.shields.io/badge/-node--pg-336791?style=flat-square&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/-JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![bcryptjs](https://img.shields.io/badge/-bcryptjs-003A8F?style=flat-square&logo=security&logoColor=white)
![dotenv](https://img.shields.io/badge/-dotenv-ECD53F?style=flat-square&logo=dotenv&logoColor=black)
![TSX](https://img.shields.io/badge/-TSX-3178C6?style=flat-square&logo=typescript&logoColor=white)

---

## ⚙️ Setup Instructions
1. Clone the Repository
```bash
git clone https://github.com/MizanRbf/level2-assignment-2.git
cd level2-assignment-2
```
2️. Install Dependencies
```bash
npm install
```
3️. Environment Variables
Create a .env file in the root directory:
env
Replace PORT,CONNECTION_STR, and JWT_SECRET with your own values.

4. Running the Application
Development Mode
```bash
npm run dev
```
5. Production build
```bash
npm run build
```
6. Production deploy
   ```bash
   vercel --prod
   ```
---

## 🔗 Live URL:
👉 [Click here](https://level2-assignment-2-olive-three.vercel.app/)




