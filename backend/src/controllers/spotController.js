const Spot = require('../models/Spot')
const User = require('../models/User')

module.exports = {
    async index(req, res){
        const { tecnologia } = req.query
        const spots = await Spot.find({ tecnologias: tecnologia })

        return res.json(spots)
    },
    async store(req, res){
        const { empresa, preco, tecnologias } = req.body
        const { usuario_id } = req.headers
        const { filename } = req.file

        // Veificar se o usuario existe
        const usuarioBD = await User.findById(usuario_id)

        if (!usuarioBD){
            return res.status(400).json({ Mensagem: 'Não existe esse usuario' })
        }
        const spot = await Spot.create({
            usuario :usuario_id,
            imagem: filename,
            empresa,
            preco,
            tecnologias: tecnologias.split(',').map(tecnologia => tecnologia.trim())
        })
        return res.json(spot)
    }
}
