import { useState, useEffect, useCallback } from 'react';

export const useViolationTracker = (maxViolations = 3, onMaxViolationsReached) => {
    const [violationCount, setViolationCount] = useState(0);
    const [showWarning, setShowWarning] = useState(false);
    const [violationMessage, setViolationMessage] = useState("");

    const handleViolation = useCallback((message) => {
        setViolationCount((prev) => {
            const newCount = prev + 1;
            setViolationMessage(message);
            setShowWarning(true);
            if (newCount >= maxViolations) {
                if (onMaxViolationsReached) {
                    onMaxViolationsReached();
                }
            }
            return newCount;
        });
    }, [maxViolations, onMaxViolationsReached]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                handleViolation("You switched tabs or minimized the window.");
            }
        };

        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                handleViolation("You exited fullscreen mode.");
            }
        };

        const handleContextMenu = (e) => {
            e.preventDefault();
            // Blocking right click as a basic preventative measure
        };

        const handleWindowBlur = () => {
            // We can use blur to catch alt-tab or switching to other windows on some OS
            // but handleVisibilityChange already catches tab switching, and blur can be triggered
            // by clicking within the page on an iframe or devtools. So keeping it simple.
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('contextmenu', handleContextMenu);
        window.addEventListener('blur', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('contextmenu', handleContextMenu);
            window.removeEventListener('blur', handleVisibilityChange);
        };
    }, [handleViolation]);

    // Helper to request fullscreen if needed
    const requestFullscreen = () => {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log("Error attempting to enable fullscreen:", err);
            });
        }
    };

    const dismissWarning = () => {
        setShowWarning(false);
        // User must go back to fullscreen if they dismissed the warning about it
        if (!document.fullscreenElement) {
            requestFullscreen();
        }
    };

    const resetViolations = useCallback(() => {
        setViolationCount(0);
        setShowWarning(false);
        setViolationMessage("");
    }, []);

    return {
        violationCount,
        maxViolations,
        showWarning,
        violationMessage,
        dismissWarning,
        requestFullscreen,
        resetViolations
    };
};
