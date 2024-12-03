import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/navabr';
import Home from './pages/home';
import LibrarianManagement from './pages/librarianManagement';
import BookManagement from './pages/bookManagement';
import BookBorrow from './pages/bookBorrow';
import BookBorrowedPage from './pages/bookBorrowedPage';
import Register from './pages/register';
import Login from './pages/login';
import Profile from './pages/profile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/librarian-management" element={<LibrarianManagement />} />
          <Route path="/book-management" element={<BookManagement />} />
          <Route path="/book-borrow" element={<BookBorrow />} />
          <Route path="/book-borrow-page" element={<BookBorrowedPage />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
