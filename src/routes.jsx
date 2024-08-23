import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import BasePage from './pages/BasePage'
import MainPage from './pages/MainPage'
import PokeInfo from './pages/PokeInfo'
import Page404 from './pages/Page404'

const AppRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<BasePage/>}>
                <Route index element={<MainPage/>} />
                <Route path='/pokemon/id:' element={<PokeInfo/>} />
                <Route path='*' element={<Page404/>} />
            </Route>
        </Routes>
    </Router>
  )
}

export default AppRoutes
