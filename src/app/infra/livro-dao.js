class LivroDao {
    constructor(db) {
        this._db = db;
    }

    Lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                (erro, resultados) => {
                    if(erro) return reject('não foi possível listar livros');

                    return resolve(resultados);
                }
            )
        });
        
    }
}

module.exports = LivroDao;