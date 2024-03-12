import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import StarRating from "../detail/StarRating";
import {Button, Form, Modal} from "react-bootstrap";
import { FaStar } from 'react-icons/fa';
import StarShape from "../shape/StarShape";
function MyComment(props) {


    const [star, setStar] = useState('');


    const data = sessionStorage.getItem('userId');
    const username = JSON.parse(data);
    const userInfo = {userId: username};
    const [aniInfo, setAniInfo] = useState([]);
    const [editModalShow, setEditModalShow] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [content, setContent] = useState("");
    const [starrating, setStarRating] = useState("");

    const itemId = props.itemId;


    const [contents, setContents] = useState("");
    let reviewInfo = {userId: username, aniIdx: itemId, star: 0, content: ""};
    const getStarRating = (num) => {
        setStar(num);
    };

    useEffect(() => {
        axios
            .post("/mypage/review", userInfo)
            .then((res) => {
                console.log(res.data.result);
                setAniInfo(res.data.result);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
    }, [itemId]);

    useEffect(() => {
        const fetchAniTitles = async () => {
            const promises = aniInfo.map((item) => {
                return axios
                    .get(`/api/v1.0/items/${item.aniIdx}/detail/`)
                    .then((res) => {
                        return {...item, title: res.data.name};
                    })
                    .catch((err) => {
                        console.log(err);
                        return {
                            ...item,
                            title: "제목을 불러오지 못했습니다",
                        };
                    });
            });
            const result = await Promise.all(promises);
            setAniInfo(result);
        };
        if (aniInfo.length > 0) {
            fetchAniTitles();
        }
    }, [aniInfo]);




    const EditButton = (item) => {
        setSelectedItem(item);
        setEditModalShow(true);
    };

    const comDelete = (aniId) => {
        let deleteInfo = {userId: username, aniIdx: aniId};
        axios.post('/mypage/reviewDelete', deleteInfo)
            .then(res => {
                console.log(res.data.result);
            })
            .catch(err => {
                console.log(err);
            });

        window.location.reload();

    };



    const handleSignupSubmit = (e) => {

        reviewInfo = {userId: username, aniIdx: selectedItem.aniIdx, star:star, content: contents};
        console.log(reviewInfo);
        axios
            .post("/aniDetail/reviewInsert", reviewInfo)
            .then((res) => {
                console.log(res.data.result);
            })
            .catch((err) => {
                console.log(err);
            });

    };

    return (
        <div style={{overflowY: 'scroll', overflowX: 'hidden', height: '600px', scrollbarWidth: 'none'}}>
            {aniInfo.length > 0 ? (
                <table
                    style={{
                        margin: "10px",
                        width: "1000px",
                        height:'500px',
                        borderCollapse: "collapse",
                        borderBottom: "1px solid #ddd",
                    }}
                >
                    <thead>
                    <tr>
                        <th style={{borderBottom: "1px solid #ddd", padding: "8px"}}>제목</th>
                        <th style={{borderBottom: "1px solid #ddd", padding: "8px"}}>내용</th>
                        <th style={{borderBottom: "1px solid #ddd", padding: "8px"}}>별점</th>
                        <th style={{borderBottom: "1px solid #ddd", padding: "8px"}}>수정</th>
                        <th style={{borderBottom: "1px solid #ddd", padding: "8px"}}>삭제</th>
                    </tr>
                    </thead>
                    <tbody>
                    {aniInfo.map((item) => (
                        <tr key={item.aniIdx}>
                            <td
                                style={{
                                    borderBottom: "1px solid #ddd",
                                    padding: "8px",
                                    maxWidth: "50px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                <div style={{textAlign: "center", marginTop: "10px"}}>
                                    {item.title}
                                </div>
                            </td>

                            <td
                                style={{
                                    borderBottom: "1px solid #ddd",
                                    padding: "8px",
                                    maxWidth: "100px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                <div style={{textAlign: "center", marginTop: "10px"}}>
                                    {item.content}
                                </div>
                            </td>

                            {/*별점 출력*/}
                            <td style={{borderBottom: "1px solid #ddd", padding: "8px"}}>
                                <div style={{textAlign: "center", marginTop: "10px"}}>
                                    <StarShape rating={item.starRating}></StarShape>
                                </div>
                            </td>



                            <td
                                style={{
                                    borderBottom: "1px solid #ddd",
                                    padding: "8px",
                                }}
                                onClick={() => EditButton(item)}
                            >
                                <Button>수정</Button>
                            </td>

                            <td
                                style={{
                                    borderBottom: "1px solid #ddd",
                                    padding: "8px",
                                }}
                            >
                                <Button
                                    className={"btn btn-danger"}
                                    onClick={() => comDelete(item.aniIdx)}
                                >
                                    삭제
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <div style={{opacity: "0.4", textAlign: "center"}}>
                    <img
                        src={"/image/MyPageLogo.png"}
                        alt={""}
                        style={{width: '300px', height: '40vh'}}
                    />
                    <p>저장된 보고싶다가 없습니다.</p>
                </div>
            )}

            <Modal
                show={editModalShow}
                onHide={() => setEditModalShow(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit {selectedItem && selectedItem.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <h5>별점</h5>
                    <StarRating itemId={itemId} userId={username} getStarRating={getStarRating}/>
                    <hr/>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>코멘트</Form.Label>
                            <Form.Control as="textarea" rows={10} onChange={(e) => setContents(e.target.value)}/>
                        </Form.Group>

                        <div className={"d-flex justify-content-between"}>
                            <Button variant="secondary" type={"reset"} onClick={props.onHide}>닫기</Button>
                            <Button variant="primary" type={"button"} onClick={handleSignupSubmit}>저장</Button>
                        </div>

                    </Form>

                </Modal.Body>
            </Modal>



        </div>
    );
}

export default MyComment;