const sqlite3 = require("sqlite3"); //importando SQLite
const sqlite = require("sqlite");
const path = require("path"); //importando biblioteca para ajudar na criação do database.db

async function sqliteConnection(){ //criando função async para criar arquivo database se não existir
    const database = await sqlite.open({
        filename: path.resolve(__dirname, "..", "database.db"), //path.resolve para salvar no lugar certo
        driver: sqlite3.Database //driver para acessar database
    });

    return database;
}

module.exports = sqliteConnection;