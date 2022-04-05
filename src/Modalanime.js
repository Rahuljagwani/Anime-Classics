import React, { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
function Modalanime(props) {
  const [hasError, setErrors] = useState(false);
  const [Info, setInfo] = useState({});

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://ghibliapi.herokuapp.com/films/" + encodeURIComponent(props.animeid));
      res
        .json()
        .then(res => setInfo(res))
        .catch(err => setErrors(err));
    }

    fetchData();
  }, [props.animeid]);

  return (
    <>
      <span>Has error: {JSON.stringify(hasError)}</span>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <b>{Info.title}</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-down-title">
            <h4 ><b>Original Title :  {Info.original_title}</b></h4>
            <h4 >({Info.original_title_romanised})</h4>
          </div>
          <br />
          <img src={Info.movie_banner} alt="movie-banner" className='modal-banner' />
          <br />
          <br />
          <div className="modal-down-title">
            <pre > <b> Director:</b>{Info.director}            <b> Producer:</b>{Info.producer}             <b>Rt score:</b>{Info.rt_score}</pre>

            <pre>  <b>Release Date:</b>{Info.release_date}                   <b>Running time:</b>{Info.running_time}</pre>
          </div>
          <br />
          <p className="modal-down-title">
            <b>Description-</b>{Info.description}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>);
}
export default Modalanime;