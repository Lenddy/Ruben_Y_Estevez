const User = require("../controllers/user.controller");


module.exports = (app)=>{
    app.get("/api/User",User.getAll)
    app.post("/api/User/Register",User.register)
    app.delete("/api/User/delete/:id",User.delete)

}