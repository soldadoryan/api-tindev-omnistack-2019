const Mysql = require('../conn');

const Dev = Mysql.extend({ tableName: "devs" });

var dev = {};

module.exports = {
    store (dados) {
        
        dev = new Dev({
            nome: dados.nome,
            bio: dados.bio,
            avatar: dados.avatar,
            username: dados.username, 
        });
        
        return new Promise((resolve, reject) => {
            dev.save((err, result) => {
                if (err) reject("Erro ao cadastrar!");
                else resolve(result.insertId);
            });
        });
    },
    show (username, id) {
        dev = new Dev();
        
        return new Promise((resolve, reject) => {
            var column, valor;
            if(username != null) column = "username", valor = username;
            else column = "id", valor = id;

            dev.find('first', {where: `${column} = '${valor}'`}, (err, result) => {
                if (err) reject("Erro ao verificar!");
                else resolve(result);
            });
        });
    },
    likeAndDislike (loggedUser, targetUser, method) {
        dev = new Dev();
        
        return new Promise((resolve, reject) => {
            dev.find('first', {where: `id = ${loggedUser}`}, (err, result) => {
                if(method == "like") {
                    dev = new Dev({
                        likes: result.likes + targetUser + ',',
                    });
                } else if (method == "dislike") {
                    dev = new Dev({
                        dislikes: result.dislikes + targetUser + ',',
                    });
                }
                
                dev.set('id', loggedUser);
                
                dev.save((err, result) => {
                    if (err) reject("Erro ao dar like!");
                    else resolve(true);
                });
            });
        });
    },
    index (loggedUser) {
        dev = new Dev();
        
        return new Promise((resolve, reject) => {
            
            dev.query(`select * from devs where id != ${loggedUser}`, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    }
}
