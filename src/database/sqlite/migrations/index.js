const sqliteConnection = require('../../sqlite'); //importando sqliteConnection
const createUsers = require('./createUsers'); //importando o criador de tabelas

async function migrationsRun(){
    const schemas = [ //tabelas do createUsers
        createUsers
    ].join('');

    sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.error(error))
}

module.exports = migrationsRun;