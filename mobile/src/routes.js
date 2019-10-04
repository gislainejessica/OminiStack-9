import {createAppContainer, createSwitchNavigator} from 'react-navigation'

import Login from './pages/Login'
import Listagem from './pages/Listagem'
import Reserva from './pages/Reserva'

const rotas = createAppContainer(
    createSwitchNavigator({
        Login,
        Listagem,
        Reserva,
    })
)
export default rotas