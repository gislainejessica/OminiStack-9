const  Reserva = require('../models/Reserva')

module.exports = {
    async store(req, res){
        const { reserva_id } = req.params
        const reserva = await Reserva.findById(reserva_id).populate('spot')
        reserva.aprovado = true
        await reserva.save()

        const reserva_user_socket = req.connected_users[reserva.usuario]

        if(reserva_user_socket){
            req.io.to(reserva_user_socket).emit('reserva_resposta', reserva)
        }

        return res.json(reserva)
    }
}