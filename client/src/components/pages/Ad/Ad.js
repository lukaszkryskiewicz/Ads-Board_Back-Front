import AdDetails from "../../features/AdDetails/AdDetails"
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAdById, removeAdRequest } from '../../../redux/adsRedux';
import { Button, Modal } from 'react-bootstrap';
import clsx from 'clsx';
import styles from './Ad.module.scss';
import { getUser } from "../../../redux/usersRedux";
import { useState } from "react";

const Ad = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const ad = useSelector(state => getAdById(state, id));
  const user = useSelector(getUser)
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false);
  const handleDelete = async () => {
    dispatch(removeAdRequest(id))
    navigate('/')
  }

  if (!ad) {
    return <div>Loading...</div>;
  }

  return (<div className={clsx('container', styles.root)}>
    <Modal show={show} onHide={handleClose} size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>Deleted item cannot be restored</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
    {user === ad.seller.login &&
      <div className={clsx(styles.buttons)}>
        <NavLink to={'/ad/edit/' + id}>
          <Button className='m-1' variant='dark'>
            Edit
          </Button>
        </NavLink>
        <Button className='m-1' variant='dark' onClick={() => setShow(true)}>
          Delete
        </Button>
      </div>}
    <AdDetails ad={ad} />
  </div>
  )
}

export default Ad;