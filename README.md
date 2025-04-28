# Personal Budget Tracker with M-Pesa Integration 📊💸

Track your daily income and expenses, view beautiful monthly analytics, and automatically record M-Pesa transactions received or spent!

---

## 🚀 Features
- 📈 Monthly and yearly financial analysis (Charts + Graphs)
- 💵 Track income and expenses by category
- 🔒 Secure user authentication (JWT Tokens)
- 📲 M-Pesa Daraja API integration (Auto-track payments)
- 📁 Export financial reports (PDF/Excel)
- ⚙️ Settings panel to customize categories
- 🧹 Clean, modern UI (built with React)

---

## 🛠️ Tech Stack
**Frontend**
    * React.js
    * Chart.js

**Backend**
    * Node.js
    * Express

**Database**
    * MongoDB Atlas
    * Mongoose ORM

**APIs**
    * Axios
    * M-Pesa Daraja API

---

## 📂 Project Structure
```plaintext
personal-budget-tracker/
├── client/ (React Frontend)
├── server/ (Node.js Backend)
├── LICENCE
├── .env
├── README.md
```

## ⚙️ Setup Instructions
1. Clone the repo
```
git clone https://github.com/your-username/personal-budget-tracker.git
cd personal-budget-tracker
```

2. Install server dependencies
```
cd server
npm install
```

3. Install client dependencies
cd client
npm install

4. Configure Environment Variables
Create a .env file in both /client and /server:
Example server `.env`

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
MPESA_CONSUMER_KEY=your_mpesa_key
MPESA_CONSUMER_SECRET=your_mpesa_secret
MPESA_SHORTCODE=your_shortcode
MPESA_PASSKEY=your_passkey
```

5. Run the app
