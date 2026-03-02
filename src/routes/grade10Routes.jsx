import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

import IntroductionToLinearEquations from '../components/practice/class-10/Pair of linear equations in two variables/IntroductionToLinearEquations';
import GraphicalMethod from '../components/practice/class-10/Pair of linear equations in two variables/GraphicalMethod';
import AlgebraicMethods from '../components/practice/class-10/Pair of linear equations in two variables/AlgebraicMethods';
import ConditionsForConsistency from '../components/practice/class-10/Pair of linear equations in two variables/ConditionsForConsistency';
import ApplicationProblems from '../components/practice/class-10/Pair of linear equations in two variables/ApplicationProblems';
import StandardFormEquations from '../components/practice/class-10/Pair of linear equations in two variables/StandardFormEquations';
import RecognisingPatterns from '../components/practice/class-10/Arithmetic Progressions/RecognisingPatterns';
import UnderstandingAP from '../components/practice/class-10/Arithmetic Progressions/UnderstandingAP';
import IdentifyingTerms from '../components/practice/class-10/Arithmetic Progressions/IdentifyingTerms';
import FindingSpecificTerms from '../components/practice/class-10/Arithmetic Progressions/FindingSpecificTerms';
import SumOfTerms from '../components/practice/class-10/Arithmetic Progressions/SumOfTerms';
import ArithmeticProgressionsTest from '../components/practice/class-10/Arithmetic Progressions/ArithmeticProgressionsTest';
import PairOfLinearEquationsTest from '../components/practice/class-10/Pair of linear equations in two variables/PairOfLinearEquationsTest';
import FoundationsQuadratic from '../components/practice/class-10/Quadratic Equations/FoundationsQuadratic';
import RepresentingSituations from '../components/practice/class-10/Quadratic Equations/RepresentingSituations';
import IdentifyingQuadratic from '../components/practice/class-10/Quadratic Equations/IdentifyingQuadratic';
import RootsByFactorisation from '../components/practice/class-10/Quadratic Equations/RootsByFactorisation';
import WordProblemsFactorisation from '../components/practice/class-10/Quadratic Equations/WordProblemsFactorisation';
import NatureOfRoots from '../components/practice/class-10/Quadratic Equations/NatureOfRoots';
import DiscriminantAnalysis from '../components/practice/class-10/Quadratic Equations/DiscriminantAnalysis';
import RealLifeApplications from '../components/practice/class-10/Quadratic Equations/RealLifeApplications';
import QuadraticEquationsTest from '../components/practice/class-10/Quadratic Equations/QuadraticEquationsTest';

// Class 10: Real Numbers
import RealNumberFoundations from '../components/practice/class-10/Real Numbers/RealNumberFoundations';
import EuclidsDivision from '../components/practice/class-10/Real Numbers/EuclidsDivision';
import PrimeFactorisation from '../components/practice/class-10/Real Numbers/PrimeFactorisation';
import FundamentalTheoremArithmetic from '../components/practice/class-10/Real Numbers/FundamentalTheoremArithmetic';
import HCFandLCM from '../components/practice/class-10/Real Numbers/HCFandLCM';
import HCFLCMApplications from '../components/practice/class-10/Real Numbers/HCFLCMApplications';
import ProvingIrrationality from '../components/practice/class-10/Real Numbers/ProvingIrrationality';
import IrrationalOperations from '../components/practice/class-10/Real Numbers/IrrationalOperations';
import RealNumbersTest from '../components/practice/class-10/Real Numbers/RealNumbersTest';

function grade10Routes() {
    return (
        <>
            {/* Class 10: Pair of Linear Equations Routes */}
            <Route path="/high/practice/10011" element={<GraphicalMethod />} />
            <Route path="/high/practice/10012" element={<GraphicalMethod />} />
            <Route path="/high/practice/10021" element={<GraphicalMethod />} />
            <Route path="/high/practice/10022" element={<ConditionsForConsistency />} />
            <Route path="/high/practice/10031" element={<IntroductionToLinearEquations />} />
            <Route path="/high/practice/10041" element={<StandardFormEquations />} />
            <Route path="/high/practice/10051" element={<AlgebraicMethods />} />
            <Route path="/high/practice/10052" element={<AlgebraicMethods />} />
            <Route path="/high/practice/10053" element={<AlgebraicMethods />} />
            <Route path="/high/practice/10054" element={<AlgebraicMethods />} />
            <Route path="/high/practice/10055" element={<AlgebraicMethods />} />
            <Route path="/high/practice/1209" element={<PairOfLinearEquationsTest />} />
            {/* Class 10: Arithmetic Progressions Routes */}
            <Route path="/high/practice/10101" element={<RecognisingPatterns />} />
            <Route path="/high/practice/10102" element={<UnderstandingAP />} />
            <Route path="/high/practice/10103" element={<IdentifyingTerms />} />
            <Route path="/high/practice/10104" element={<FindingSpecificTerms />} />
            <Route path="/high/practice/10105" element={<SumOfTerms />} />
            <Route path="/high/practice/1208" element={<ArithmeticProgressionsTest />} />
            {/* Class 10: Quadratic Equations Routes */}
            <Route path="/high/practice/10201" element={<FoundationsQuadratic />} />
            <Route path="/high/practice/10202" element={<RepresentingSituations />} />
            <Route path="/high/practice/10203" element={<IdentifyingQuadratic />} />
            <Route path="/high/practice/10204" element={<RootsByFactorisation />} />
            <Route path="/high/practice/10205" element={<WordProblemsFactorisation />} />
            <Route path="/high/practice/10206" element={<NatureOfRoots />} />
            <Route path="/high/practice/10207" element={<DiscriminantAnalysis />} />
            <Route path="/high/practice/10208" element={<RealLifeApplications />} />
            <Route path="/high/practice/1207" element={<QuadraticEquationsTest />} />

            {/* Class 10: Real Numbers Routes */}
            <Route path="/high/practice/10201" element={<RealNumberFoundations />} />
            <Route path="/high/practice/10202" element={<EuclidsDivision />} />
            <Route path="/high/practice/10203" element={<PrimeFactorisation />} />
            <Route path="/high/practice/10204" element={<FundamentalTheoremArithmetic />} />
            <Route path="/high/practice/10205" element={<HCFandLCM />} />
            <Route path="/high/practice/10206" element={<HCFLCMApplications />} />
            <Route path="/high/practice/10207" element={<ProvingIrrationality />} />
            <Route path="/high/practice/10208" element={<IrrationalOperations />} />
            <Route path="/high/practice/1206" element={<RealNumbersTest />} />
        </>
    );
}

export default grade10Routes;
