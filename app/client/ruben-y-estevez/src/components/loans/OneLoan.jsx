import {useEffect, useState} from "react";
import { useParams,useNavigate, Link } from "react-router-dom"; 
import axios from "axios";
import UndoPayment from "./UndoPayment";

const OneLoan =(props)=>{
    const {cancelPayment} = props
    const {id} = useParams()
    const navigate = useNavigate()
    const [loan,setLoan] = useState({})
    const [payments,setPayments] =useState([])
    const [selected, setSelected] = useState(null);
    const [number,setNumber] = useState([])
    const [error,setError] = useState({})
    const [loanValues,setLoanValues] = useState([])

console.log('this are the payments',payments[selected >= selected -1])
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/Loan/`)
        .then(res =>{
            setNumber(res.data.results)
        }).catch(err=>{ 
            console.log("error",err)
        })
    },[])

console.log("this are the loan values",loanValues)


    useEffect(()=>{
        axios.get(`http://localhost:8000/api/Loan/${id}`)
        .then(res =>{
            setLoan(res.data.results)
            console.log(res.data.results)
            setPayments(res.data.results.payments)
        }).catch(err=>{ 
            console.log("error",err)
        })
    },[])

    const numberWithCommas=(x)=>{
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    const changeHandler=(e)=>{
        setSelected(e.target.value)
        // {
        //     ...selected,
        //     [e.target.name]: e.target.value
        // }
    }
    const submitHandler=(e,payment_id)=>{
        e.preventDefault()
        axios.put(`http://localhost:8000/api/Loan/update/status/${id}/${payment_id}`)
        .then(res =>{
            console.log(res.data.results)
            if(payment_id == null || payment_id == undefined){
                setError({err:"debes de seleccionar una cuota "})
            }else{
                setError()
                axios.get(`http://localhost:8000/api/Loan/${id}`)
        .then(res =>{
            setLoan(res.data.results)
            console.log(res.data.results)
            console.log(res.data.results.payments)
            setPayments(res.data.results.payments)
        }).catch(err=>{ 
            console.log("error",err)
        })
                navigate(`/Prestamos/${id}`)
            }
        }).catch(err=>{ 
            console.log("error",err)
        })
    }

    //! here
    const calculation =(number)=>{
    {

        // you get an array of all the te payments with this make use of it like to add up all the amount that the person is going to pay  if they select more than one payments 
        payments?.filter(p=> p._id <= number).map((p,idx)=>{
            return(
                setLoanValues([...loanValues,p.principalPayment])
            )
            })
        }

    }
    

    //! pass payments an other info as a prop and change some stuff in the other side undone payment by the way
    return(
        <div>
            <div>
                <Link to="/Dashboard" className="btn btn-primary" >todos los prestamos</Link>
                <Link to="/Prestamos" className="btn btn-primary" >todos los prestamos</Link>
                <UndoPayment id={id} payments={payments} />
 
            </div>
                <h1>{loan?.client_id?.fullName}</h1>
                <div>
                    <label> # préstamo</label>
                    {number.filter(p=>p._id== id).map((n,
                    idx)=>{
                        let number = idx+1
                        let newNumber = ""
                        if (number < 10) {
                            newNumber = `00${number}`;
                        } else {
                            newNumber = `0${number}`;
                        }
                        return <input type="text" disabled value={newNumber}/>
                    })
                }
                <div className="d-flex  justify-content-between align-middle " style={{width:"400px",border:"solid 1px black"}}>
                <h5>total a pagar: {loan?.total? numberWithCommas(loan.total.toFixed(2)):null}</h5>
                <h5>total capital: {loan?.totalCapital? numberWithCommas(loan.totalCapital.toFixed(2)):null}</h5>
                </div>
                    <form onSubmit={e=>submitHandler(e,selected)}>
                    <select className="form-control" onChange={e=>{changeHandler(e); calculation(e.target.value)}} name="_id"  >
                        <option value={undefined} selected>seleccionar cuota/s</option>
                        {
                            payments?.filter(p=> p.isPaid == false).map((p,idx)=>{
                                return(
                                    <option value={p._id} key={idx}>{`${p?._id}| ${p?.paymentDate} |${numberWithCommas(p?.principalPayment.toFixed(2))}`}</option>
                                )
                            })
                        }
                    </select>
                    {
                        error == undefined || error == null?<p className="text-danger">{error?.err}</p>:
                        selected !== null || selected !== undefined? null:
                        <p className="text-danger">{error?.err}</p>
                    }
                        <h1>hola</h1>
                    {
                        selected === undefined || selected === null?
                        null:
                        <button className="btn btn-success mt-3">pagar</button>
                    }
                    </form>
                </div>
        </div>
    )
                    }
export default OneLoan;






                           {/* <div className="alert alert-warning alert-dismissible fade show" role="alert">
                 <strong>Holy guacamole!</strong> You should check in on some of those fields below.
                 <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                 <span  aria-hidden="true">&times;</span>
                 </button>
             </div>\ */}
             {/* <button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button> */}















{/* <div className='"row justify-content-center"' >
<div className='col-auto'>
<table className='table table-responsive ' style={{width:"75%"}}>
<thead className='text-center'>
<tr >
<th >fecha de pago</th>
<th >#cuota</th>
<th >Pago a interés</th>
<th >Pago a capital</th>
<th>cuota</th>
<th  >Balance</th>
</tr>
</thead>
<tbody className='text-center'>
{payments.map((payment, index) => (
<tr key={index}>
<td>{payment.paymentDates}</td>
<td>{payment.paymentNumber}</td>
<td>{numberWithCommas(payment.interestPayment.toFixed(2))}</td>
<td>{numberWithCommas(payment.capitalPayment.toFixed(2))}</td> 
<td>{numberWithCommas(payment.principalPayment.toFixed(2))}</td>
<td>{numberWithCommas(payment.balance.toFixed(2))}</td> 
</tr>
))}
</tbody>
<tfoot className='text-center' >
<tr>
<td>Total</td>

<td>{numberWithCommas(total.toFixed(2))}</td>
<td>{numberWithCommas(totalInterest.toFixed(2))}</td>
<td></td>
<td>{numberWithCommas(totalPrincipal.toFixed(2))}</td>
<td></td>
</tr>
</tfoot>
</table> */}


