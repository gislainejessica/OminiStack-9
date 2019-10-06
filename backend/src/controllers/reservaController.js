const ReservaModelo = require('../models/Reserva')

module.exports = {
    async store(req, res){
        const { usuario_id } = req.headers
        const { spot_id } = req.params
        const { data } = req.body

        const reserva = await ReservaModelo.create({
            usuario: usuario_id,
            spot: spot_id,
            data
        })

        await reserva.populate('usuario').populate('spot').execPopulate()
        const donoSockect = req.connected_users[reserva.spot.usuario]
        
        if (donoSockect){
            req.io.to(donoSockect).emit('reserva_requisitada', reserva)
        }
        return res.json(reserva)
    }
}
