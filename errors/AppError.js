class AppError extends Error {
 constructor(message, statusCode) {
   super(message);
   // appelle le constructeur de Error
   this.statusCode = statusCode;
   this.name = "AppError";
 }
}
 
export default AppError;
