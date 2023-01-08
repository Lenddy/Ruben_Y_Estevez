const Users = require("../models/user.model")
const bcrypt = require("bcrypt")



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

    registe = (req,res)=>{
        Users.create(req.body)
        .then(
            user =>{
                const userToken = jwt.sing({
                    id:user._id
                },
                process.env.secret_Key
                )
                res
                .cookie("userToken",userToken,process.env.secret_Key,{
                    httpOnly: true
                })
                .json({
                message:"new user added",
                result:user
            })
        }
        )
        .catch(err=>res.json({err:err}))
    }



    //async and await is another way of doing .then() and .catch 
    login = async (req,res)=>{ //async means that there will be promisees inside of this function
        const user = await Users.findOne({nombreDeUsuario:req.body.nombreDeUsuario})//await will make this line of code wait for a response until it runs the next pieces of code//* it will either return a user or null 

        //if the user Name is not found on the db
        if(user === null){
            return res.sendStatus(400)
            // return res.json({message: "user not found" })
        }
        //if the user was found compare the password
        const correctPassword = await  bcrypt.compare(req.body.contraseña, user.contraseña) //compare take the password inputted and compare it to the hash password in the data base to se if it matches
        //if the password does not match
        if(!correctPassword){
            return res.sendStatus(400)
        }
        //if it matches 
        const userToken = jwt.sing({ //creates a jwt(json web token)  to sing you in 
            id: user._id //sending the id of the user to cookies (session)
        },
        process.env.secret_Key)  // also sending the secret key to that cookie ????
        res.cookie("userToken",userToken,process.env.secret_Key,{httpOnly:true})// responding with a cookie // also authenticating using the secret key
        .json({// also adding a json{} object ofa message 
            message: "success"
        })
        
    }


    logout = (req,res)=>{
        res.clearCookie("userToken");
        res.sendStatus(200)
    }

}



module.exports = new User()