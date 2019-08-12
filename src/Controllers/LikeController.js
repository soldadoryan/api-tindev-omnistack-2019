const axios = require('axios');
const Dev = require('../Models/Dev');

module.exports = {
    async store (req, res) {
        const { user } = req.headers;
        const { devId, method } = req.params;
        
        const resultado = await Dev.likeAndDislike(user, devId, method).then((result) => {
            return result;
        });

        const targetDev = await Dev.show(null, devId).then((result) => {
            return result;
        });

        const { likes } = targetDev;

        if(likes.includes(user)) {
            return res.json({ success: resultado, message: `DEU MATCH!` });
        } else {
            return res.json({ success: resultado, message: `Você deu ${method}!` });
        }

    }
}