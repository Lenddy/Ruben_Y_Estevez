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
            <h1 className='text-danger'> you might want to change the input type to the time of repayment on the back end for the loans set it to numbers </h1>
            <h1>Iniciar sesión</h1>
            <Link to="/registrarse"><button className=' btn btn-secondary text-white'>nueva cuenta</button> </Link>
            <form className='form-group ' onSubmit={submitHandler} >
            <div>
                <label htmlFor="">Usuario </label>
                <select name="nombreDeUsuario"  className='form-control' onChange={changeHandler}  >
                    <option value="" selected={true} disabled="disabled"  >seleccionar usuario</option>
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

                    <p className='text-danger'>interval's  broooooooo</p>
                    <p className='text-danger'> create a function that takes  2 parameters one the day  and one the amount of time (weekly = +7, 15days = + 15 , monthly = 31(change this one to fit the amount of time on how long the month is edge case ))   then   ether create another function that has the Logic to count the amount of money that they need to  pay add a parameter that says if they haven't pay by the day(date that was set )  time(weekly = +7, 15days = + 15 , monthly = 31) then the amount raises multiply by the interest () also create another function  that allow you to input a different amount that is less or == to the amount that particular payment(cuota) is  then  dubstracted (the current payment -(minus) the amount inputed)    <span className='text-primary' > fine a way to store some of the info in arrays  OR/ make a add new loan  api and this loan needs to be attach to only on particular user (one to many)  and fine out  a way to prevent  one a cliente of having more than 1 loan at the time iF you can (I KNOW YOU CAN BIG DADDY)    </span>  </p>

                    <div>
                    <p className='text-danger'>idea came into my head to have a flag(boolean) tha sets the a loan to true(or false when tey are done because the loan wont be true or false because i was never created) when is active but set to false when the las 
                    payment(cuota) is payed  and while this boolean is true trow a erro message  that does not alow one(OR SAYS THE WHILE THEY HAVE AT LEAST ONE CUOTA UN PAYED IN THEIR LAST(CURRENT LOAN) THEY ARE NOT ALOW TO HAVE MORE LOANS )    ALSO FIGRE OUT THE BLACK LISTING  WITH A BOOLEAN()/ ALSO TALK WITH THE PEOPLE ABOUT A FEATURE THAT IF THEY ARE IN A GREEN LIST( ORE TRUSTED LIST ) THEY ARE ALOW TO HAVE ONE FEATURE (LIKE PAY LEST MONEY  OR SOMETHING LIKE THAT )   </p>
                    </div>

            <div>
                <h1>todo list</h1>
                <ol>
                    <li>use regex for the phone numbers</li>
                    <li>learn how to transfer messages and audio files from WhatsApp to this system/webpage</li>
                    <li>make a calculator on the payment page</li>
                    <li>learn how to make a drop down menu  select multiple inputs (example) if a person selects a field that is not the first one then input that was selected is selected and aso the previous inputs before that  ar also selected (idea) if more thatn oen input is selected make all the other inputs in to an array([]) and loop on that array  to calculate the total amount( also use for the calculator later on)  </li>
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


/* for the loans you need 

before you create a loan fine a way that the workers can preview
so they can tell the clientes the total amount that they need to pay
the interés they will need to pay back
the days that they need to pay  and they amount that they need to pay that day 


adn add places where they need to sign both the client and then worker


1 id for the loan
    fine a way to make the id     maybe set a state that will go up and attach the current number  to one specific loan 

2 the name of the client

3 date of the loan 
    1 from this you need to make function that will alow the workers to update loans 
    2 see the  total amount that the person needs to pay 
    3 see  the amount that they need to pay the day that they are suppose to 
    4 if they dont pay they will hav to pay a lateness  fee and that late ness comes 5 days after the current cuota is not payed
    5 a way that the clients can add bonuses to the current cuota instead of the full cuota 
    6 a history of payment and that has the day they pay ,the amount and the cuota/s number
        1 this must have the amount of total full cuotas that are payed
        2 total amount that has been payed at the time
        3 total capital that has been payed 
        4 and the total capital that has been payed

4 amount of the loan

5 inters rate

6 then amount of cuotas

7 repayment period 
    1 monthly
    2 every 15 days
    3 weekly
*/
