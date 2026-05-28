import React, { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';
import Sidebar from './components/Sidebar';

function App() {
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState('dashboard');

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard': return <Dashboard />;
            case 'patients': return <Patients />;
            case 'doctors': return <Doctors />;
            case 'appointments': return <Appointments />;
            default: return <Dashboard />;
        }
    };

    if (!user) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                onLogout={handleLogout}
            />
            <div style={{ flex: 1, backgroundColor: '#f0f2f5', overflow: 'auto' }}>
                {renderPage()}
            </div>
        </div>
    );
}

export default App;