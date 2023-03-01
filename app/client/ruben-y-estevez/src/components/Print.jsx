import {useState,useEffect} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import { Button,Modal } from 'react-bootstrap';
import OneLoan from './loans/OneLoan';

const Print = (props) => {
    const {id,payments} = props
    const navigate = useNavigate()
    // const [selected, setSelected] = useState();
    // const [error,setError] = useState({})
    // const [number,setNumber] = useState()
    // const [loan,setLoan] = useState({})
    const [show, setShow] = useState(false);


    // console.log("this is the id:",id,"\n this is payments",payments)


    const numberWithCommas=(x)=>{
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // const changeHandler=(e)=>{
    //     setSelected( e.target.value)
    // }

    // const submitHandler=(e,payment_id)=>{
    //     e.preventDefault()
    //     axios.put(`http://localhost:8000/api/Loan/update/status/undo/${id}/${payment_id}`)
    //     .then(res =>{
    //         console.log(res.data.results)
    //         if(payment_id == null || payment_id == undefined){
    //             setError({err:"debes de seleccionar una cuota "})
    //         }else{
    //             <OneLoan cancelPayment={alertUser} />
    //             setError()
    //             // setShow(false)
    //             axios.get(`http://localhost:8000/api/Loan/${id}`)
    //             .then(res =>{
    //             setLoan(res.data.results)
    //             console.log(res.data.results.payments)

    //     }).catch(err=>{ 
    //         console.log("error",err)
    //     })
    //             navigate(`/Prestamos/${id}`)
    //         }
    //     }).catch(err=>{ 
    //         console.log("error",err)
    //     })
    // }


    // const alertUser =()=>{
    //     // aria-label="Close"
    //      return(
    //         //<div className="alert alert-warning alert-dismissible fade show" role="alert">
    //     //         <strong>Holy guacamole!</strong> You should check in on some of those fields below.
    //     //         <button type="button" className="close" data-dismiss="alert" aria-label="Close">
    //     //         <span aria-hidden="true">&times;</span>
    //     //         </button>
    //     //     </div>    alert-dismissible fade show    role="alert"
    //         <div className="alert alert-warning " >
    //             <a href='#' className='close'data-dismiss="alert" >&times</a>
    //             <strong>cuota {selected}!</strong> a sido anulada
    //     </div>
    //     )
    // }

    return (
        <div>


        <Button className="btn btn-danger mt-3" onClick={() =>{ setShow(true);} }> 
        anular un cobro
        </Button>

    <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header  closeButton>
        <Modal.Title  > </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
        
        </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
        <Button variant="danger text-center" onClick={() => setShow(false)}>
            volver a pago de cuotas
        </Button>
        </Modal.Footer>
    </Modal> 
            </div>
    )
};
{/*onClick={submitHandler}> */}


export default Print;