import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

import RectanglePractice from '../components/practice/grade-6/Perimeter and Area/Rectangle';
import SquarePractice from '../components/practice/grade-6/Perimeter and Area/Square';
import TrianglePractice from '../components/practice/grade-6/Perimeter and Area/Triangle';
import RegularPolygonPractice from '../components/practice/grade-6/Perimeter and Area/Regular Polygon';
import MixedBagPractice from '../components/practice/grade-6/Perimeter and Area/MixedBag';
import VisualisingNumberSequences from '../components/practice/grade-6/patterns-in-mathematics/VisualisingNumberSequences';
import RelationsAmongNumberSequences from '../components/practice/grade-6/patterns-in-mathematics/RelationsAmongNumberSequences';
import PatternsInShapes from '../components/practice/grade-6/patterns-in-mathematics/PatternsInShapes';
import NumbersCanTellUsThings from '../components/practice/grade-6/number-play/NumbersCanTellUsThings';
import Supercells from '../components/practice/grade-6/number-play/Supercells';
import GrowingPatterns from '../components/practice/grade-6/number-play/GrowingPatterns';
import CollectingAndOrganisingData from '../components/practice/grade-6/DataHandlingAndPresentation/CollectingAndOrganisingData';
import Pictographs from '../components/practice/grade-6/DataHandlingAndPresentation/Pictographs';
import BarGraphs from '../components/practice/grade-6/DataHandlingAndPresentation/BarGraphs';
import DrawingABarGraph from '../components/practice/grade-6/DataHandlingAndPresentation/DrawingABarGraph';
import FigureItOut from '../components/practice/grade-6/DataHandlingAndPresentation/FigureItOut';
import PlayingWithDigits from '../components/practice/grade-6/number-play/PlayingWithDigits';

function grade6Routes() {
    return (
        <>
            <Route path="/middle/grade/6/perimeter-area/rectangle" element={<RectanglePractice />} />
            <Route path="/middle/grade/6/perimeter-area/square" element={<SquarePractice />} />
            <Route path="/middle/grade/6/perimeter-area/triangle" element={<TrianglePractice />} />
            <Route path="/middle/grade/6/perimeter-area/regular-polygon" element={<RegularPolygonPractice />} />
            <Route path="/middle/grade/6/perimeter-area/mixed-bag" element={<MixedBagPractice />} />
            <Route path="/middle/grade/6/patterns-math/intro" element={<VisualisingNumberSequences />} />
            <Route path="/middle/grade/6/patterns-math/relations" element={<RelationsAmongNumberSequences />} />
            <Route path="/middle/grade/6/patterns-math/shapes" element={<PatternsInShapes />} />

            <Route path="/middle/grade/6/number-play/numbers-things" element={<NumbersCanTellUsThings />} />
            <Route path="/middle/grade/6/number-play/supercells" element={<Supercells />} />
            <Route path="/middle/grade/6/number-play/growing-patterns" element={<GrowingPatterns />} />
            <Route path="/middle/grade/6/number-play/playing-with-digits" element={<PlayingWithDigits />} />
            <Route path="/middle/grade/6/data-handling/collecting-organising" element={<CollectingAndOrganisingData />} />
            <Route path="/middle/grade/6/data-handling/pictographs" element={<Pictographs />} />
            <Route path="/middle/grade/6/data-handling/bar-graphs" element={<BarGraphs />} />
            <Route path="/middle/grade/6/data-handling/drawing-a-bar-graph" element={<DrawingABarGraph />} />
            <Route path="/middle/grade/6/data-handling/figure-it-out" element={<FigureItOut />} />
        </>
    );
}

export default grade6Routes;
