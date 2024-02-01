const devErrors = (res,error)=>{
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
        stackTrace: error.stack,
        error: error
    });
}

const prodErrors = (res,error)=>{
    if(error.isOperational){
        res.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message
        });
    }else {
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong! Please try again later.'
        })
    }
}
export const globalErrorHandler = (error,req,res,next)=>{
    error.statusCode = error.statusCode || 500
    error.status = error.status || 'error'
    if(process.env.NODE_ENV == 'developement'){
        devErrors(res,error)
    }else if(process.env.NODE_ENV == 'production'){
        prodErrors(res,error)
    }
}