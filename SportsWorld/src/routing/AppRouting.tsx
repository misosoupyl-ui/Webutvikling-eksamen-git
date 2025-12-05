import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AthleteAdminPage from '../pages/AthleteAdminPage';
import RegisterAthletePage from '../pages/RegisterAthletePage';
import DashBoardPage from '../pages/DashBoardPage';

const AppRouting = () => {
    return (
        <>
        <BrowserRouter>
        <header>
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/athletes'>Athletes</Link></li>
                    <li><Link to='/register'>Register Athlete</Link></li>
                    <li><Link to='/dashboard'>Dashboard</Link></li>
                </ul>
            </nav>
        </header>

        <main>
            <Routes>
               <Route path='/' element={<HomePage/>}></Route>
               <Route path='/athletes' element={<AthleteAdminPage/>}></Route>
               <Route path='/register' element={<RegisterAthletePage/>}></Route>
               <Route path='/dashboard' element={<DashBoardPage/>}></Route>
            </Routes>
        </main>
        </BrowserRouter>
        <footer></footer>   
        
        </>
    )
}

export default AppRouting;