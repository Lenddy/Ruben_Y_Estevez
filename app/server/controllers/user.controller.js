const Users = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


class User {
    getAll = (req,res)=>{
        Users.find()
        .then(allUsers =>{
            res.json({
                count: allUsers.length,
                results: allUsers
            })
        })
        .catch(err => res.json({message:"error getting all users",error:err}))
    }





    register = (req,res)=>{//! the token and the use of cookies is giving an error but the instance is still made 
                    //! if yo take out lines 25-29 and 31-32 the error goes away and show the new user being added
        Users.create(req.body)
        .then(user =>{
                const userToken = jwt.sign({
                    id:user._id,
                    name:user.nombre
                },process.env.SECRET_KEY)
                //responding  with a cookie call "userToken" which contains the jwt from above call userToken and also respondin with json with info about the user who just got created
                res.cookie("userToken",userToken,process.env.SECRET_KEY,{httpOnly: true})
                .json({
                message:"new user added",
                result:user
            })})
        .catch(err=>res.json({message: "there was an error adding the new user",err:err}))
    }




    //async and await is another way of doing .then() and .catch 
    login = async (req,res)=>{ //async means that there will be promisees inside of this function
        const user = await Users.findOne({nombreDeUsuario:req.body.nombreDeUsuario})//await will make this line of code wait for a response until it runs the next pieces of code//* it will either return a user or null 
        //if the user Name is not found on the db
        if(user === null){
            // return res.sendStatus(400)
            return res.json({message: "user not found",user })
        }
        //if the user was found compare the password
        const correctPassword = await  bcrypt.compare(req.body.contraseña, user.contraseña) //compare take the password inputted and compare it to the hash password in the data base to se if it matches
        //if the password does not match
        if(!correctPassword){
            // return res.sendStatus(400)
            return res.json({message:"password need to match"})
        }
        //if it matches 
        const userToken = jwt.sing({ //creates a jwt(json web token)  to sing you in 
            id: user._id //sending the id of the user to cookies (session)
        },
        process.env.SECRET_KEY)  // also sending the secret key to that cookie ????
        res.cookie("userToken",userToken,process.env.SECRET_KEY,{httpOnly:true})// responding with a cookie // also authenticating using the secret key
        .json({// also adding a json{} object ofa message 
            message: "success"
        })
        
    }


    logout = (req,res)=>{
        res.clearCookie("userToken");
        res.sendStatus(200)
    }



    delete =(req,res)=>{
        Users.findOneAndDelete({_id:req.params.id})
        .then(user =>{
            res.json({
                deletedUser:user
            })
        }).catch(err=>res.json({msg:"user was not deleted", error:err}))
    }
}


module.exports = new User()


