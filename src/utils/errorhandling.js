const errorHandlingMiddleware = (err, req, res, next) => {
 if (err.name === "ValidationError"){
    let errors = {}

    Object.keys(err.errors).forEach((key)=>{
        errors[key] = err.errors[key].message;
    });
 }
};

module.exports = errorHandlingMiddleware;