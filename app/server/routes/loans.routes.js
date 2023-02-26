const loan = require("../controllers/loans.controller")

module.exports = (app)=>{
    app.get("/api/Loan",loan.getAll)
    app.get("/api/Loan/:id",loan.getOne)
    app.post("/api/Loan/new",loan.addOne)
    app.put("/api/Loan/update/:id",loan.updateOne)
    app.delete("/api/Loan/delete/:id",loan.deleteOne)
    // to get all the loans than one client had have
    //to get all the loans than belong to one client
    app.get("/api/Loan/People/:clientId",loan.getAllLoansOfOneClient)
    //to update the is paid status
    app.put("/api/Loan/update/status/:id/:payment_id",loan.updateStatus)
    app.put("/api/Loan/update/undo/:id/:payment_id",loan.undoLoanStatus)

    // app.get("/api/Loan/:id/:payment_id",loan.getOneLoanPayment)
    app.put("/api/Loan/status/many/:id/:payment_id",loan.updateManyLoanStatus)
    // app.get("/api/Loan//:id/:payment_id",loan.getOneLoanPayment)
}