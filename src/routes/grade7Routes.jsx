import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

import Percentage from '../components/practice/class-7/comparing quantities/Percentage';
import UseOfPercentages from '../components/practice/class-7/comparing quantities/UseOfPercentages';
import ProfitAndLoss from '../components/practice/class-7/comparing quantities/ProfitAndLoss';
import SimpleInterest from '../components/practice/class-7/comparing quantities/SimpleInterest';
import ExponentsBasics from '../components/practice/class-7/exponents and powers/ExponentsBasics';
import LawsOfExponents7 from '../components/practice/class-7/exponents and powers/LawsOfExponents';
import DecimalNumberSystem from '../components/practice/class-7/exponents and powers/DecimalNumberSystem';
import StandardForm from '../components/practice/class-7/exponents and powers/StandardForm';
import ComparingQuantitiesTest from '../components/practice/class-7/comparing quantities/ComparingQuantitiesTest';
import ExponentsPowersTest from '../components/practice/class-7/exponents and powers/ExponentsPowersTest';
import NeedForRationalNumbers from '../components/practice/class-7/rational numbers/NeedForRationalNumbers';
import WhatAreRationalNumbers from '../components/practice/class-7/rational numbers/WhatAreRationalNumbers';
import PositiveNegativeRationalNumbers from '../components/practice/class-7/rational numbers/PositiveNegativeRationalNumbers';
import RationalNumbersNumberLine from '../components/practice/class-7/rational numbers/RationalNumbersNumberLine';
import RationalNumbersStandardForm from '../components/practice/class-7/rational numbers/RationalNumbersStandardForm';
import ComparisonOfRationalNumbers from '../components/practice/class-7/rational numbers/ComparisonOfRationalNumbers';
import RationalNumbersBetween from '../components/practice/class-7/rational numbers/RationalNumbersBetween';
import OperationsOnRationalNumbers from '../components/practice/class-7/rational numbers/OperationsOnRationalNumbers';
import RationalNumbersTest from '../components/practice/class-7/rational numbers/RationalNumbersTest';
import PlaneFiguresSolidShapes from '../components/practice/class-7/visualising solid shapes/PlaneFiguresSolidShapes';
import FacesEdgesVertices from '../components/practice/class-7/visualising solid shapes/FacesEdgesVertices';
import NetsBuilding3DShapes from '../components/practice/class-7/visualising solid shapes/NetsBuilding3DShapes';
import DrawingSolids from '../components/practice/class-7/visualising solid shapes/DrawingSolids';
import ViewingSections from '../components/practice/class-7/visualising solid shapes/ViewingSections';
import VisualisingSolidShapesTest from '../components/practice/class-7/visualising solid shapes/VisualisingSolidShapesTest';
import LineSymmetry from '../components/practice/class-7/symmetry/LineSymmetry';
import RegularPolygonsSymmetry from '../components/practice/class-7/symmetry/RegularPolygonsSymmetry';
import MirrorReflectionSymmetry from '../components/practice/class-7/symmetry/MirrorReflectionSymmetry';
import RotationalSymmetry from '../components/practice/class-7/symmetry/RotationalSymmetry';
import LineRotationalRelationship from '../components/practice/class-7/symmetry/LineRotationalRelationship';
import SymmetryTest from '../components/practice/class-7/symmetry/SymmetryTest';
import Formation from '../components/practice/class-7/algebraic expressions/Formation';
import TermsFactors from '../components/practice/class-7/algebraic expressions/TermsFactors';
import Coefficients from '../components/practice/class-7/algebraic expressions/Coefficients';
import LikeUnlikeTerms from '../components/practice/class-7/algebraic expressions/LikeUnlikeTerms';
import Polynomials from '../components/practice/class-7/algebraic expressions/Polynomials';
import FindingValue from '../components/practice/class-7/algebraic expressions/FindingValue';
import AlgebraicExpressionsTest from '../components/practice/class-7/algebraic expressions/AlgebraicExpressionsTest';
import AreaParallelogram from '../components/practice/class-7/perimeter area/AreaParallelogram';
import AreaTriangle from '../components/practice/class-7/perimeter area/AreaTriangle';
import Circles from '../components/practice/class-7/perimeter area/Circles';
import PerimeterAreaTest from '../components/practice/class-7/perimeter area/PerimeterAreaTest';

function grade7Routes() {
    return (
        <>
            <Route path="/middle/grade/7/comparing-quantities/percentage" element={<Percentage />} />
            <Route path="/middle/grade/7/comparing-quantities/use-of-percentages" element={<UseOfPercentages />} />
            <Route path="/middle/grade/7/comparing-quantities/profit-and-loss" element={<ProfitAndLoss />} />
            <Route path="/middle/grade/7/comparing-quantities/simple-interest" element={<SimpleInterest />} />

            <Route path="/middle/grade/7/exponents-and-powers/basics" element={<ExponentsBasics />} />
            <Route path="/middle/grade/7/exponents-and-powers/laws" element={<LawsOfExponents7 />} />
            <Route path="/middle/grade/7/exponents-and-powers/decimal-system" element={<DecimalNumberSystem />} />
            <Route path="/middle/grade/7/exponents-and-powers/standard-form" element={<StandardForm />} />

            {/* Chapter Tests */}
            <Route path="/middle/grade/7/comparing-quantities/chapter-test" element={<ComparingQuantitiesTest />} />
            <Route path="/middle/grade/7/exponents-and-powers/chapter-test" element={<ExponentsPowersTest />} />

            {/* Rational Numbers */}
            <Route path="/middle/grade/7/rational-numbers/need" element={<NeedForRationalNumbers />} />
            <Route path="/middle/grade/7/rational-numbers/what" element={<WhatAreRationalNumbers />} />
            <Route path="/middle/grade/7/rational-numbers/positive-negative" element={<PositiveNegativeRationalNumbers />} />
            <Route path="/middle/grade/7/rational-numbers/number-line" element={<RationalNumbersNumberLine />} />
            <Route path="/middle/grade/7/rational-numbers/standard-form" element={<RationalNumbersStandardForm />} />
            <Route path="/middle/grade/7/rational-numbers/comparison" element={<ComparisonOfRationalNumbers />} />
            <Route path="/middle/grade/7/rational-numbers/between" element={<RationalNumbersBetween />} />
            <Route path="/middle/grade/7/rational-numbers/operations" element={<OperationsOnRationalNumbers />} />
            <Route path="/middle/grade/7/rational-numbers/chapter-test" element={<RationalNumbersTest />} />

            {/* Visualising Solid Shapes */}
            <Route path="/middle/grade/7/visualising-solid-shapes/plane-figures-solid-shapes" element={<PlaneFiguresSolidShapes />} />
            <Route path="/middle/grade/7/visualising-solid-shapes/faces-edges-vertices" element={<FacesEdgesVertices />} />
            <Route path="/middle/grade/7/visualising-solid-shapes/nets" element={<NetsBuilding3DShapes />} />
            <Route path="/middle/grade/7/visualising-solid-shapes/drawing-solids" element={<DrawingSolids />} />
            <Route path="/middle/grade/7/visualising-solid-shapes/viewing-sections" element={<ViewingSections />} />
            <Route path="/middle/grade/7/visualising-solid-shapes/chapter-test" element={<VisualisingSolidShapesTest />} />

            {/* Symmetry */}
            <Route path="/middle/grade/7/symmetry/line-symmetry" element={<LineSymmetry />} />
            <Route path="/middle/grade/7/symmetry/regular-polygons" element={<RegularPolygonsSymmetry />} />
            <Route path="/middle/grade/7/symmetry/mirror-reflection" element={<MirrorReflectionSymmetry />} />
            <Route path="/middle/grade/7/symmetry/rotational" element={<RotationalSymmetry />} />
            <Route path="/middle/grade/7/symmetry/relationship" element={<LineRotationalRelationship />} />
            <Route path="/middle/grade/7/symmetry/chapter-test" element={<SymmetryTest />} />

            {/* Algebraic Expressions */}
            <Route path="/middle/grade/7/algebraic-expressions/formation" element={<Formation />} />
            <Route path="/middle/grade/7/algebraic-expressions/terms-factors" element={<TermsFactors />} />
            <Route path="/middle/grade/7/algebraic-expressions/coefficients" element={<Coefficients />} />
            <Route path="/middle/grade/7/algebraic-expressions/like-unlike" element={<LikeUnlikeTerms />} />
            <Route path="/middle/grade/7/algebraic-expressions/polynomials" element={<Polynomials />} />
            <Route path="/middle/grade/7/algebraic-expressions/finding-value" element={<FindingValue />} />
            <Route path="/middle/grade/7/algebraic-expressions/chapter-test" element={<AlgebraicExpressionsTest />} />



            {/* Perimeter and Area */}
            <Route path="/middle/grade/7/perimeter-area/parallelogram" element={<AreaParallelogram />} />
            <Route path="/middle/grade/7/perimeter-area/triangle" element={<AreaTriangle />} />
            <Route path="/middle/grade/7/perimeter-area/circles" element={<Circles />} />
            <Route path="/middle/grade/7/perimeter-area/chapter-test" element={<PerimeterAreaTest />} />
        </>
    );
}

export default grade7Routes;
