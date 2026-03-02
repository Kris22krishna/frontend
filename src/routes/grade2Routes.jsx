import { Route } from "react-router-dom";
import ProtectedRoute from '../components/ProtectedRoute';

import IdentifyingShapes from '../components/practice/class-2/what-is-long,what-is-round/identifying_shapes';
import ComparingLengths from '../components/practice/class-2/what-is-long,what-is-round/comparing_lengths';
import RecognizingRoundObjects from '../components/practice/class-2/what-is-long,what-is-round/recognizing_round_objects';
import ComparingWeights from '../components/practice/class-2/c-203/how-much-can-you-carry/ComparingWeights';
import HeavierLighter from '../components/practice/class-2/c-203/how-much-can-you-carry/HeavierLighter';
import EstimatingWeight from '../components/practice/class-2/c-203/how-much-can-you-carry/EstimatingWeight';
import CountingInPairs from '../components/practice/class-2/Counting in Groups/counting_in_pairs';
import SkipCounting from '../components/practice/class-2/Counting in Groups/skip_counting';
import RepeatedAdditionClass2 from '../components/practice/class-2/Counting in Groups/repeated_addition';
import NumbersUpTo100 from '../components/practice/class-2/Counting in Tens/numbers_up_to_100';
import PlaceValueTensOnes from '../components/practice/class-2/Counting in Tens/place_value_tens_ones';
import ExpandedForm from '../components/practice/class-2/Counting in Tens/expanded_form';
import ComparingNumbers from '../components/practice/class-2/Counting in Tens/comparing_numbers';

function grade2Routes() {
    return (
        <>
            <Route path="/junior/grade/2/what-is-long-what-is-round/identifying-shapes" element={<ProtectedRoute redirectTo="/login"><IdentifyingShapes /></ProtectedRoute>} />
            <Route path="/junior/grade/2/what-is-long-what-is-round/comparing-lengths" element={<ProtectedRoute redirectTo="/login"><ComparingLengths /></ProtectedRoute>} />
            <Route path="/junior/grade/2/what-is-long-what-is-round/recognizing-round-objects" element={<ProtectedRoute redirectTo="/login"><RecognizingRoundObjects /></ProtectedRoute>} />
            <Route path="/junior/grade/2/how-much-can-you-carry/comparing-weights" element={<ProtectedRoute redirectTo="/login"><ComparingWeights /></ProtectedRoute>} />
            <Route path="/junior/grade/2/how-much-can-you-carry/heavier-lighter" element={<ProtectedRoute redirectTo="/login"><HeavierLighter /></ProtectedRoute>} />
            <Route path="/junior/grade/2/how-much-can-you-carry/estimating-weight" element={<ProtectedRoute redirectTo="/login"><EstimatingWeight /></ProtectedRoute>} />
            <Route path="/junior/grade/2/counting-in-groups/counting-in-pairs" element={<ProtectedRoute redirectTo="/login"><CountingInPairs /></ProtectedRoute>} />
            <Route path="/junior/grade/2/counting-in-groups/skip-counting" element={<ProtectedRoute redirectTo="/login"><SkipCounting /></ProtectedRoute>} />
            <Route path="/junior/grade/2/counting-in-groups/repeated-addition" element={<ProtectedRoute redirectTo="/login"><RepeatedAdditionClass2 /></ProtectedRoute>} />
            <Route path="/junior/grade/2/counting-in-tens/numbers-up-to-100" element={<ProtectedRoute redirectTo="/login"><NumbersUpTo100 /></ProtectedRoute>} />
            <Route path="/junior/grade/2/counting-in-tens/place-value-tens-ones" element={<ProtectedRoute redirectTo="/login"><PlaceValueTensOnes /></ProtectedRoute>} />
            <Route path="/junior/grade/2/counting-in-tens/expanded-form" element={<ProtectedRoute redirectTo="/login"><ExpandedForm /></ProtectedRoute>} />
            <Route path="/junior/grade/2/counting-in-tens/comparing-numbers" element={<ProtectedRoute redirectTo="/login"><ComparingNumbers /></ProtectedRoute>} />
        </>
    );
}

export default grade2Routes;