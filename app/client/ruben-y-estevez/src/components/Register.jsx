import {useState,} from 'react';
import {navigate,Link, useNavigate} from "react-router-dom"
import axios from"axios";
import { set } from 'mongoose';

const Register = () => {
    const [formInfo,setFormInfo] = useState ({})
    const [fromErrors,setFromErrors] = useState({})
    const navigate = useNavigate()

    const submitHandler = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:8000/api/User/Register",formInfo,{withCredentials:true})//{withCredentials:true} so we are able to create a cookie
        .then(
            res =>{
                console.log("this is the result",res)
            if(res.data?.err){
                setFromErrors(res.data.err.errors)
            }else{
                setFromErrors({})
                navigate("/")
            }
        }
        ).catch(err => console.log( "there was an error",err))
    }
    
    const changeHandler = (e)=>{
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })
    }
    
    
    return (
        <div>
            <h1> Registrarse </h1>
            <Link to="/"><button className=' btn btn-secondary text-white'>ya tengo una cuenta</button> </Link>
            <form className='form-group ' onSubmit={submitHandler} >
            <div>
                <label htmlFor="" >Nombre </label>
                <input type="text" name='nombre' className='form-control'  onChange={changeHandler} />
                {   formInfo.nombre?.length > 0 && formInfo.nombre?.length < 2?
                    <p style={{color:"red"}}  >nombre debe de ser por lo menos 2 letras</p>:
                    fromErrors.nombre? <p style={{color:"red"}} > {fromErrors.nombre.message} </p>:
                    null
                }
            </div> 
            <div>
                <label htmlFor=""> Apellido </label>
                <input type="text" name="apellido"  className='form-control' onChange={changeHandler} />
                {   formInfo.apellido?.length >0 && formInfo.apellido?.length < 2?
                    <p style={{color:"red"}}  >apellido debe de ser por lo menos 2 letras</p>:
                    fromErrors.apellido? <p style={{color:"red"}} > {fromErrors.apellido.message} </p>:
                    null
                }
            </div>
            <div>
                <label htmlFor="">Nombre de Usuario</label>
                <input type="text" name="nombreDeUsuario"  className='form-control' onChange={changeHandler} /> 
                {   formInfo.nombreDeUsuario?.length >0 && formInfo.nombreDeUsuario?.length < 2?
                    <p style={{color:"red"}}  >nombre De Usuario debe de ser por lo menos 2 letras</p>:
                    fromErrors.nombreDeUsuario? <p style={{color:"red"}} > {fromErrors.nombreDeUsuario.message} </p>:
                    null
                }
            </div>
            <div>
                <label htmlFor="">Contraseña</label>
                <input type="password" name="contraseña"  className='form-control' onChange={changeHandler}/> 
                {   formInfo.contraseña?.length >0 && formInfo.contraseña?.length < 3?
                    <p style={{color:"red"}}  >contraseña debe de ser por lo menos 3 letras o números</p>:
                    fromErrors.contraseña? <p style={{color:"red"}} > {fromErrors.contraseña.message} </p>:
                    null
                }
            </div>
            <div>
                <label htmlFor="">confirmar contraseña</label>
                <input type="password" name="confirmar"   className='form-control' onChange={changeHandler}/> 
                { 
                    fromErrors.confirmar? <p style={{color:"red"}} > {fromErrors.confirmar.message} </p>:
                    null
                }
            </div>
            <button className='btn btn-success mt-3'>Registrarse</button>
            </form>
        </div>
    );
};


export default Register;























// import {useState,} from 'react';
// import {navigate,Link, useNavigate} from "react-router-dom"
// import axios from"axios";
// import { set } from 'mongoose';

// const Register = () => {
//     const [formInfo,setFormInfo] = useState ({})
//     const [fromErrors,setFromErrors] = useState({})
//     const navigate = useNavigate()
//     const [nombre,setNombre] = useState("")
//     const [apellido,setApellido] = useState("")
//     const [nombreDeUsuario,setUsuario] = useState("")
//     const [contraseña,setContraseña] = useState("")
//     const [confirmar,setConfirmar] = useState("")

//     const submitHandler = (e)=>{
//         e.preventDefault()
//         const formInfo={nombre,apellido,nombreDeUsuario,contraseña,confirmar}
//         axios.post("http://localhost:8000/api/User/Register",formInfo,{withCredentials:true})//{withCredentials:true} so we are able to create a cookie
//         .then(
//             res =>{
//                 console.log("this is the result",res)
//             if(res.data?.error){
//                 setFromErrors(res.data.error.errors)
//             }else{
//                 setFromErrors({})
//                 // navigate("/")
//             }
//         }
//         ).catch(err => console.log( "there was an error",err))
//     }
    
//     // const changeHandler = (e)=>{
//     //     setFormInfo({
//     //         ...formInfo,
//     //         [e.target.name]: e.target.value
//     //     })
//     // }
    
    
//     return (
//         <div>
//             <h1> Registrarse </h1>
//             <Link to="/"><button className=' btn btn-secondary text-white'>ya tengo una cuenta</button> </Link>
//             <form className='form-group ' onSubmit={submitHandler} >
//             <div>
//                 <label htmlFor="" >Nombre </label>
//                 <input type="text" name='nombre' className='form-control'  onChange={e=> setNombre(e.target.value)} />
//             </div> 
//             <div>
//                 <label htmlFor=""> Apellido </label>
//                 <input type="text" name="apellido"  className='form-control' onChange={e =>setApellido(e.target.value)} />
//             </div>
//             <div>
//                 <label htmlFor="">Nombre de Usuario</label>
//                  <input type="text" name="nombreDeUsuario"  className='form-control' onChange={e=>setUsuario(e.target.value)} /> {/*make it that when this is check that the type changes from password to text */}
//             </div>
//             <div>
//                 <label htmlFor="">Contraseña</label>
//                  <input type="password" name="contraseña"  className='form-control' onChange={e=>setContraseña(e.target.value)}/> {/*make it that when this is check that the type changes from password to text */}
//             </div>
//             <div>
//                 <label htmlFor="">confirmar contraseña</label>
//                  <input type="password" name="confirmar"   className='form-control' onChange={e=>setConfirmar(e.target.value)}/> {/*make it that when this is check that the type changes from password to text */}
//             </div>
//             <button className='btn btn-success mt-3'>Registrarse</button>
//             </form>
//         </div>
//     );
// };


// export default Register;