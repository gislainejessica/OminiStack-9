import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NovoSpot from './pages/NovoSpot'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/dashboard'  component={Dashboard} />
                <Route path='/novoSpot' component={NovoSpot} />
            </Switch>
        </BrowserRouter>
    )
}

