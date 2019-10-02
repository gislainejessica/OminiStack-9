const UserModel = require('../models/User')

module.exports = {
    async store(req, res){
        const { email } = req.body
        let user = await UserModel.findOne({ email })
        
        if (!user)
            user = await UserModel.create({ email })
        
            return res.json(user)
    }
}
// Regras de negócio, geralmente são colocadas nos controles
// Se a aplicação escalar e crescer em numero de funcionalidades,
// ou seja, caso a complexidade aumente, 
// talvez seja a hora de pensar em um novo Designer Pathner, um novo padrao de estruturação do codigo

// INDEX (LISTAGEM DE TODAS), 
// SHOW (LISTA UMA), 
// STORE (CRIAR UMA), 
// UPDATE (ATUALIZAR, ALTERAR UMA), 
// DESTROY (DELETAR UMA)
