import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import StarRating from "../../../component/detail/StarRating";
import axios from "axios";


function CommentUpdate(props) {
   const itemId = props.itemId;
   const userId = props.userId;
   const [star, setStar] = useState('');
   const [contents , setContents] = useState("");
   let reviewInfo = {userId:userId,aniIdx: itemId,star:0,content:""};


   const getStarRating = (num) => {
      setStar(num);
   };

   const handleSignupSubmit = (e) => {
      console.log(userId);
      console.log(itemId);
      e.preventDefault();
      reviewInfo = {userId:userId,aniIdx: itemId,star: star,content: contents};
      axios.post('/aniDetail/reviewInsert',reviewInfo)
         .then(res => {
            console.log(res.data.result);
         })
         .catch(err => {
            console.log(err);
         })
      window.location.reload();
   }

   return (
      <Modal show={props.show} onHide={props.onHide}>
         <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <h5>별점</h5>
            <StarRating itemId={itemId} userId={userId} getStarRating={getStarRating}/>
            <hr/>
            <Form onSubmit={handleSignupSubmit}>
               <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
               >
                  <Form.Label>코멘트</Form.Label>
                  <Form.Control as="textarea" rows={10} onChange={(e) => setContents(e.target.value)}/>
               </Form.Group>

               <div className={"d-flex justify-content-between"}>
                  <Button variant="secondary" type={"reset"} onClick={props.onHide}>닫기</Button>
                  <Button variant="primary" type={"submit"} onClick={props.onHide}>저장</Button>
               </div>

            </Form>
         </Modal.Body>
      </Modal>
   );
}

export default CommentUpdate;