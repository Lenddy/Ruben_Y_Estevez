const User = require("../controllers/user.controller");


module.exports = (app)=>{
    app.get("/api/User",User.getAll)
    app.post("/api/User",User.registe)
    
}