💰 Expense Tracker (Full Stack)
A full-stack Expense Tracker application built using ASP.NET Core (.NET 8) and Angular, designed to manage income, expenses, deductions, and tax calculations with secure authentication.

🚀 Features
🔐 User Authentication (JWT-based Login & Registration)

💸 Expense Management (CRUD APIs)

💰 Income Tracking

🧾 Deduction Module (80C, 80D, HRA, 80E)

📊 Tax Calculation (Old vs New Regime)

📈 Reports & Aggregations (Monthly, Category-wise)

📤 Excel Export (ClosedXML)

👤 Multi-user data isolation

🌐 RESTful API architecture

🏗️ Tech Stack
Backend
ASP.NET Core Web API (.NET 8)

Entity Framework Core

PostgreSQL (Neon DB)

JWT Authentication

BCrypt Password Hashing

Frontend
Angular

TypeScript

Bootstrap / Tailwind (if used)

Tools & Libraries
ClosedXML (Excel export)

Swagger (API testing)

📁 Project Structure
expense_tracker/
│
├── Controllers/
├── Entities/
├── Models/
├── Services/
├── DataBaseContext/
├── Migrations/
├── Program.cs
└── appsettings.json
⚙️ Setup Instructions
🔹 Backend Setup
Clone repository

git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
Install dependencies

dotnet restore
Update database connection in appsettings.json

"ConnectionStrings": {
  "DefaultConnection": "your_postgres_connection"
}
Run migrations

dotnet ef database update
Run API

dotnet run
🔹 Frontend Setup
cd frontend
npm install
ng serve
🔐 Authentication
JWT-based authentication

Token required for protected APIs

Passwords hashed using BCrypt

📡 API Endpoints (Sample)
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login
GET	/api/expense	Get expenses
POST	/api/expense	Add expense
GET	/api/income	Get income
POST	/api/income	Add income
🌍 Deployment
Frontend: Netlify

Backend: Railway

Database: Neon PostgreSQL

🧠 Key Highlights
Clean architecture with layered design

Secure authentication & authorization

Efficient data aggregation using LINQ

Production-ready backend with PostgreSQL

Scalable multi-user system

📌 Future Enhancements
📱 Mobile responsiveness improvements

📊 Advanced analytics dashboard

🤖 AI-based expense insights

🔔 Notifications & reminders

👨‍💻 Author
Rohit Kharade
