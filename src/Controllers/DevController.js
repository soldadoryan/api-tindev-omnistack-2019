const axios = require('axios');
const Dev = require('../Models/Dev');

module.exports = {
    async store (req, res) {
        const username = req.body.username;

        const existsUser = await Dev.show(username, null).then((result) => {
            return result;
        });

        if(existsUser.length == 0) {
            const response = await axios.get(`https://api.github.com/users/${username}`); 
            
            const { name, bio, avatar_url } = response.data;
            
            const result_store = await Dev.store({
                "nome": name, 
                "bio": bio, 
                "username": username,
                "avatar": avatar_url,
            }).then((result) => {
                return result;
            });
            
            return res.json({ success: result_store, message: "Cadastrado com sucesso!" });
        } else {
            return res.json({ success: true, message: "Usuário logou com sucesso!" });
        }
    },
    async index (req, res) {

        const { user } = req.headers;

        const user_infos = await Dev.show(null, user).then((result) => {
            return result;
        });

        const { likes, dislikes } = user_infos;

        const devs = await Dev.index(user).then((result) => {
            return result;
        });

        var array_devs = [];

        devs.forEach((el, key) => {
            if(likes.includes(el.id) == false && dislikes.includes(el.id)) array_devs.push(el);
        });

        return res.json(array_devs); 

    }
}