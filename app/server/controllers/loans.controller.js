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
    // api/Loan/update/status


    updateStatus = async (req, res) => {
        const id = req.params.id
        const payment_id = parseInt(req.params.payment_id)
        await loan.findOne({_id:id})
        .updateOne(
            {"payments._id": payment_id},
            {
                $set:{
                    "payments.$.isPaid":Boolean(true)
                }
            }
        )
        .then(statusUpdate=>{
            res.json({
                results:statusUpdate
            })
        }).catch(err =>{res.json({err,msg:"error updating the status of  one loan"})})
    }

        //you may want to undo the async await part 
    undoLoanStatus = async (req, res) => {
        const id = req.params.id
        const payment_id = parseInt(req.params.payment_id)
        await loan.findOne({_id:id})
        .updateOne(
            {"payments._id": payment_id},
            {
                $set:{
                    "payments.$.isPaid":Boolean(false)
                }
            }
        )
        .then(statusUpdate=>{
            res.json({
                results:statusUpdate
            })
        }).catch(err =>{res.json({err,msg:"error updating the status of  one loan"})})
    }


    getOneLoanPayment = async (req,res)=>{
        const id = req.params.id
        const payment_id = parseInt(req.params.payment_id)
        await loan.findOne({_id:id}).find({"payments":{$elemMatch :{"payments.id":payment_id}}})
        .then(statusUpdate=>{
            res.json({
                results:statusUpdate
            })
        }).catch(err =>{res.json({err,msg:"error updating the status of  one loan"})})
    }



    // updateManyLoanStatus = async (req, res) => {
    //     const id = req.params.id
    //     const payment_id = parseInt(req.params.payment_id)
    //     await loan.find({_id:id})
    //     .find({payments:{$elemMatch:{_id:{$lte:payment_id},isPaid:Boolean(false)}}})
    //     // .updateOne(
    //     //     {"payments._id": payment_id},
    //     //     {
    //     //         $set:{
    //     //             "payments.$.isPaid":Boolean(true)
    //     //         }
    //     //     }
    //     // )
    //     .then(statusUpdate=>{
    //         res.json({
    //             results:statusUpdate
    //         })
    //     }).catch(err =>{res.json({err,msg:"error getting the status of many loans"})})
    // }
    
    // ,
    // {
        //     $set:{
            //         "payments.$.isPaid":Boolean(false)
    //     }
    // }




    // updateStatus = async (req, res) => {
    //     const id = req.params.id
    //     const payment_id = parseInt(req.params.payment_id)
    //     const toUpdate =await loan.findOneAndUpdate(
    //         {_id:id},
    //         {
    //             "payments._id":payment_id
    //         },
    //         {"$set":{"Payments.$.isPaid": true}}
    //         // {"arrayFilters":[{"i._id":payment_id}]}
    //     ).then(statusUpdate=>{
    //         res.json({
    //             results:statusUpdate
    //         })
    //     }).catch(err =>{res.json({err,msg:"error updating the status of  one loan"})})
    // }

    // updateStatus = async (req, res) => {
    //     const { id , paymentNumber , isPaid } = req.body;
    //     // = req.params.id
    //     // = req.params.paymentNumber\
    //     // = req.params.Paid
    //     try {
    //     const loan = await Loan.findOneAndUpdate(
    //         { _id: id, 'payments.paymentNumber': paymentNumber },
    //         { "$set": { 'payments.$[o].${isPaid}': true } },
    //         {"arrayFilters":[{"o.paymentNumber":paymentNumber}]}
    //         // { new: true }
    //     );
    
    //     if (!loan) {
    //         return res.status(404).json({ message: 'Loan or payment not found' });
    //     }
    
    //     res.status(200).json(loan);
    //     } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ message: 'Server error' });
    //     }
    // }


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