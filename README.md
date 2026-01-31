# Smart Travel Itinerary Planner – Frontend

This is the **frontend** of the Smart Travel Itinerary Planner application, built using **React.js**.  
It allows users to create, view, update, and delete travel itineraries through a clean UI.

---

## 🚀 Tech Stack

- React.js
- Axios
- HTML5
- CSS3
- JavaScript (ES6)
- Node.js & npm

---

## 📌 Features

- View all travel itineraries
- Add a new itinerary
- Update existing itinerary
- Delete itinerary
- Connects with Spring Boot backend via REST API

---

## 📂 Project Structure

src/
├── api/
│ └── api.js
├── components/
├── App.js
├── index.js

yaml
Copy code

---

## ⚙️ Setup & Run

### 1️⃣ Install dependencies
```bash
npm install
2️⃣ Start React app
bash
Copy code
npm start
3️⃣ Access application
arduino
Copy code
http://localhost:3000
🔗 Backend Connection

axios.get("http://localhost:8080/api/itineraries");
