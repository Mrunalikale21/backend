class ApiError extends Error {
  constructor(
      statusCode,
      message= "Somthing wentt wrong",
      errors = [],
      stack = ""
  ){
    super(message)
    this.statusCode = statusCode
    this.data = null
    this.message = message
    this.sucess = false
    this.errors = errors //it is array so

    if(stack){
      this.stack = stack
    }else{
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export {ApiError}