const Spot = require('../models/Spot')

module.exports ={
    async show(req, res){
        const { usuario_id } = req.headers

        const spots = await Spot.find({ usuario: usuario_id })
        return res.json(spots)
    }
}
