const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')

const app = express()
const server = http.Server(app)
const io = socketio(server)

const connected_users = {}

mongoose.connect('mongodb+srv://oministack:oministack@ominstack9-ugfir.mongodb.net/semana9', 
                { useNewUrlParser: true , useUnifiedTopology: true })

io.on('connection', socket => {
    const { usuario_id } = socket.handshake.query
    connected_users[usuario_id] = socket.id
})
app.use((req, res, next) => {
    req.io =io
    req.connected_users = connected_users
    return next()
})

app.use(express.json())
app.use(cors())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes)
server.listen(3333)

/** (GET | PUT | POST | DELETE)
 *   req.query = acessar as queries dos paramentros => aquilo que é opcional na rota (filtros)
 *   req.params =  acessar route params (edicão e delete)
 *   req.body = acessar corpo da requisição (criação e edicão)
 * 
 * Por padrão o express não entende uma requisição que vem num formato de json
 * por isso precisamos disser para ele entender passando um express.json()
 */
