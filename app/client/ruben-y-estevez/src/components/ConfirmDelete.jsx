import {useState} from 'react';
import {Modal,Button} from "react-bootstrap"
import axios from 'axios';

const ConfirmDelete = (props) => {
    const {id} = props
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [deleted,setDeleted] = useState(false)

        const deleteHandler = (id)=>{
            axios.delete(`http://localhost:8000/api/People/delete/${id}`)
            .then(res =>{
                console.log(res)
                setDeleted(!deleted)
            }).catch(err=>console.log(err))
            handleClose()
        }

    return (
        <>
    <Button variant="danger" onClick={handleShow}>
        Borrar Cliente
    </Button>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
        <Button variant="success" onClick={handleClose}>
            cancelar
        </Button>
        <Button variant="danger" onClick={()=>deleteHandler(id)}>
            confirmar
        </Button>
        </Modal.Footer>
    </Modal>
        </>
    );
};



export default ConfirmDelete;