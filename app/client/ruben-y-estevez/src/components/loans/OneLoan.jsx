import {useEffect, useState} from "react";
import { useParams,useNavigate, Link } from "react-router-dom"; 
import axios from "axios";
import UndoPayment from "./UndoPayment";
import Print from "../Print";
import Select from "react-select"

const OneLoan =(props)=>{
    // const {cancelPayment} = props
    const {id} = useParams()
    console.log(id)
    const navigate = useNavigate()
    const [loan,setLoan] = useState({})
    const [payments,setPayments] =useState([])
    const [selected, setSelected] = useState(null);
    const [number,setNumber] = useState([])
    const [error,setError] = useState({})
    const [loanValues,setLoanValues] = useState({})
    const [Default, setDefault] = useState("seleccionar cuota/s")
    console.log(loanValues)
{/* <Select options={payments?.filter(p=> p.isPaid == false).map((p,idx)=>{
                                return(
                                    <option value={p._id} key={idx}>{`${p?._id}| ${p?.paymentDate} |${numberWithCommas(p?.principalPayment.toFixed(2))}`}</option>
                                )
                            })}/> */}

                    {/* <select className="form-control" onChange={e=>{changeHandler(e); calculation(e.target.value)}} name="_id"  >
                        <option value={Default.cuota} selected>seleccionar cuota/s</option>
                        {
                            payments?.filter(p=> p.isPaid == false).map((p,idx)=>{
                                return(
                                    <option value={p._id} key={idx}>{`${p?._id}| ${p?.paymentDate} |${numberWithCommas(p?.principalPayment.toFixed(2))}`}</option>
                                )
                            })
                        }
                    </select> */}

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/Loan/`)
        .then(res =>{
            setNumber(res.data.results)
        }).catch(err=>{ 
            console.log("error",err)
        })
    },[])


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
        // setDefault()
        console.log(e.target.value)
    }
    const submitHandler=(e,payment_id)=>{
        e.preventDefault()
        // http://localhost:8000/api/Loan/update/status/${id}/${payment_id}
        axios.put(`http://localhost:8000/api/Loan/update/status/${id}/${payment_id}`)//
        .then(res =>{
            // console.log(res.data.results)
            if(payment_id == null || payment_id == undefined){
                setError({err:"debes de seleccionar una cuota "})
            }
            else{
                setSelected(null)
                setError()
                axios.get(`http://localhost:8000/api/Loan/${id}`)
                .then(res =>{
                    setLoan(res.data.results)
                    // console.log(res.data.results)
                    // console.log(res.data.results.payments)
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
    const calculation =(num)=>{ 
        let totalPayment = 0// principal payment
        let totalCapital = 0// capital payment
        let totalInterest = 0// interest payment
        const filteredPayments = payments?.filter(p => p._id <= num && p.isPaid == false);

        filteredPayments?.forEach(item =>{
            totalPayment += parseFloat(item.principalPayment)
            totalCapital += parseFloat(item.capitalPayment)
            totalInterest += parseFloat(item.interestPayment)
        })
        setLoanValues({
            totalPayment:parseFloat(totalPayment),
            totalCapital:parseFloat(totalCapital),
            totalInterest:parseFloat(totalInterest)
        })
    }



    const nameV = (value) => {   //! this was created to se if i can make the select go back to the default but i could   try fix it 
        if(value === null || value === undefined){
            setDefault("seleccionar cuota/s");
        }
        payments?.filter(p => p.isPaid == false && p._id == value).map((p, idx) => {
        setDefault(`${p?._id}| ${p?.paymentDate} |${numberWithCommas( p?.principalPayment.toFixed(2))}`);
        });
    }


    const handleSelect =()=>{
        return <div>
                <select className="form-control" value={Default.cuota} onChange={(e) => { changeHandler(e);calculation(e.target.value); nameV(selected)}} name="_id" >
                    <option value={Default.cuota}>seleccionar cuota/s</option>
                        {payments?.filter((p) => p.isPaid == false).map((p, idx) => {
                            return (<option value={p._id} key={idx} >{`${p?._id}| ${p?.paymentDate} |${numberWithCommas( p?.principalPayment.toFixed(2))}`}
                    </option>);})}
                </select>
                {
                selected == undefined || selected == null || selected=="seleccionar cuota/s"? null:
                        loanValues === undefined || loanValues === null || loanValues == "{}"?
                        null:
                        <table>
                            <tr>
                                <th>Total:{loanValues?.totalPayment === null ||loanValues?.totalPayment === undefined?null: numberWithCommas(loanValues?.totalPayment.toFixed(2))}</th>
                                <th>capital:{loanValues?.totalCapital === null ||loanValues?.totalCapital === undefined?null: numberWithCommas(loanValues?.totalCapital.toFixed(2))}</th>
                                <th>interés:{loanValues?.totalInterest === null ||loanValues?.totalInterest === undefined? null: numberWithCommas(loanValues?.totalInterest.toFixed(2))}</th>
                                <th>mora : 0.00 by default change it later</th>
                            </tr>
                        </table>
                }

                {
                       selected == undefined || selected == null || selected=="seleccionar cuota/s"? null:
                       loanValues === undefined || loanValues === null || loanValues == "{}"?
                       null:
                        <button className="btn btn-success mt-3" >pagar</button>
                }

             {/* 2<select className="form-control" onChange={e=>{changeHandler(e); calculation(e.target.value)}} name="_id"  >
        <option value={Default.cuota} selected>seleccionar cuota/s</option>
        {
            payments?.filter(p=> p.isPaid == false).map((p,idx)=>{
                return(
                    <option value={p._id} key={idx}>{`${p?._id}| ${p?.paymentDate} |${numberWithCommas(p?.principalPayment.toFixed(2))}`}</option>
                )
            })
        }
    </select> */}

    </div>
    }


    //! pass payments an other info as a prop and change some stuff in the other side undone payment by the way
    return(
        
        <div>
            <div>
                <Link to="/Dashboard" className="btn btn-primary" >todos los prestamos</Link>
                <Link to="/Prestamos" className="btn btn-primary" >todos los prestamos</Link>
                <UndoPayment id={id} payments={payments} />

            </div>
            <h1>comprobante fiscal
                     and input   represents the number  

                        and bellow a select with consumidor final 
                        and factura valida para crédito fiscal 
                        the value is the number 


            </h1>
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
                {/* <div className="d-flex  justify-content-between align-middle " style={{width:"400px",border:"solid 1px black"}}>
                <h5>total a pagar: {loan?.total? numberWithCommas(loan.total.toFixed(2)):null}</h5>
                <h5>total capital: {loan?.totalCapital? numberWithCommas(loan.totalCapital.toFixed(2)):null}</h5>
                </div> */}
                    <form onSubmit={e=>submitHandler(e,selected)}>
                        
                    {/* the select goes here   */}
                    {handleSelect()}
                    {
                        error == undefined || error == null?<p className="text-danger">{error?.err}</p>:
                        selected !== null || selected !== undefined? null :
                        <p className="text-danger">{error?.err}</p>
                    }
                    </form>
                    <div>
                <h1>todo</h1>
                <ul>
                    <li> add a late fee</li>
                    <li>make a function that adds a lateness fee 10 after five days of not paying  the standart is a 10% of the cuota but try to fine a way that that number can be change  </li>
                    <li>use moddals to aplay bonuse by getting the curent payment and rest the number inpute and the number can t be mor thant the couta</li>
                    <li>add a calculator that automatically add the sume of the total that need to be pay( if more than one cuota is selected )  and allows the user to to input a number and  and return the amount of money that the user need to give back </li>
                    <li>fix the loan number or  loan id </li>
                    <li>make a history with al the payments that have been made </li>
                    <li>add a fully pay field  or a active field to the loans if it is tru then the loan does not show up </li>

                </ul>
                </div>
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


