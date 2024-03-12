import React from "react";
import {Button, Modal} from "react-bootstrap";
import StarShape from "../../shape/StarShape";

function ComListModal(props) {
    const testResult = props.results;
    return (
        <Modal show={props.show} onHide={props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered
               style={{display: "block"}}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    코멘트
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{height: "50vh", overflowY: "auto"}}>
                <p>
                    {
                        testResult.map((item, index) => {
                            return (
                                <div className={"border-bottom p-2"}>
                                    <div>
                                        <div className={"d-flex justify-content-between"}>
                                            <div className={"mt-2"}>
                                                <img
                                                    src={item.profile?.image ? item.profile.image : 'https://image.laftel.net/profiles/default/68beb046-ac03-4f5a-868f-42cd4074037f.jpg'}
                                                    className="rounded-circle me-2" style={{width: "30px", height: "30px"}}
                                                    alt="..."/>
                                                <span className="card-title">{item.profile.name.replace(/\(.*\)/, '')}</span>
                                            </div>
                                            <div>
                                                <StarShape rating={item.score}></StarShape>
                                            </div>

                                        </div>
                                    </div>
                                    <p className={"mt-2"}>{item.content}</p>
                                </div>
                            )
                        })
                    }
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>닫기</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ComListModal;