import {useState,useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom"
import axios from"axios";

const LongIn = () => {
    const [formInfo,setFormInfo]= useState({})
    const [usuarios, setUsuarios] = useState([])
    const [formErr,setFormErr] = useState({})
    const [show, setShow] = useState("password")
    const navigate = useNavigate()


    const changeHandler =(e)=>{
        setFormInfo({
            ...formInfo,
            [e.target.name]:e.target.value
            })
    }

    const showHandler = (e)=>{
        if(e.target.checked){
            setShow("text")
        }
        else{
            setShow("password")
        }
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




    return (
        <div>
            <h1>Iniciar sesión</h1>
            <Link to="/registrarse"><button className=' btn btn-secondary text-white'>nueva cuenta</button> </Link>
            <form className='form-group ' onSubmit={submitHandler} >
            <div>
                <label htmlFor="">Usuario </label>
                <select name="nombreDeUsuario"  className='form-control' onChange={changeHandler}  >
                    <option value="" selected="true" disabled="disabled"  >seleccionar usuario</option>
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
                <input type={show} name="contraseña"  className='form-control' onChange={changeHandler} />
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
                 <input type="checkbox" name="checkbox"   onChange={e =>showHandler(e)} /> {/*make it that when this is check that the type changes from password to text */}
            </div>
            <button className='btn btn-success mt-3' > iniciar session</button>

            </form>



            <div>
                <h1>todo list</h1>
                <ol>
                    <li>add a way to store data locally</li>
                    <li>genera info about the company(mission, vision , values)</li>
                    <li>add sorting to the website (using  useLocalStorage  method)</li>
                    <li>add socket.io (also add a messaging system)  one to many tables perhaps</li>
                    <li> how to add things to excel using react(data credit) also one that allow you to print(not needed)</li>
                    <li>add a calculator(maybe us an api)</li>
                    <li>add the loan(loans table ) and the rentals table</li>
                    <li>add how to look by specific things</li>
                    <li>how to recover deleted things  (loans(person),rentals,) </li>
                    <li>se how many loans have taken or have had in past and the time that loan was set(payed back) </li>
                    <li>maybe how to render the page on the persons chose language(not needed) </li>
                    <li> add to be able to add documents to every individual (loaned, rental)</li>
                    <li>how to calculate the amount of payments  that a person need to make all round (and the day of those payments)  </li> 
                    <li>history of payments</li>
                    <li>add a chart on that show how much mony is coming and out  and how much interest is coming in  </li>
                    <li> to be able to make bonus to you payments  </li>
                    <li> make customs components alerts (go watch the video about custom alerts in your YouTube )</li>
                </ol>
            </div>

        </div>
    );
};


export default LongIn;