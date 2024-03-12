import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {GoXCircle} from "react-icons/go";
import StarRating from "../../component/detail/StarRating";
import axios from "axios";

function ContentModal(props) {
    const [star, setStar] = useState('');
  const itemId = props.itemId;
    const data = sessionStorage.getItem('userId');
    const username = JSON.parse(data);
    let reviewInfo = {userId:username,aniIdx: itemId,star:0,content:""};


    //  작품에 대한 내 평가 남기는 박스
    const [text, setText] = useState("");
    const handleChange = (event) => {
        const {value} = event.target;
        setText(value);
    };

    const getStarRating = (num) => {
        setStar(num);
    };

    const handleCancel = () => {
        // 작성 중인 글을 초기화하거나 삭제하는 동작 수행
        setText(""); // setText 함수를 통해 작성 중인 글을 초기화할 수 있습니다.
    };

    const handleRegister = () => {
        reviewInfo = {userId:username,aniIdx: itemId,star: star,content: text};
        axios.post('/aniDetail/reviewInsert',reviewInfo)
            .then(res => {
                console.log(res.data.result);
            })
            .catch(err => {
                console.log(err);
            })
        window.location.reload(false);
    };
   return (
       <Modal show={props.show} onHide={props.onHide} style={{ height: "500px", width: "410px" }}>
         <Modal.Header closeButton>
            <Modal.Title>{props.name}</Modal.Title>
         </Modal.Header>
           <Modal.Body>
               <h5>별점</h5>
               <StarRating itemId={itemId} getStarRating={getStarRating} />
               <Form>
                   <Form.Label>코멘트</Form.Label>
                   <Form.Group
                       className="mb-3"
                       controlId="exampleForm.ControlTextarea1"
                   >

                    <textarea
                        placeholder="이 작품에 대한 내평가를 남겨보세요!"
                        value={text}
                        onChange={handleChange}
                        style={{
                            border: "3px solid #000",
                            borderRadius: "15px",
                            padding: "15px",
                            height: "200px",
                            width: "350px",
                            textAlign: "center", // 텍스트 정렬
                            marginBottom: "15px",
                            overflowY: "auto",
                            textSize: "25px",
                            // 아래의 스타일 추가
                            textAlignLast: "center", // placeholder 정렬
                        }} maxLength={300}
                    />
                       <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                           <Button style={{borderRadius: '10px', marginTop: '-15px', marginRight: '10px'}}
                                   onClick={handleCancel}>
                               내용취소
                           </Button>
                           <Button variant="primary" style={{borderRadius: '10px', marginTop: '-15px'}}
                                   onClick={handleRegister}>
                               저장
                           </Button>
                       </div>
                       {/*<Form.Control as="textarea" rows={10}/>*/}
                   </Form.Group>
               </Form>
           </Modal.Body>

           {/*<Modal.Footer>*/}
           {/*</Modal.Footer>*/}
       </Modal>

   );


}

export default ContentModal;