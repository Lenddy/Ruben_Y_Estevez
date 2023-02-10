const  loan= require("../models/loans.model")
const jwt = require("jsonwebtoken")



class Loan{

    getAll = (req,res)=>{
        loan.find()
        .populate("client_id")
        .then(
            allLoans =>{
                res.json({
                    count: allLoans.length,
                    results:allLoans
                })
            }).catch(
            err=>{res.json({err, msg:"error getting all the loans "})}
        )}

    getAllLoansOfOneClient = (req,res)=>{ //to get all the loans that belong to one client
        loan.find({client_id:req.params.clientId})
        .populate("client_id")
        .then(
            allLoans =>{
                res.json({
                    count: allLoans.length,
                    results:allLoans
                })
            }).catch(
            err=>{res.json({err, msg:"error getting all the loans "})}
        )}

    addOne = (req,res)=>{
        loan.create(req.body)
        .then(newLoan =>{
            res.json({
                results:newLoan
            })
        }).catch(err =>{res.json({err,msg:"error creating a new loan"})})
    }

    getOne = (req,res)=>{
        loan.findOne({_id:req.params.id})
        .populate("client_id")
        .then(oneLoan=>{
            res.json({
                results:oneLoan
            })
        }).catch(err =>{res.json({err,msg:"error getting one loan"})})
    }

    updateOne = (req,res)=>{
        loan.findOneAndUpdate(
            {_id:req.params.id},
            req.body,
            {new:true,runValidators:true}
            )
            .then(updateOndeLoan=>{
                res.json({
                    results:updateOndeLoan
                })
            }).catch(err =>{res.json({err,msg:"error updating one loan"})})
    }

    deleteOne = (req,res)=>{
        loan.findOneAndDelete({_id:req.params.id})
        .then(deleteLoan=>{
            res.json({
                results:deleteLoan
            })
        }).catch(err =>{res.json({err,msg:"error deleting one loan"})})
    }

}


module.exports = new Loan