const mongoose = require("mongoose")


//you may want to use regex on the phone number if you want you can change it later
//you may want to use regex on the phone number if you want you can change it later


const loan = mongoose.Schema({
    // clientName:{
    //     type: String,
    //     // required: [true,"debes de poner a un cliente "],
    //     // minLength:[2,"nombre del cliente debe de tener por lo menos 2 letras"]
    // },
    dateAdded:{
        type: Date,
        required: [true,"debes de poner una fecha"],
    },
    loanAmount:{
        type: Number,
        required:[true,"debes de poner una suma"],
        min:[100.00,"la suma prestada debe se ser por lo menos 100.00 pesos"]
    },
    interest:{
        type: Number,
        required:[true,"debes de poner la tasa de interés"]
    },
    cuotasNumber:{
        type:Number,
        required:[true,"debes de poner el numero de pagos/cuotas"],
    },
    timeType:{
        type:String,
         required:[true,"debes de seleccionar un tipo de pago"],
        enum:["Semanal","Quincenal","Mensual","Anual"]
    },
    client_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:[true,"necesitas seleccionar a un cliente"],
        ref:"person"
    }
    

},{timestamps:true})


const Loans = mongoose.model("loan",loan);

module.exports = Loans;