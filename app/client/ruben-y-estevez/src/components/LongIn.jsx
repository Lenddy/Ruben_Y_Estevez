import {useState,useEffect} from 'react';
import {navigate,Link, useNavigate} from "react-router-dom"
import axios from"axios";

const LongIn = () => {
    const [formInfo,setFormInfo]= useState({})
    const [usuarios, setUsuarios] = useState([])
    const [formErr,setFormErr] = useState({})
    const [show, setShow] = useState(false)
    const navigate = useNavigate()


    const changeHandler =(e)=>{
        setFormInfo({
            ...formInfo,
            [e.target.name]:e.target.value
            })
    }

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/User`, {withCredentials:true})
        .then(
            res =>{console.log(res)
            setUsuarios(res.data.results)
            })
    },[])

    const submitHandler=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:8000/api/User/Login",formInfo,{withCredentials:true})
        .then(res =>{console.log(res)
            if(res.data?.err){
                setFormErr(res.data.err)
            }else{
                // setFormErr(null)
                navigate("/DashBoard")
            }
        })
        .catch(err=>console.log(err))
    }


    const showPassword = ()=>{
        
    }



    return (
        <div>
            <h1>Iniciar sesión</h1>
            <Link to="/registrarse"><button className=' btn btn-secondary text-white'>nueva cuenta</button> </Link>
            <form className='form-group ' onSubmit={submitHandler} >
            <div>
                <label htmlFor="">Usuario </label>
                <select name="nombreDeUsuario"  className='form-control' onChange={changeHandler}  >
                    <option value="">seleccionar usuario</option>
                    {
                        usuarios.map((u)=>{
                            return(
                                <option value={u.nombreDeUsuario} key={u._id}> {u.nombreDeUsuario}</option>
                            )
                        })
                    }
                </select>

            </div>

            <div>
                <label htmlFor="">contraseña</label>
                <input type="password" name="contraseña"  className='form-control' onChange={changeHandler} />
                {
                    formInfo.contraseña?.length >0 && formInfo.contraseña?.length < 3?
                    <p style={{color:"red"}}  >contraseña debe de ser por lo menos 3 caracteres</p>:
                    formErr.nombreDeUsuario?
                    <p className='text-danger' >{formErr.nombreDeUsuario?.msg}</p>:
                    formErr.contraseña?<p className='text-danger' >{formErr.contraseña?.msg}</p>:null
                }
            </div>
            <div>
                <label htmlFor="">mostrar contraseña</label>
                 <input type="checkbox" name="checkbox"   /> {/*make it that when this is check that the type changes from password to text */}
            </div>
            <button className='btn btn-success mt-3' > iniciar session</button>

            </form>

        </div>
    );
};


export default LongIn;