# 🧠 Jadwill Back-End API

This is the complete Node.js + Express.js + MongoDB (Atlas) back-end implementation for the Jadwill tourism platform. It includes RESTful API endpoints for Tourists, Tour Guides, Activity Providers, and Admins.

---

## 📦 Base URL

```
http://localhost:5000/api/
```

---

## 🧍 Tourists

- **POST `/tourists`** – Add a new tourist  
- **GET `/tourists`** – Get all tourists

### Example POST (JSON):
```json
{
  "name": "Amina Laznam",
  "email": "amina@jadwill.com"
}
```

---

## 🧭 Tour Guides

- **POST `/guides`** – Add a new tour guide  
- **GET `/guides`** – Get all guides

### Example POST (JSON):
```json
{
  "name": "Sara Al-Guide",
  "email": "sarah@jadwill.com",
  "bio": "Desert and historical tour specialist",
  "phone": "0551234567"
}
```

---

## 🏕 Activity Providers

- **POST `/providers`** – Add a new activity provider  
- **GET `/providers`** – Get all providers

### Example POST (JSON):
```json
{
  "name": "AdventureCo",
  "email": "contact@adventureco.com",
  "services": "Hiking, Camping",
  "phone": "0509876543"
}
```

---

## 👨‍💼 Admins

- **POST `/admins`** – Add a new admin  
- **GET `/admins`** – Get all admins

### Example POST (JSON):
```json
{
  "username": "admin",
  "password": "admin123"
}
```

---

## 🚀 Running the Server Locally

1. **Navigate to the backend folder:**
```bash
cd backend
```

2. **Install the dependencies:**
```bash
npm install
```

3. **Create a `.env` file** in the `backend/` folder:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
PORT=5000
```

4. **Start the development server:**
```bash
npm run dev
```

The server should run at:  
```
http://localhost:5000
```

---

## 🧪 Testing the API with Postman

You can use [Postman](https://www.postman.com/downloads/) to test the API endpoints.

### Example steps:
- Set method to **POST**
- URL: `http://localhost:5000/api/tourists`
- Body → raw → JSON:
```json
{
  "name": "Amina",
  "email": "amina@example.com"
}
```

---

## 📁 Folder Structure

```
backend/
├── models/
│   ├── Tourist.js
│   ├── Guide.js
│   ├── Provider.js
│   └── Admin.js
│
├── controllers/
│   ├── touristController.js
│   ├── guideController.js
│   ├── providerController.js
│   └── adminController.js
│
├── routes/
│   ├── touristRoutes.js
│   ├── guideRoutes.js
│   ├── providerRoutes.js
│   └── adminRoutes.js
│
├── config/
│   └── db.js
│
├── .env
├── server.js
├── package.json
└── README.md
```

