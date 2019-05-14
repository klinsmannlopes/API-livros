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

    addLivro(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `INSERT INTO livros (
                    titulo,
                    preco,
                    descricao
                ) values (?,?,?)
                `,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao
                ],
                (erro) => {
                    if(erro) {
                        console.log(erro);
                        return reject('Não foi possivel adicionar livro');
                    }

                    resolve('Livro foi adicionado');
                }
            )
        });
    }

}

module.exports = LivroDao;