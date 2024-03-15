class AppError {
    message; //criando variaveis message e status code
    statusCode;

    constructor(message, statusCode = 400){ //toda classe tem o constructor; passando statusCode 400 se não tiver outro  
        this.message = message;
        this.statusCode = statusCode
    }
}

module.exports = AppError; //exportando essa classe