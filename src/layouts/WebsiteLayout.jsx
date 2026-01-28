import { Outlet } from 'react-router-dom';
import '../styles/MainLayout.css'; // We'll create this

const MainLayout = () => {
    return (
        <div className="main-layout">
            {/* Header removed as per user request */}

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
