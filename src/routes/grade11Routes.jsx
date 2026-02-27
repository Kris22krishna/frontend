import { Route } from 'react-router-dom';

import CellStructureTest from '../components/practice/class-11/biology/CellStructureTest';
import BiologyChapters from '../components/practice/class-11/biology/BiologyChapters';


function grade11Routes() {
    return (
        <>
            {/* Class 11 Biology */}
            <Route path="/senior/grade/11/biology" element={<BiologyChapters />} />
            <Route path="/senior/grade/11/biology/cell-structure" element={<CellStructureTest />} />
            {/* Placeholder routes for other Grade 11 subjects */}
            {/*
        <Route path="/senior/grade/11/chemistry" element={<ComingSoon />} />
        <Route path="/senior/grade/11/physics" element={<ComingSoon />} />
        <Route path="/senior/grade/11/maths" element={<ComingSoon />} />
        */}
        </>
    );
}

export default grade11Routes;
