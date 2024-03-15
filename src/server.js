require("express-async-errors") //importando biblioteca de erros
const migrationsRun = require("./database/sqlite/migrations")
const AppError = require("./utils/AppError") //importando AppError

const express = require("express"); //importando biblioteca express
const routes = require("./routes");

migrationsRun();

const app = express();
app.use(express.json());

app.use(routes); //1- procura as routes -> vai para index.js



app.use(( error, request, response, next ) => {
    if(error instanceof AppError){ //identificando se erro foi do cliente (se está no UsersController.js)
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    } 

    console.error(error) //para capturar o erro

    return response.status(500).json({ //erro geral
        status: "error",
        message: "Internal server error",
    })

})

const PORT = 3333; //qual porta o app vai rodar
app.listen(PORT, () => console.log(`Server is runnning on Port ${PORT}`));