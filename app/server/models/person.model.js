const mongoose = require("mongoose")


//you may want to use regex on the phone number if you want you can change it later
//you may want to use regex on the phone number if you want you can change it later


const person = mongoose.Schema({
    name:{
        type: String,
        required: [true,"debes de poner un nombre"],
        minLength:[2,"nombre debe de ser por lo menos 2 letras"]
    },
    Lname:{
        type: String,
        required: [true,"debes de poner un apellido"],
        minLength:[2,"apellido debe de ser por lo menos 2 letras"]
    },
    nickname:{
        type: String,
        minLength:[2," apodo debe de ser por lo menos 2 letras"]
    },
    dob:{
        type: Date,
        required:[true,"debes de poner el dia de nacimiento"]
    },
    idType:{
        type:String,
        required:[true,"debes de seleccionar una forma de identificación "],
        enum:["Cédula","RNC","Pasaporte"],
    },
    idNum:{
        type:String,
        required:[true,"debes tener un numero de identificación"],
        minLength:[6,"numero de identificación debe de tener por lo menos 6 letras o números"]
    },
    pNumber:{
        type:String,
        required:[true,'debes de agregar un numero telefónico'],
        minLength:[10,"numero telefónico debe de tener por lo menos 10 números"]
    },
    address:{
        type: String,
        required:[true,"debes de agregar una dirección" ],
        minLength:[5,"la dirección debe de tener por lo menos 5 letras o números"]
    },
    workPlace:{
        type:String,
        required: [true,"debes de poner un lugar de trabajo"],
        minLength: [2,"lugar de trabajo debe de tener por lo menos 2 letras o números"]
    },
    occupation:{
        type:String,
        required:[true,"debes de poner una ocupación"],
        minLength: [2,"ocupación debe de tener por lo menos 2 letras o números"]
    },
    income:{
        type:Number,
        required:[true,"debes de poner un ingreso"],
        min: [1.00,"la suma minima es $1.00 "]
    },
    otherIncome:{
        type:Number,
        min: [1.00,"la suma minima es $1.00 "]
    },
    workPNumber:{
        type:String,
        required:[true,'debes de agregar el numero telefónico de lugar de trabajo'],
        minLength:[10,"numero telefónico debe de tener por lo menos 10 números"]
    },
    workingYears:{
        type:String,
        required:[true,'debes de agregar el tiempo que a trabajado para esta compañía'],
        minLength:[2,"debes de agregar por lo menos 2 letras o numeres"]
    },
    workAddress:{
        type:String,
        required:[true,'debes de agregar la direction the trabajo'],
        minLength:[5,"la dirección de trabajo debe de tener por lo menos 5 letras o números"]
    },
},{timestamps:true})


const Persons = mongoose.model("person",person);

module.exports = Persons;