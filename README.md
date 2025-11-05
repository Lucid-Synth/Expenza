# Expenza - Personal Expense Management System

Expenza is a full-stack web application designed to help users track and manage their personal expenses efficiently. With an intuitive interface and robust features, users can monitor their spending habits, generate reports, and maintain better financial control.

## 🚀 Features

- User Authentication & Authorization
- Expense Tracking & Management
- Dashboard with Recent Expenses
- Expense Reports & Analytics
- Data Export Capabilities
- Realistic Expense Card Visualization
- Responsive Design

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite (Build Tool)
- Modern JavaScript (ES6+)
- Tailwind CSS for styling
- Client-side routing

### Backend
- Node.js
- Express.js
- MongoDB (Database)
- JWT for authentication

## 📁 Project Structure

```
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── RealisticExpenseCard.jsx
│   │   │   └── RecentExpensesTable.jsx
│   │   ├── pages/
│   │   │   ├── AddExpense.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   └── App.jsx
│   └── package.json
│
└── Backend/
    ├── controllers/
    │   ├── authController.js
    │   ├── expenseController.js
    │   ├── exportController.js
    │   └── reportController.js
    ├── models/
    │   ├── expenseModel.js
    │   └── userModel.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── expenseRoutes.js
    │   └── reportRoutes.js
    └── server.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Lucid-Synth/Expenza.git
cd Expenza
```

2. Install Backend Dependencies
```bash
cd Backend
npm install
```

3. Install Frontend Dependencies
```bash
cd ../Frontend
npm install
```

4. Set up environment variables
Create a `.env` file in the Backend directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Running the Application

1. Start the Backend Server
```bash
cd Backend
npm start
```

2. Start the Frontend Development Server
```bash
cd Frontend
npm run dev
```

The application will be available at `http://localhost:5173` (Vite's default port)

## 🌐 Deployment

- Frontend is configured for Vercel deployment
- Backend can be deployed to any Node.js hosting service (e.g., Heroku, DigitalOcean)

## 🛡️ License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors

- [Lucid-Synth](https://github.com/Lucid-Synth)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request