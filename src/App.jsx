import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PopupNavbar from './components/PopupNavbar';
import Books from './components/Books';
import Users from './components/Users';
import Transactions from './components/Transactions';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
// import AdminDashboard from './AdminDashboard';

const App = () => {
    return (
      <Router>
      {/*  */}
      {/* <AdminDashboard /> */}
        <div className="container mx-auto p-4">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin-navbar" element={<Dashboard />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/books" element={<Books />} />
                <Route path="/users" element={<Users />} />
                <Route path="/transactions" element={<Transactions />} />
            </Routes>
        </div>
    </Router>
    );
};

export default App;
 