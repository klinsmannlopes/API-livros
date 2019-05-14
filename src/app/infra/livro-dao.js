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

    buscaPorId(id) {
        return new Promise((resolve, reject) => {
            this._db.get(`
                SELECT * 
                FROM livros
                WHERE id = ?
            `,
            [id],
            (erro, livro) => {
                if (erro) return reject('Não foi possível encontrar o livro');

                return resolve(livro);
            });
        });
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.get(`
                DELETE 
                FROM livros
                WHERE id = ?
            `,
            [id],
            (erro) => {
                if(erro) {
                    return reject('Não foi possivel deletar livro');
                }
                return resolve();                  
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

    atualiza(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE livros SET
                titulo = ?,
                preco = ?,
                descricao = ?
                WHERE id = ?
            `,
            [
                livro.titulo,
                livro.preco,
                livro.descricao,
                livro.id
            ],
            erro => {
                if (erro) {
                    return reject('Não foi possível atualizar o livro!');
                }

                resolve();
            });
        });
    }

}

module.exports = LivroDao;