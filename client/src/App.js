import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Компоненты
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';

// Страницы
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ApplicationPage from './pages/ApplicationPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ContentEditor from './pages/admin/ContentEditor';
import ApplicationsList from './pages/admin/ApplicationsList';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/apply" element={<ApplicationPage />} />
            
            {/* Защищенные маршруты для администратора */}
            <Route path="/admin" element={<AdminRoute />}>
              <Route path="" element={<AdminDashboard />} />
              <Route path="content" element={<ContentEditor />} />
              <Route path="applications" element={<ApplicationsList />} />
            </Route>
            
            {/* Маршрут для несуществующих страниц */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
};

export default App; 