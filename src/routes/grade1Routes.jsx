// Grade 1 Specialized Components
import { Route } from "react-router-dom";
import ProtectedRoute from '../components/ProtectedRoute';

import Grade1ShapesAndSpace from '../components/practice/grade-1/shapes-and-space';
import Grade1Numbers1to9 from '../components/practice/grade-1/numbers-1-9';
import Grade1Addition from '../components/practice/grade-1/addition';
import Grade1Subtraction from '../components/practice/grade-1/subtraction';
import Grade1Numbers10to20 from '../components/practice/grade-1/numbers-10-20';
import Grade1Time from '../components/practice/grade-1/time';
import Grade1Measurement from '../components/practice/grade-1/measurement';
import Grade1Numbers21to50 from '../components/practice/grade-1/numbers-21-50';
import Grade1DataHandling from '../components/practice/grade-1/data-handling';
import Grade1Patterns from '../components/practice/grade-1/patterns';
import Grade1Numbers51to100 from '../components/practice/grade-1/numbers-51-100';

function grade1Routes() {
    return (
        <>
            {/* Grade 1 Specialized Routes */}
            <Route path="/junior/grade/1/shapes-and-space" element={<ProtectedRoute redirectTo="/login"><Grade1ShapesAndSpace /></ProtectedRoute>} />
            <Route path="/junior/grade/1/numbers-from-one-to-nine" element={<ProtectedRoute redirectTo="/login"><Grade1Numbers1to9 /></ProtectedRoute>} />
            <Route path="/junior/grade/1/addition" element={<ProtectedRoute redirectTo="/login"><Grade1Addition /></ProtectedRoute>} />
            <Route path="/junior/grade/1/subtraction" element={<ProtectedRoute redirectTo="/login"><Grade1Subtraction /></ProtectedRoute>} />
            <Route path="/junior/grade/1/numbers-10-20" element={<ProtectedRoute redirectTo="/login"><Grade1Numbers10to20 /></ProtectedRoute>} />
            <Route path="/junior/grade/1/time" element={<ProtectedRoute redirectTo="/login"><Grade1Time /></ProtectedRoute>} />
            <Route path="/junior/grade/1/measurement" element={<ProtectedRoute redirectTo="/login"><Grade1Measurement /></ProtectedRoute>} />
            <Route path="/junior/grade/1/numbers-from-twenty-one-to-fifty" element={<ProtectedRoute redirectTo="/login"><Grade1Numbers21to50 /></ProtectedRoute>} />
            <Route path="/junior/grade/1/data-handling" element={<ProtectedRoute redirectTo="/login"><Grade1DataHandling /></ProtectedRoute>} />
            <Route path="/junior/grade/1/patterns" element={<ProtectedRoute redirectTo="/login"><Grade1Patterns /></ProtectedRoute>} />
            <Route path="/junior/grade/1/numbers-51-to-100" element={<ProtectedRoute redirectTo="/login"><Grade1Numbers51to100 /></ProtectedRoute>} />
        </>
    );
}

export default grade1Routes;