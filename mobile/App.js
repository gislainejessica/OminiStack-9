import React from 'react'
import {YellowBox} from 'react-native'
import Rotas from './src/routes'

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
])

export default function App() {
  return <Rotas />
}
