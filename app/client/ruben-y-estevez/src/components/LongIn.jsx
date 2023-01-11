import {useState,useEffect} from 'react';
import {navigate,Link} from "react-router-dom"
import axios from"axios";

const LongIn = () => {
    const [usuarios, setUsuarios] = useState([])
    const [usuario,setUsuario] = useState ("")
    const [contraseña,setContraseña] = useState ("")
    const [show, setShow] = useState(false)

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/User`,{withCredentials:true})
        .then(
            res =>{console.log(res)
            setUsuarios(res.data.results)
            })
    },[])


    const showPassword = ()=>{
        
    }



    return (
        <div>
            <h1>Iniciar sesión</h1>
            <Link to="/registrarse"><button className=' btn btn-secondary text-white'>nueva cuenta</button> </Link>
            <form className='form-group ' >
            <div>
                <label htmlFor="">Usuario </label>
                <select name=""  className='form-control'>
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
                <input type="password" name="" id="" className='form-control' />
            </div>
            <div>
                <label htmlFor="">mostrar contraseña</label>
                 <input type="checkbox" name="" id=""  /> {/*make it that when this is check that the type changes from password to text */}
            </div>
            <button className='btn btn-success mt-3' > iniciar session</button>

            </form>

        </div>
    );
};


export default LongIn;