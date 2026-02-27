import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

import MatricesChapter from '../components/practice/class-12/MatricesChapter';
import WhoUsesMatrices from '../components/practice/class-12/pages/WhoUsesMatrices';
import WhatIsMatrix from '../components/practice/class-12/pages/WhatIsMatrix';
import WhenDoWeNeedMatrices from '../components/practice/class-12/pages/WhenDoWeNeedMatrices';
import HowOperationsWork from '../components/practice/class-12/pages/HowOperationsWork';
import WhyRulesWork from '../components/practice/class-12/pages/WhyRulesWork';
import WhereApplied from '../components/practice/class-12/pages/WhereApplied';
import InvertibleMatrices from '../components/practice/class-12/pages/InvertibleMatrices';
import MatrixOrderTest from '../components/practice/class-12/tests/MatrixOrderTest';
import MatrixTypesTest from '../components/practice/class-12/tests/MatrixTypesTest';
import MatrixEqualityTest from '../components/practice/class-12/tests/MatrixEqualityTest';
import MatrixOperationsTest from '../components/practice/class-12/tests/MatrixOperationsTest';
import MatrixTransposeTest from '../components/practice/class-12/tests/MatrixTransposeTest';
import InvertibleMatricesTest from '../components/practice/class-12/tests/InvertibleMatricesTest';
import MatricesChapterTest from '../components/practice/class-12/tests/MatricesChapterTest';

function grade12Routes() {
    return (
        <>
            {/* Class 12: Matrices Routes */}
            <Route path="/senior/grade/12/matrices" element={<ProtectedRoute redirectTo="/login"><MatricesChapter /></ProtectedRoute>} />
            <Route path="/senior/grade/12/matrices/who-uses" element={<ProtectedRoute redirectTo="/login"><WhoUsesMatrices /></ProtectedRoute>} />
            <Route path="/senior/grade/12/matrices/what-is" element={<ProtectedRoute redirectTo="/login"><WhatIsMatrix /></ProtectedRoute>} />
            <Route path="/senior/grade/12/matrices/when-need" element={<ProtectedRoute redirectTo="/login"><WhenDoWeNeedMatrices /></ProtectedRoute>} />
            <Route path="/senior/grade/12/matrices/how-operations" element={<ProtectedRoute redirectTo="/login"><HowOperationsWork /></ProtectedRoute>} />
            <Route path="/senior/grade/12/matrices/why-rules" element={<ProtectedRoute redirectTo="/login"><WhyRulesWork /></ProtectedRoute>} />
            <Route path="/senior/grade/12/matrices/where-applied" element={<ProtectedRoute redirectTo="/login"><WhereApplied /></ProtectedRoute>} />
            <Route path="/senior/grade/12/matrices/invertible" element={<ProtectedRoute redirectTo="/login"><InvertibleMatrices /></ProtectedRoute>} />
            <Route path="/senior/grade/12/matrices/test/matrix-order" element={<ProtectedRoute redirectTo="/login"><MatrixOrderTest /></ProtectedRoute>} />
            <Route path="/senior/grade/12/matrices/test/matrix-types" element={<ProtectedRoute redirectTo="/login"><MatrixTypesTest /></ProtectedRoute>} />
            <Route path="/senior/grade/12/matrices/test/matrix-equality" element={<ProtectedRoute redirectTo="/login"><MatrixEqualityTest /></ProtectedRoute>} />
            <Route path="/senior/grade/12/matrices/test/matrix-operations" element={<ProtectedRoute redirectTo="/login"><MatrixOperationsTest /></ProtectedRoute>} />
            <Route path="/senior/grade/12/matrices/test/matrix-transpose" element={<ProtectedRoute redirectTo="/login"><MatrixTransposeTest /></ProtectedRoute>} />
            <Route path="/senior/grade/12/matrices/test/invertible-matrices" element={<ProtectedRoute redirectTo="/login"><InvertibleMatricesTest /></ProtectedRoute>} />
            <Route path="/senior/grade/12/matrices/test" element={<ProtectedRoute redirectTo="/login"><MatricesChapterTest /></ProtectedRoute>} />
        </>
    );
}

export default grade12Routes;
