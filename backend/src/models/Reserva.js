const mongoose = require('mongoose')

const ReservaSchema = new mongoose.Schema({
    data:String,
    aprovado: Boolean,
    usuario: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    spot: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Spot'
    }
})
module.exports = mongoose.model('Reserva', ReservaSchema)