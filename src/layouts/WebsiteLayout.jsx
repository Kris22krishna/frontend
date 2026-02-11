import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/MainLayout.css'; // We'll create this

const MainLayout = () => {
    return (
        <div className="main-layout">
            <Navbar />

            <main className="content-wrapper" style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
                <Outlet />
            </main>

            <footer className="main-footer">
                <p>&copy; {new Date().getFullYear()} skill00.ai. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default MainLayout;
