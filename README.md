# 🛠️ Local Service Find
<img src="screenshot/lsf.jpg" />

**Local Service Find** is a web application that allows users to **search for local service professionals** (plumbers, electricians, cleaners, etc.) based on **location** and **service type**.  
This project was **developed by me** and handed over to a **B.Tech student of Mohandas College of Engineering and Technology** as a **mini project**.

---

## 🧰 Technologies Used

- **Backend**: Node.js, Express.js  
- **Database**: PostgreSQL with Prisma ORM  
- **Frontend**: Bootstrap 5 Dashboard UI  
- **Authentication**: JWT (JSON Web Tokens)  
- **Architecture**: MVC (Model-View-Controller)  
- **Session Handling**: Express Middleware  

---

## 📸 Project Screenshot 
<img src="screenshot/localhost_3000_ (3).png" />

---

## 🎯 Key Features

### 👤 Customer Module
- Register and login securely with JWT
- Search for service providers by location and category
- Book a service provider
- Rate the service after completion
- Lodge complaints if the service was not satisfactory

### 🧑‍🔧 Employee Module
- Register and login to access a personal dashboard
- View bookings received from customers
- Track ratings and reviews
- Respond to complaints (if applicable)

### ⚠️ Intelligent Filtering Logic
- Employees with **consistently low ratings** are **automatically hidden** from the public service list.
- Employees with **frequent complaints** are **disabled from being booked**.

---

## 🔐 Authentication

All sensitive routes and dashboards are protected using **JWT authentication** to ensure secure access.

---

## 🔧 Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/local-service-find.git
cd local-service-find

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Add your database and JWT secret details

# Setup database with Prisma
npx prisma migrate dev

# Start the server
npm start
