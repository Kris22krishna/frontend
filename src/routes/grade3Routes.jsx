import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

import DrawTiles from '../components/practice/class-3/House-of-Hundreds-II/Draw-tiles';
import NeighbouringNumbers from '../components/practice/class-3/House-of-Hundreds-II/neighbouring-numbers';
import HelpCranesOnNumberLine from '../components/practice/class-3/House-of-Hundreds-II/Help-cranes-on-number-line';
import Tambola from '../components/practice/class-3/House-of-Hundreds-II/Tambola';
import SkipAndSolve from '../components/practice/class-3/House-of-Hundreds-II/skip-&-solve';
import NumberInTheCentre from '../components/practice/class-3/House-of-Hundreds-II/number-in-the-centre';
import NumberPuzzles from '../components/practice/class-3/House-of-Hundreds-II/number-puzzles';
import TheNumberDetective from '../components/practice/class-3/House-of-Hundreds-II/The-number-detective';
import PaperSlips from '../components/practice/class-3/House-of-Hundreds-II/Paper-slips';
import GuessTheNumber from '../components/practice/class-3/House-of-Hundreds-II/Guess-the-number';
import RakshaBandhanIntro from '../components/practice/class-3/Raksha-Bandhan/fill-in-the-blanks';
import RakshaBandhanMultiplication from '../components/practice/class-3/Raksha-Bandhan/multiplication';
import RakshaBandhanDivision from '../components/practice/class-3/Raksha-Bandhan/division';
import FairShareCutting from '../components/practice/class-3/fair-share/cutting';
import FairShareHalvesDoubles from '../components/practice/class-3/fair-share/halves&doubles';
import FairShareDraw from '../components/practice/class-3/fair-share/draw-halves';
import FairShareGuesswho from '../components/practice/class-3/fair-share/guess-who-am-i';
import LongerShorterStrings from '../components/practice/class-3/Fun-at-class-party/Longer&Shorter-strings';
import HeightsAndMeters from '../components/practice/class-3/Fun-at-class-party/heights-and-meters';

function grade3Routes() {
    return (
        <>
            <Route path="/junior/grade/:grade/raksha-bandhan/intro" element={
                <ProtectedRoute redirectTo="/login">
                    <RakshaBandhanIntro />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/raksha-bandhan/multiplication" element={
                <ProtectedRoute redirectTo="/login">
                    <RakshaBandhanMultiplication />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/raksha-bandhan/division" element={
                <ProtectedRoute redirectTo="/login">
                    <RakshaBandhanDivision />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/fair-share/cutting" element={
                <ProtectedRoute redirectTo="/login">
                    <FairShareCutting />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/fair-share/halves-doubles" element={
                <ProtectedRoute redirectTo="/login">
                    <FairShareHalvesDoubles />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/fair-share/draw" element={
                <ProtectedRoute redirectTo="/login">
                    <FairShareDraw />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/fair-share/guess-who" element={
                <ProtectedRoute redirectTo="/login">
                    <FairShareGuesswho />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/fun-at-class-party/longer-shorter" element={
                <ProtectedRoute redirectTo="/login">
                    <LongerShorterStrings />
                </ProtectedRoute>
            } />
            <Route path="/junior/grade/:grade/fun-at-class-party/heights-and-meters" element={
                <ProtectedRoute redirectTo="/login">
                    <HeightsAndMeters />
                </ProtectedRoute>
            } />

            <Route path="/junior/grade/:grade/house-of-hundreds-ii/draw-tiles" element={
                <ProtectedRoute redirectTo="/login">
                    <DrawTiles />
                </ProtectedRoute>
            } />

            <Route path="/junior/grade/:grade/house-of-hundreds-ii/neighbouring-numbers" element={
                <ProtectedRoute redirectTo="/login">
                    <NeighbouringNumbers />
                </ProtectedRoute>
            } />

            <Route path="/junior/grade/:grade/house-of-hundreds-ii/help-cranes" element={
                <ProtectedRoute redirectTo="/login">
                    <HelpCranesOnNumberLine />
                </ProtectedRoute>
            } />

            <Route path="/junior/grade/:grade/house-of-hundreds-ii/tambola" element={
                <ProtectedRoute redirectTo="/login">
                    <Tambola />
                </ProtectedRoute>
            } />

            <Route path="/junior/grade/:grade/house-of-hundreds-ii/skip-and-solve" element={
                <ProtectedRoute redirectTo="/login">
                    <SkipAndSolve />
                </ProtectedRoute>
            } />

            <Route path="/junior/grade/:grade/house-of-hundreds-ii/number-in-the-centre" element={
                <ProtectedRoute redirectTo="/login">
                    <NumberInTheCentre />
                </ProtectedRoute>
            } />

            <Route path="/junior/grade/:grade/house-of-hundreds-ii/number-puzzles" element={
                <ProtectedRoute redirectTo="/login">
                    <NumberPuzzles />
                </ProtectedRoute>
            } />

            <Route path="/junior/grade/:grade/house-of-hundreds-ii/the-number-detective" element={
                <ProtectedRoute redirectTo="/login">
                    <TheNumberDetective />
                </ProtectedRoute>
            } />

            <Route path="/junior/grade/:grade/house-of-hundreds-ii/paper-slips" element={
                <ProtectedRoute redirectTo="/login">
                    <PaperSlips />
                </ProtectedRoute>
            } />

            <Route path="/junior/grade/:grade/house-of-hundreds-ii/guess-the-number" element={
                <ProtectedRoute redirectTo="/login">
                    <GuessTheNumber />
                </ProtectedRoute>
            } />
        </>
    );
}

export default grade3Routes;
