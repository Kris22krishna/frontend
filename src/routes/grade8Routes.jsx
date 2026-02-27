import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

import PowersWithNegativeExponents from '../components/practice/class-8/exponents and powers/powers_with_negative_exponents';
import LawsOfExponentsClass8 from '../components/practice/class-8/exponents and powers/laws_of_exponents';
import LawsOfExponentsApplication from '../components/practice/class-8/exponents and powers/laws_of_exponents_application';
import StandardFormSmallNumbers from '../components/practice/class-8/exponents and powers/standard_form_small_numbers';
import ComparingLargeSmallNumbers from '../components/practice/class-8/exponents and powers/comparing_large_small_numbers';
import Associativity from '../components/practice/class-8/rational-numbers/associativity';
import Commutativity from '../components/practice/class-8/rational-numbers/commutativity';
import AdditiveMultiplicativeIdentity from '../components/practice/class-8/rational-numbers/additive_multiplicative_identity';
import Distributivity from '../components/practice/class-8/rational-numbers/distributivity';
import AreaOfPolygon from '../components/practice/class-8/mensuration/area_of_polygon';
import SurfaceAreaCuboid from '../components/practice/class-8/mensuration/surface_area_cuboid';
import SurfaceAreaCube from '../components/practice/class-8/mensuration/surface_area_cube';
import SurfaceAreaCylinder from '../components/practice/class-8/mensuration/surface_area_cylinder';
import VolumeOfCube from '../components/practice/class-8/mensuration/volume_of_cube';
import VolumeOfCuboid from '../components/practice/class-8/mensuration/volume_of_cuboid';
import VolumeOfCylinder from '../components/practice/class-8/mensuration/volume_of_cylinder';
import VolumeAndCapacity from '../components/practice/class-8/mensuration/volume_and_capacity';
import MethodOfCommonFactors from '../components/practice/class-8/factorisation/method_of_common_factors';
import FactorisationByRegrouping from '../components/practice/class-8/factorisation/factorisation_by_regrouping';
import FactorisationUsingIdentities from '../components/practice/class-8/factorisation/factorisation_using_identities';
import FactorsOfFormXplusAXplusB from '../components/practice/class-8/factorisation/factors_of_form_x_plus_a_x_plus_b';
import DivisionMonomialByMonomial from '../components/practice/class-8/factorisation/division_monomial_by_monomial';
import DivisionPolynomialByMonomial from '../components/practice/class-8/factorisation/division_polynomial_by_monomial';
import DivisionPolynomialByPolynomial from '../components/practice/class-8/factorisation/division_polynomial_by_polynomial';
import ExponentsAndPowersTest from '../components/practice/class-8/exponents and powers/ExponentsAndPowersTest';
import Grade8RationalNumbersTest from '../components/practice/class-8/rational-numbers/RationalNumbersTest';
import MensurationTest from '../components/practice/class-8/mensuration/MensurationTest';
import FactorisationTest from '../components/practice/class-8/factorisation/FactorisationTest';

function grade8Routes() {
    return (
        <>
            {/* Grade 8 Exponents and Powers - Negative Exponents */}
            <Route path="/senior/grade/8/exponents-powers/negative-exponents" element={
                <ProtectedRoute redirectTo="/login">
                    <PowersWithNegativeExponents />
                </ProtectedRoute>
            } />

            {/* Grade 8 Exponents and Powers - Laws of Exponents */}
            <Route path="/senior/grade/8/exponents-powers/laws-of-exponents" element={
                <ProtectedRoute redirectTo="/login">
                    <LawsOfExponentsClass8 />
                </ProtectedRoute>
            } />

            {/* Grade 8 Exponents and Powers - Laws of Exponents Application */}
            <Route path="/senior/grade/8/exponents-powers/laws-application" element={
                <ProtectedRoute redirectTo="/login">
                    <LawsOfExponentsApplication />
                </ProtectedRoute>
            } />

            {/* Grade 8 Exponents and Powers - Standard Form for Small Numbers */}
            <Route path="/senior/grade/8/exponents-powers/standard-form" element={
                <ProtectedRoute redirectTo="/login">
                    <StandardFormSmallNumbers />
                </ProtectedRoute>
            } />

            {/* Grade 8 Exponents and Powers - Comparing Large and Small Numbers */}
            <Route path="/senior/grade/8/exponents-powers/comparing-numbers" element={
                <ProtectedRoute redirectTo="/login">
                    <ComparingLargeSmallNumbers />
                </ProtectedRoute>
            } />

            {/* Grade 8 Rational Numbers - Commutativity */}
            <Route path="/senior/grade/8/rational-numbers/commutativity" element={
                <ProtectedRoute redirectTo="/login">
                    <Commutativity />
                </ProtectedRoute>
            } />

            {/* Grade 8 Rational Numbers - Associativity */}
            <Route path="/senior/grade/8/rational-numbers/associativity" element={
                <ProtectedRoute redirectTo="/login">
                    <Associativity />
                </ProtectedRoute>
            } />

            {/* Grade 8 Rational Numbers - Additive and Multiplicative Identity */}
            <Route path="/senior/grade/8/rational-numbers/identity" element={
                <ProtectedRoute redirectTo="/login">
                    <AdditiveMultiplicativeIdentity />
                </ProtectedRoute>
            } />

            {/* Grade 8 Rational Numbers - Distributivity */}
            <Route path="/senior/grade/8/rational-numbers/distributivity" element={
                <ProtectedRoute redirectTo="/login">
                    <Distributivity />
                </ProtectedRoute>
            } />

            {/* Grade 8 Mensuration */}
            <Route path="/senior/grade/8/mensuration/area-of-polygon" element={
                <ProtectedRoute redirectTo="/login">
                    <AreaOfPolygon />
                </ProtectedRoute>
            } />
            <Route path="/senior/grade/8/mensuration/surface-area-cuboid" element={
                <ProtectedRoute redirectTo="/login">
                    <SurfaceAreaCuboid />
                </ProtectedRoute>
            } />
            <Route path="/senior/grade/8/mensuration/surface-area-cube" element={
                <ProtectedRoute redirectTo="/login">
                    <SurfaceAreaCube />
                </ProtectedRoute>
            } />
            <Route path="/senior/grade/8/mensuration/surface-area-cylinder" element={
                <ProtectedRoute redirectTo="/login">
                    <SurfaceAreaCylinder />
                </ProtectedRoute>
            } />
            <Route path="/senior/grade/8/mensuration/volume-of-cube" element={
                <ProtectedRoute redirectTo="/login">
                    <VolumeOfCube />
                </ProtectedRoute>
            } />
            <Route path="/senior/grade/8/mensuration/volume-of-cuboid" element={
                <ProtectedRoute redirectTo="/login">
                    <VolumeOfCuboid />
                </ProtectedRoute>
            } />
            <Route path="/senior/grade/8/mensuration/volume-of-cylinder" element={
                <ProtectedRoute redirectTo="/login">
                    <VolumeOfCylinder />
                </ProtectedRoute>
            } />
            <Route path="/senior/grade/8/mensuration/volume-and-capacity" element={
                <ProtectedRoute redirectTo="/login">
                    <VolumeAndCapacity />
                </ProtectedRoute>
            } />

            {/* Grade 8 Factorisation */}
            <Route path="/senior/grade/8/factorisation/common-factors" element={
                <ProtectedRoute redirectTo="/login">
                    <MethodOfCommonFactors />
                </ProtectedRoute>
            } />
            <Route path="/senior/grade/8/factorisation/regrouping" element={
                <ProtectedRoute redirectTo="/login">
                    <FactorisationByRegrouping />
                </ProtectedRoute>
            } />
            <Route path="/senior/grade/8/factorisation/using-identities" element={
                <ProtectedRoute redirectTo="/login">
                    <FactorisationUsingIdentities />
                </ProtectedRoute>
            } />
            <Route path="/senior/grade/8/factorisation/factors-form-xpla-xplb" element={
                <ProtectedRoute redirectTo="/login">
                    <FactorsOfFormXplusAXplusB />
                </ProtectedRoute>
            } />
            <Route path="/senior/grade/8/factorisation/division-monomial-by-monomial" element={
                <ProtectedRoute redirectTo="/login">
                    <DivisionMonomialByMonomial />
                </ProtectedRoute>
            } />
            <Route path="/senior/grade/8/factorisation/division-polynomial-by-monomial" element={
                <ProtectedRoute redirectTo="/login">
                    <DivisionPolynomialByMonomial />
                </ProtectedRoute>
            } />
            <Route path="/senior/grade/8/factorisation/division-polynomial-by-polynomial" element={
                <ProtectedRoute redirectTo="/login">
                    <DivisionPolynomialByPolynomial />
                </ProtectedRoute>
            } />

            {/* Grade 8 Chapter Tests */}
            <Route path="/senior/grade/8/exponents-and-powers/chapter-test" element={<ProtectedRoute redirectTo="/login"><ExponentsAndPowersTest /></ProtectedRoute>} />
            <Route path="/senior/grade/8/rational-numbers/chapter-test" element={<ProtectedRoute redirectTo="/login"><Grade8RationalNumbersTest /></ProtectedRoute>} />
            <Route path="/senior/grade/8/mensuration/chapter-test" element={<ProtectedRoute redirectTo="/login"><MensurationTest /></ProtectedRoute>} />
            <Route path="/senior/grade/8/factorisation/chapter-test" element={<ProtectedRoute redirectTo="/login"><FactorisationTest /></ProtectedRoute>} />
        </>
    );
}

export default grade8Routes;
