import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

import MultiplicationPractice from '../components/practice/class-5/WaystoMultiplyandDivide/Multiplication/multiplication_of_2_digit_numbers';
import MultiplicationPractice3D from '../components/practice/class-5/WaystoMultiplyandDivide/Multiplication/multiplication_of_3_digit_numbers';
import MultiplicationPracticeMultiple from '../components/practice/class-5/WaystoMultiplyandDivide/Multiplication/multiplication_of_multiple_numbers';
import MultiplicationEndingZero from '../components/practice/class-5/WaystoMultiplyandDivide/Multiplication/multiplication_of_numbers_ending_in_zeros';
import MultiplicationWordProblems from '../components/practice/class-5/WaystoMultiplyandDivide/Multiplication/multiplication_word_problems';
import DivisionPracticeOneDigit from '../components/practice/class-5/WaystoMultiplyandDivide/Division/divide_one_digit_number';
import DivisionPracticeTwoDigit from '../components/practice/class-5/WaystoMultiplyandDivide/Division/divide_by_two_digit_number';
import DivisionEndingZero from '../components/practice/class-5/WaystoMultiplyandDivide/Division/divide_numbers_ending_zeros';
import DivisionWordProblems from '../components/practice/class-5/WaystoMultiplyandDivide/Division/division_word_problems';
import MultiDivWordProblems from '../components/practice/class-5/WaystoMultiplyandDivide/Skill_application_problems/skill_application_problems';

import PlaceValuesOfDecimals from '../components/practice/class-5/TenthsandHundrendths/Decimals/place-values-of-decimals';
import FractionToDecimalConversion from '../components/practice/class-5/TenthsandHundrendths/Decimals/fraction-to-decimal-conversion';
import DecimalVisualRepresentation from '../components/practice/class-5/TenthsandHundrendths/Decimals/decimal-visual-representation';
import DecimalInMeasurement from '../components/practice/class-5/TenthsandHundrendths/Decimals/decimal-in-measurement';
import DecimalInMoney from '../components/practice/class-5/TenthsandHundrendths/Decimals/decimal-in-money';
import ComparingDecimals from '../components/practice/class-5/TenthsandHundrendths/Decimals/comparing-decimals';
import DecimalOperations from '../components/practice/class-5/TenthsandHundrendths/Decimals/decimal-operations';
import ConversionBetweenForms from '../components/practice/class-5/TenthsandHundrendths/Decimals/conversion-between-forms';
import DecimalWordProblems from '../components/practice/class-5/TenthsandHundrendths/SkillApplicationProb/skill_app_prob_decimal';

import FindingArea from '../components/practice/class-5/AreaanditsBoundary/Area/FindingArea';
import CompareShapesSameArea from '../components/practice/class-5/AreaanditsBoundary/Area/CompareShapesSameArea';
import AreaRealLife from '../components/practice/class-5/AreaanditsBoundary/Area/AreaRealLife';
import AppropriateAreaUnits from '../components/practice/class-5/AreaanditsBoundary/Area/AppropriateAreaUnits';
import FindingPerimeter from '../components/practice/class-5/AreaanditsBoundary/Perimeter/FindingPerimeter';
import PerimeterAsBoundary from '../components/practice/class-5/AreaanditsBoundary/Perimeter/PerimeterAsBoundary';
import SamePerimeterDifferentShapes from '../components/practice/class-5/AreaanditsBoundary/Perimeter/SamePerimeterDifferentShapes';
import PerimeterRealLife from '../components/practice/class-5/AreaanditsBoundary/Perimeter/PerimeterRealLife';
import AreaPerimeterRelationship from '../components/practice/class-5/AreaanditsBoundary/AreaPerimeterRelationship/AreaPerimeterRelationship';
import SkillApplicationProblemsArea from '../components/practice/class-5/AreaanditsBoundary/Skillapplicationproblems/SkillApplicationProblemsArea';

import VolumeByDisplacement from '../components/practice/class-5/Howbighowheavy/volume measurement/volume-by-displacement';
import UnitsOfVolume from '../components/practice/class-5/Howbighowheavy/volume measurement/units-of-volume';
import VolumeEstimation from '../components/practice/class-5/Howbighowheavy/volume measurement/volume-estimation';
import VolumeUsingUnitCubes from '../components/practice/class-5/Howbighowheavy/volume measurement/volume-using-unit-cubes';
import UnitsOfMass from '../components/practice/class-5/Howbighowheavy/mass measurement/units-of-mass';
import MassConversion from '../components/practice/class-5/Howbighowheavy/mass measurement/mass-conversion';
import MassCalculation from '../components/practice/class-5/Howbighowheavy/mass measurement/mass-calculation';
import WeightEstimationComparison from '../components/practice/class-5/Howbighowheavy/mass measurement/weight-estimation-comparison';
import ThreeDShapeConstruction from '../components/practice/class-5/Howbighowheavy/measurement based reasoning/3d-shape-construction';
import PackagingAndLayering from '../components/practice/class-5/Howbighowheavy/measurement based reasoning/packaging-and-layering';
import MeasurementInRealLife from '../components/practice/class-5/Howbighowheavy/measurement based reasoning/measurement-in-real-life';
import SkillApplicationProblems from '../components/practice/class-5/Howbighowheavy/skill application problem/skill-application-problem';

import PatternIdentification from '../components/practice/class-5/CanyouseethePattern/PatternRecognition/pattern-identification';
import RuleBasedPatternCreation from '../components/practice/class-5/CanyouseethePattern/PatternRecognition/rule-based-pattern-creation';
import UnderstandingRotations from '../components/practice/class-5/CanyouseethePattern/PatternRecognition/understanding-rotations';
import GridPatternRecognition from '../components/practice/class-5/CanyouseethePattern/PatternRecognition/grid-pattern-recognition';
import PropertiesOfOperation from '../components/practice/class-5/CanyouseethePattern/NummberProperties/properties-of-operations';
import DigitRelationships from '../components/practice/class-5/CanyouseethePattern/NummberProperties/digit-relationships';
import PalindromeRecognition from '../components/practice/class-5/CanyouseethePattern/NummberProperties/palindrome-recognition';
import StructuredNumberPatterns from '../components/practice/class-5/CanyouseethePattern/NummberProperties/structured-number-patterns';
import RuleApplications from '../components/practice/class-5/CanyouseethePattern/LogicalReasoning/rule-application';
import MultiStepOperations from '../components/practice/class-5/CanyouseethePattern/LogicalReasoning/multi-step-operations';
import MissingNumberReasoning from '../components/practice/class-5/CanyouseethePattern/LogicalReasoning/missing-number-reasoning';
import MentalCalculationReasoning from '../components/practice/class-5/CanyouseethePattern/LogicalReasoning/mental-calculation-strategies';
import SkillApplicationProblemsPatterns from '../components/practice/class-5/CanyouseethePattern/SkillApplicationProblems/skill-application-problems-patterns';
import ChapterTestPatterns from '../components/practice/class-5/CanyouseethePattern/ChapterTest/chapter-test';

function grade5Routes() {
    return (
        <>
            <Route path="/middle/grade/5/tenths-hundredths/place-values" element={<PlaceValuesOfDecimals />} />
            <Route path="/middle/grade/5/tenths-hundredths/fraction-to-decimal" element={<FractionToDecimalConversion />} />
            <Route path="/middle/grade/5/tenths-hundredths/visual-representation" element={<DecimalVisualRepresentation />} />
            <Route path="/middle/grade/5/tenths-hundredths/measurement" element={<DecimalInMeasurement />} />
            <Route path="/middle/grade/5/tenths-hundredths/money" element={<DecimalInMoney />} />
            <Route path="/middle/grade/5/tenths-hundredths/comparing" element={<ComparingDecimals />} />
            <Route path="/middle/grade/5/tenths-hundredths/operations" element={<DecimalOperations />} />
            <Route path="/middle/grade/5/tenths-hundredths/conversion" element={<ConversionBetweenForms />} />
            <Route path="/middle/grade/5/tenths-hundredths/word-problems" element={<DecimalWordProblems />} />

            {/* Grade 5 - Area and its Boundary */}
            <Route path="/middle/grade/5/area-boundary/area/finding-area" element={<FindingArea />} />
            <Route path="/middle/grade/5/area-boundary/area/compare-shapes" element={<CompareShapesSameArea />} />
            <Route path="/middle/grade/5/area-boundary/area/real-life" element={<AreaRealLife />} />
            <Route path="/middle/grade/5/area-boundary/area/units" element={<AppropriateAreaUnits />} />
            <Route path="/middle/grade/5/area-boundary/perimeter/finding-perimeter" element={<FindingPerimeter />} />
            <Route path="/middle/grade/5/area-boundary/perimeter/boundary-length" element={<PerimeterAsBoundary />} />
            <Route path="/middle/grade/5/area-boundary/perimeter/different-shapes" element={<SamePerimeterDifferentShapes />} />
            <Route path="/middle/grade/5/area-boundary/perimeter/real-life" element={<PerimeterRealLife />} />
            <Route path="/middle/grade/5/area-boundary/relationship" element={<AreaPerimeterRelationship />} />
            <Route path="/middle/grade/5/area-boundary/skill-application" element={<SkillApplicationProblemsArea />} />

            <Route path="/middle/practice/9003" element={<MultiplicationPractice />} />
            <Route path="/middle/practice/9004" element={<MultiplicationPractice3D />} />
            <Route path="/middle/practice/9005" element={<MultiplicationPracticeMultiple />} />
            <Route path="/middle/practice/9006" element={<MultiplicationEndingZero />} />
            <Route path="/middle/practice/9007" element={<MultiplicationWordProblems />} />
            <Route path="/middle/practice/9008" element={<DivisionPracticeOneDigit />} />
            <Route path="/middle/practice/9009" element={<DivisionPracticeTwoDigit />} />
            <Route path="/middle/practice/9010" element={<DivisionEndingZero />} />
            <Route path="/middle/practice/9011" element={<DivisionWordProblems />} />
            <Route path="/middle/practice/9012" element={<MultiDivWordProblems />} />

            {/* Grade 5 - How Big? How Heavy? */}
            <Route path="/middle/grade/5/how-big-how-heavy/volume-by-displacement" element={<VolumeByDisplacement />} />
            <Route path="/middle/grade/5/how-big-how-heavy/units-of-volume" element={<UnitsOfVolume />} />
            <Route path="/middle/grade/5/how-big-how-heavy/volume-estimation" element={<VolumeEstimation />} />
            <Route path="/middle/grade/5/how-big-how-heavy/volume-unit-cubes" element={<VolumeUsingUnitCubes />} />
            <Route path="/middle/grade/5/how-big-how-heavy/units-of-mass" element={<UnitsOfMass />} />
            <Route path="/middle/grade/5/how-big-how-heavy/mass-conversion" element={<MassConversion />} />
            <Route path="/middle/grade/5/how-big-how-heavy/mass-calculation" element={<MassCalculation />} />
            <Route path="/middle/grade/5/how-big-how-heavy/weight-estimation" element={<WeightEstimationComparison />} />
            <Route path="/middle/grade/5/how-big-how-heavy/3d-construction" element={<ThreeDShapeConstruction />} />
            <Route path="/middle/grade/5/how-big-how-heavy/packaging-layering" element={<PackagingAndLayering />} />
            <Route path="/middle/grade/5/how-big-how-heavy/measurement-real-life" element={<MeasurementInRealLife />} />
            <Route path="/middle/grade/5/how-big-how-heavy/skill-application" element={<SkillApplicationProblems />} />
            {/* Can you see the Pattern? - Grade 5 */}
            <Route path="/middle/grade/5/can-you-see-the-pattern/pattern-identification" element={<PatternIdentification />} />
            <Route path="/middle/grade/5/can-you-see-the-pattern/rule-pattern-creation" element={<RuleBasedPatternCreation />} />
            <Route path="/middle/grade/5/can-you-see-the-pattern/rotations" element={<UnderstandingRotations />} />
            <Route path="/middle/grade/5/can-you-see-the-pattern/grid-patterns" element={<GridPatternRecognition />} />
            <Route path="/middle/grade/5/can-you-see-the-pattern/properties-of-operation" element={<PropertiesOfOperation />} />
            <Route path="/middle/grade/5/can-you-see-the-pattern/digit-relationships" element={<DigitRelationships />} />
            <Route path="/middle/grade/5/can-you-see-the-pattern/palindromes" element={<PalindromeRecognition />} />
            <Route path="/middle/grade/5/can-you-see-the-pattern/structured-patterns" element={<StructuredNumberPatterns />} />
            <Route path="/middle/grade/5/can-you-see-the-pattern/rule-applications" element={<RuleApplications />} />
            <Route path="/middle/grade/5/can-you-see-the-pattern/multi-step-operations" element={<MultiStepOperations />} />
            <Route path="/middle/grade/5/can-you-see-the-pattern/missing-numbers" element={<MissingNumberReasoning />} />
            <Route path="/middle/grade/5/can-you-see-the-pattern/mental-calculation" element={<MentalCalculationReasoning />} />
            <Route path="/middle/grade/5/can-you-see-the-pattern/skill-application" element={<SkillApplicationProblemsPatterns />} />
            <Route path="/middle/grade/5/can-you-see-the-pattern/chapter-test" element={<ChapterTestPatterns />} />
        </>
    );
}

export default grade5Routes;
