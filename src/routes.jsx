import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Page404 from './pages/404/Page404'
import PokemonDetails from './pages/PokeDetails/PokemonDetails'
import BasePage from './pages/BasePage/BasePage'
import MainPage from './pages/MainPage/MainPage'

const AppRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<BasePage/>}>
                <Route index element={<MainPage/>} />
                <Route path='pokemon/:id' element={<PokemonDetails/>} />
                <Route path='*' element={<Page404/>} />
            </Route>
        </Routes>
    </Router>
  )
}

export default AppRoutes
