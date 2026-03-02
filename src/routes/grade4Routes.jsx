import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

import RepeatedAddition from '../components/practice/class-4/The_Cleanest_Village/Equal_Groups_and_Repeated_Addition/repeated_addition';
import RepeatedSubtraction from '../components/practice/class-4/The_Cleanest_Village/Equal_Groups_and_Repeated_Addition/repeated_subtraction';
import AdditionWithRegrouping from '../components/practice/class-4/The_Cleanest_Village/Addition_with_Regrouping/addition_with_regrouping';
import TwoDigitAdditionRegrouping from '../components/practice/class-4/The_Cleanest_Village/Addition_with_Regrouping/two_digit_plus_two_digit_regrouping';
import ThreeDigitAdditionRegrouping from '../components/practice/class-4/The_Cleanest_Village/Addition_with_Regrouping/three_digit_plus_three_digit_regrouping';
import SubtractionWithRegrouping from '../components/practice/class-4/The_Cleanest_Village/Subtraction_with_Regrouping/subtraction_with_regrouping';
import TwoDigitSubtractionRegrouping from '../components/practice/class-4/The_Cleanest_Village/Subtraction_with_Regrouping/two_digit_minus_two_digit_regrouping';
import ThreeDigitSubtractionRegrouping from '../components/practice/class-4/The_Cleanest_Village/Subtraction_with_Regrouping/three_digit_minus_three_digit_regrouping';
import FindMissingAddend from '../components/practice/class-4/The_Cleanest_Village/Missing_Value_and_Balance/find_missing_addend';
import FindMissingSubtrahend from '../components/practice/class-4/The_Cleanest_Village/Missing_Value_and_Balance/find_missing_subtrahend';
import FindHowManyMoreOrLess from '../components/practice/class-4/The_Cleanest_Village/Comparison_and_Difference/find_how_many_more_or_less';
import ChapterSceneMixedOperations from '../components/practice/class-4/The_Cleanest_Village/Word_Problems/chapter_scene_mixed_operations';
import LetUsPlay from '../components/practice/class-4/The_Cleanest_Village/Let_Us_Play/let_us_play';
import ChapterTest from '../components/practice/class-4/The_Cleanest_Village/Chapter_Test/chapter_test';

import JumpBasedMultiples from '../components/practice/class-4/Equal_Groups/Multiples_and_Skip_Counting/jump_based_multiples';
import CommonMultiplesFromJumps from '../components/practice/class-4/Equal_Groups/Multiples_and_Skip_Counting/common_multiples_from_jumps';
import GroupSizeAndNumberOfGroups from '../components/practice/class-4/Equal_Groups/Equal_Groups_to_Multiplication/group_size_and_number_of_groups';
import ArraysRowsAndColumns from '../components/practice/class-4/Equal_Groups/Equal_Groups_to_Multiplication/arrays_rows_and_columns';
import DoublingNumbers from '../components/practice/class-4/Equal_Groups/Doubling_and_Number_Patterns/doubling_numbers';
import DoublingOnesDigitPatterns from '../components/practice/class-4/Equal_Groups/Doubling_and_Number_Patterns/doubling_ones_digit_patterns';
import MultiplyUsingTens from '../components/practice/class-4/Equal_Groups/Multiplication_Strategies/multiply_using_tens';
import MultiplyUsingHundreds from '../components/practice/class-4/Equal_Groups/Multiplication_Strategies/multiply_using_hundreds';
import BreakApartMultiplication from '../components/practice/class-4/Equal_Groups/Multiplication_Strategies/break_apart_multiplication';
import EqualGroupsStoryProblems from '../components/practice/class-4/Equal_Groups/Multiplication_Word_Problems/equal_groups_story_problems';
import DivisionByPartialGroups from '../components/practice/class-4/Equal_Groups/Division_as_Grouping/division_by_partial_groups';
import DivisionWithRemainders from '../components/practice/class-4/Equal_Groups/Division_as_Grouping/division_with_remainders';
import DivideUsingPatterns from '../components/practice/class-4/Equal_Groups/Division_Patterns_and_Sharing/divide_using_patterns';
import EqualSharingDivision from '../components/practice/class-4/Equal_Groups/Division_Patterns_and_Sharing/equal_sharing_division';
import EqualGroupsMixedWordProblems from '../components/practice/class-4/Equal_Groups/Mixed_Multiplication_Division_Word_Problems/equal_groups_mixed_word_problems';
import AlwaysSometimesNeverStatements from '../components/practice/class-4/Equal_Groups/Mathematical_Reasoning/always_sometimes_never_statements';
import FindTheMistakeEqualGroups from '../components/practice/class-4/Equal_Groups/Mathematical_Reasoning/find_the_mistake_equal_groups';
import CreateYourOwnEqualGroups from '../components/practice/class-4/Equal_Groups/Mathematical_Reasoning/create_your_own_equal_groups';

import GramToKilogramFractions from '../components/practice/class-4/Weigh_It_Pour_It/Weight_Unit_Conversion/gram_to_kilogram_fractions';
import MakeOneKilogramUsingPackets from '../components/practice/class-4/Weigh_It_Pour_It/Weight_Unit_Conversion/make_one_kilogram_using_packets';
import MillilitreToLitreFractions from '../components/practice/class-4/Weigh_It_Pour_It/Capacity_Unit_Conversion/millilitre_to_litre_fractions';
import MakeOneLitreUsingBottles from '../components/practice/class-4/Weigh_It_Pour_It/Capacity_Unit_Conversion/make_one_litre_using_bottles';
import CountHowManyUnitsFit from '../components/practice/class-4/Weigh_It_Pour_It/Equal_Grouping_and_Unit_Count/count_how_many_units_fit';
import RepeatedAdditionToOneWhole from '../components/practice/class-4/Weigh_It_Pour_It/Equal_Grouping_and_Unit_Count/repeated_addition_to_one_whole';
import CompareWeightsAndCapacities from '../components/practice/class-4/Weigh_It_Pour_It/Comparison_of_Quantities/compare_weights_and_capacities';
import WeightAndCapacityWordProblems from '../components/practice/class-4/Weigh_It_Pour_It/Mixed_Measurement_Word_Problems/weight_and_capacity_word_problems';

import NimGameStrategy from '../components/practice/class-4/Elephants_Tigers_and_Leopards/Number_Games_and_Patterns/nim_game_add_1_or_2';
import NumberGridPatterns from '../components/practice/class-4/Elephants_Tigers_and_Leopards/Number_Games_and_Patterns/addition_chart_patterns';
import MagicMirrorNumbers from '../components/practice/class-4/Elephants_Tigers_and_Leopards/Number_Games_and_Patterns/reverse_two_digit_addition';
import ForestRestorationAddition from '../components/practice/class-4/Elephants_Tigers_and_Leopards/Large_Number_Addition/four_digit_addition_with_regrouping';
import JourneySums from '../components/practice/class-4/Elephants_Tigers_and_Leopards/Large_Number_Addition/multi_number_addition';
import EstimationBeforeAddition from '../components/practice/class-4/Elephants_Tigers_and_Leopards/Large_Number_Addition/estimation_before_addition';
import RiverCrossingSubtraction from '../components/practice/class-4/Elephants_Tigers_and_Leopards/Large_Number_Subtraction/four_digit_subtraction_with_regrouping';
import HiddenPathDifference from '../components/practice/class-4/Elephants_Tigers_and_Leopards/Large_Number_Subtraction/find_missing_difference';
import EstimationBeforeSubtraction from '../components/practice/class-4/Elephants_Tigers_and_Leopards/Large_Number_Subtraction/estimation_before_subtraction';
import BalanceScaleEstimation from '../components/practice/class-4/Elephants_Tigers_and_Leopards/Comparison_and_Estimation/more_or_less_find_unknown';
import QuickCompare from '../components/practice/class-4/Elephants_Tigers_and_Leopards/Comparison_and_Estimation/compare_without_calculating';
import SmartShortcuts from '../components/practice/class-4/Elephants_Tigers_and_Leopards/Mental_Math_Strategies/near_hundred_add_subtract';
import CompensationStrategy from '../components/practice/class-4/Elephants_Tigers_and_Leopards/Mental_Math_Strategies/compensation_strategy_questions';

function grade4Routes() {
    return (
        <>
            <Route path="/junior/grade/:grade/the-cleanest-village/repeated-addition" element={
                <ProtectedRoute redirectTo="/login">
                    <RepeatedAddition />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/the-cleanest-village/repeated-subtraction" element={
                <ProtectedRoute redirectTo="/login">
                    <RepeatedSubtraction />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/the-cleanest-village/addition-with-regrouping" element={
                <ProtectedRoute redirectTo="/login">
                    <AdditionWithRegrouping />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/the-cleanest-village/two-digit-addition-regrouping" element={
                <ProtectedRoute redirectTo="/login">
                    <TwoDigitAdditionRegrouping />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/the-cleanest-village/three-digit-addition-regrouping" element={
                <ProtectedRoute redirectTo="/login">
                    <ThreeDigitAdditionRegrouping />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/the-cleanest-village/subtraction-with-regrouping" element={
                <ProtectedRoute redirectTo="/login">
                    <SubtractionWithRegrouping />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/the-cleanest-village/two-digit-subtraction-regrouping" element={
                <ProtectedRoute redirectTo="/login">
                    <TwoDigitSubtractionRegrouping />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/the-cleanest-village/three-digit-subtraction-regrouping" element={
                <ProtectedRoute redirectTo="/login">
                    <ThreeDigitSubtractionRegrouping />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/the-cleanest-village/find-missing-addend" element={
                <ProtectedRoute redirectTo="/login">
                    <FindMissingAddend />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/the-cleanest-village/find-missing-subtrahend" element={
                <ProtectedRoute redirectTo="/login">
                    <FindMissingSubtrahend />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/the-cleanest-village/find-how-many-more-or-less" element={
                <ProtectedRoute redirectTo="/login">
                    <FindHowManyMoreOrLess />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/the-cleanest-village/chapter-scene-mixed-operations" element={
                <ProtectedRoute redirectTo="/login">
                    <ChapterSceneMixedOperations />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/the-cleanest-village/let-us-play" element={
                <ProtectedRoute redirectTo="/login">
                    <LetUsPlay />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/the-cleanest-village/chapter-test" element={
                <ProtectedRoute redirectTo="/login">
                    <ChapterTest />
                </ProtectedRoute>
            } />
            {/* Fallback for spaces in URL */}
            <Route path="/junior/grade/:grade/the cleanest village/chapter test" element={
                <ProtectedRoute redirectTo="/login">
                    <ChapterTest />
                </ProtectedRoute>
            } />

            <Route path="/junior/grade/:grade/equal-groups/jump-based-multiples" element={
                <ProtectedRoute redirectTo="/login">
                    <JumpBasedMultiples />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/equal-groups/common-multiples-from-jumps" element={
                <ProtectedRoute redirectTo="/login">
                    <CommonMultiplesFromJumps />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/equal-groups/group-size-and-number-of-groups" element={
                <ProtectedRoute redirectTo="/login">
                    <GroupSizeAndNumberOfGroups />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/equal-groups/arrays-rows-and-columns" element={
                <ProtectedRoute redirectTo="/login">
                    <ArraysRowsAndColumns />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/equal-groups/doubling-numbers" element={
                <ProtectedRoute redirectTo="/login">
                    <DoublingNumbers />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/equal-groups/doubling-ones-digit-patterns" element={
                <ProtectedRoute redirectTo="/login">
                    <DoublingOnesDigitPatterns />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/equal-groups/multiply-using-tens" element={
                <ProtectedRoute redirectTo="/login">
                    <MultiplyUsingTens />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/equal-groups/multiply-using-hundreds" element={
                <ProtectedRoute redirectTo="/login">
                    <MultiplyUsingHundreds />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/equal-groups/break-apart-multiplication" element={
                <ProtectedRoute redirectTo="/login">
                    <BreakApartMultiplication />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/equal-groups/equal-groups-story-problems" element={
                <ProtectedRoute redirectTo="/login">
                    <EqualGroupsStoryProblems />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/equal-groups/division-by-partial-groups" element={
                <ProtectedRoute redirectTo="/login">
                    <DivisionByPartialGroups />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/equal-groups/division-with-remainders" element={
                <ProtectedRoute redirectTo="/login">
                    <DivisionWithRemainders />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/equal-groups/divide-using-patterns" element={
                <ProtectedRoute redirectTo="/login">
                    <DivideUsingPatterns />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/equal-groups/equal-sharing-division" element={
                <ProtectedRoute redirectTo="/login">
                    <EqualSharingDivision />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/equal-groups/equal-groups-mixed-word-problems" element={
                <ProtectedRoute redirectTo="/login">
                    <EqualGroupsMixedWordProblems />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/equal-groups/always-sometimes-never-statements" element={
                <ProtectedRoute redirectTo="/login">
                    <AlwaysSometimesNeverStatements />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/equal-groups/find-the-mistake-equal-groups" element={
                <ProtectedRoute redirectTo="/login">
                    <FindTheMistakeEqualGroups />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/equal-groups/create-your-own-equal-groups" element={
                <ProtectedRoute redirectTo="/login">
                    <CreateYourOwnEqualGroups />
                </ProtectedRoute>
            } />

            <Route path="/junior/grade/:grade/weigh-it-pour-it/gram-to-kilogram-fractions" element={
                <ProtectedRoute redirectTo="/login">
                    <GramToKilogramFractions />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/weigh-it-pour-it/make-one-kilogram-using-packets" element={
                <ProtectedRoute redirectTo="/login">
                    <MakeOneKilogramUsingPackets />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/weigh-it-pour-it/millilitre-to-litre-fractions" element={
                <ProtectedRoute redirectTo="/login">
                    <MillilitreToLitreFractions />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/weigh-it-pour-it/make-one-litre-using-bottles" element={
                <ProtectedRoute redirectTo="/login">
                    <MakeOneLitreUsingBottles />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/weigh-it-pour-it/count-how-many-units-fit" element={
                <ProtectedRoute redirectTo="/login">
                    <CountHowManyUnitsFit />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/weigh-it-pour-it/repeated-addition-to-one-whole" element={
                <ProtectedRoute redirectTo="/login">
                    <RepeatedAdditionToOneWhole />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/weigh-it-pour-it/compare-weights-and-capacities" element={
                <ProtectedRoute redirectTo="/login">
                    <CompareWeightsAndCapacities />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/weigh-it-pour-it/weight-and-capacity-word-problems" element={
                <ProtectedRoute redirectTo="/login">
                    <WeightAndCapacityWordProblems />
                </ProtectedRoute>
            } />

            <Route path="/junior/grade/:grade/elephants-tigers-and-leopards/nim-game-strategy" element={
                <ProtectedRoute redirectTo="/login">
                    <NimGameStrategy />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/elephants-tigers-and-leopards/number-grid-patterns" element={
                <ProtectedRoute redirectTo="/login">
                    <NumberGridPatterns />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/elephants-tigers-and-leopards/magic-mirror-numbers" element={
                <ProtectedRoute redirectTo="/login">
                    <MagicMirrorNumbers />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/elephants-tigers-and-leopards/forest-restoration-addition" element={
                <ProtectedRoute redirectTo="/login">
                    <ForestRestorationAddition />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/elephants-tigers-and-leopards/journey-sums" element={
                <ProtectedRoute redirectTo="/login">
                    <JourneySums />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/elephants-tigers-and-leopards/estimation-before-addition" element={
                <ProtectedRoute redirectTo="/login">
                    <EstimationBeforeAddition />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/elephants-tigers-and-leopards/river-crossing-subtraction" element={
                <ProtectedRoute redirectTo="/login">
                    <RiverCrossingSubtraction />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/elephants-tigers-and-leopards/hidden-path-difference" element={
                <ProtectedRoute redirectTo="/login">
                    <HiddenPathDifference />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/elephants-tigers-and-leopards/estimation-before-subtraction" element={
                <ProtectedRoute redirectTo="/login">
                    <EstimationBeforeSubtraction />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/elephants-tigers-and-leopards/balance-scale-estimation" element={
                <ProtectedRoute redirectTo="/login">
                    <BalanceScaleEstimation />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/elephants-tigers-and-leopards/quick-compare" element={
                <ProtectedRoute redirectTo="/login">
                    <QuickCompare />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/elephants-tigers-and-leopards/smart-shortcuts" element={
                <ProtectedRoute redirectTo="/login">
                    <SmartShortcuts />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/elephants-tigers-and-leopards/compensation-strategy" element={
                <ProtectedRoute redirectTo="/login">
                    <CompensationStrategy />
                </ProtectedRoute>
            } />
        </>
    );
}

export default grade4Routes;
