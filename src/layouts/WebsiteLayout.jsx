import { Outlet } from 'react-router-dom';
import '../styles/MainLayout.css'; // We'll create this

const MainLayout = () => {
    return (
        <div className="main-layout">
            {/* Header will go here */}
            <header className="main-header">
                <div className="logo">Learner's Hub</div>
                <nav>
                    {/* Navigation links */}
                </nav>
            </header>

            <main className="content-wrapper">
                <Outlet />
            </main>

            <footer className="main-footer">
                <p>&copy; {new Date().getFullYear()} Learner's Hub. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default MainLayout;
