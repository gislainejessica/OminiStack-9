const express = require('express')
const multer = require('multer')

const uploadConfig = require('./config/upload')

const SessionController = require('./controllers/sessionController')
const SpotController = require('./controllers/spotController')
const DashboardController = require('./controllers/dashboardController')
const ReservaController = require('./controllers/reservaController')
const DesaprovamentoController = require('./controllers/desaprovamentoController')
const AprovamentoController = require('./controllers/aprovamentoController')



const routes = express.Router()
const upload =  multer(uploadConfig)

// Faz o login do usuario no sistema
routes.post('/sessions', SessionController.store)
// Administrador faz upload das imagens
routes.post('/spots', upload.single('imagem'), SpotController.store)

routes.get('/spots', SpotController.index)

routes.post('/spots/:spot_id/reserva', ReservaController.store)

routes.get('/dashboard', DashboardController.show)
// Aprovar requisições
routes.post('/reservas/:resersa_id/aprovamento', AprovamentoController.store)
// Desaprovar requisições
routes.post('/reservas/:resersa_id/desaprovamento', DesaprovamentoController.store)


module.exports = routes
