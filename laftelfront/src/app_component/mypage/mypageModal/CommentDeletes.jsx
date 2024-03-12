import React, {useEffect} from "react";
import {Modal} from "react-bootstrap";
import axios from "axios";


function CommentDeletes(props) {
   const itemId = props.itemId;
   const userId = props.userId;

   const userInfo = {aniIdx: itemId,userId: userId};


    useEffect(() => {
        console.log(userId);
    }, [userId]);
   const comDelete = (e) => {
      axios.post('/mypage/reviewDelete', userInfo)
         .then(res => {
            console.log(res.data.result);
         })
         .catch(err => {
            console.log(err);
         });

      window.location.reload(false);
      props.onHide();
   }

   return (
      <Modal show={props.show} onHide={props.onHide} aria-labelledby="contained-modal-title-vcenter" centered
             style={{backgroundColor: "rgba(0, 0, 0, 1)"}}>
         <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <h1 className={"text-center"}>삭제하시겠습니까?</h1>
            <div className={"d-flex justify-content-center"}>
               <button className={"btn btn-success me-5"} onClick={comDelete}>Yes</button>
               <button className={"btn btn-danger"} onClick={props.onHide}>No</button>
            </div>

         </Modal.Body>
      </Modal>
   );
}

export default CommentDeletes;