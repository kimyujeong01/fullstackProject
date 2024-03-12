import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";

// 회원가입을 처리하는 Membership 컴포넌트
function Membership(props) {
    // 상태 변수들을 정의
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [check, setCheck] = useState(false);
    const genresList = props.genresList.toString();

    let userInfo = {id: "", pw: "", name: "", email: "", genres: ""};


    // 회원가입 폼을 제출할 때 호출되는 함수
    const handleSignupSubmit = (e) => {
        if (username === "" || password === "" || name === "" || check === true) {
            if (username === "") {
                alert("아이디를 입력하세요");
            }
            if (password === "") {
                alert("비밀번호를 입력하세요");
            }
            if (name === "") {
                alert("이름을 입력하세요");
            }
            if (check === true) {
                alert("사용중인 아이디가 있습니다.");
            }

        } else {
            userInfo = {id: username, pw: password, name: name, email: email, genres: genresList}

            axios.post('/user/insert', userInfo)
                .then(res => {
                    if (res.data.result === "success") {
                        console.log(res.data);
                        window.location.reload(false);
                    } else {
                        alert("회원가입에 실패했습니다. 문의 해주세요");
                    }

                })
                .catch(err => {
                    console.log(err);
                })
        }

        // e.preventDefault();
    };

    const idCheck = (e) => {
        if (e.key === 'Tab') {
            axios.get('/user/check', {params: {id: username}})
                .then(res => {
                    console.log(res.data.result);

                    if (res.data.result === 1) {
                        setCheck(true);
                    } else {
                        setCheck(false);
                    }

                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const idOnChange = (e) => {
        setUsername(e.target.value);
    }


    return (
        <Modal show={props.show} onHide={props.onHide} aria-labelledby="contained-modal-title-vcenter" centered
               style={{backgroundColor: "rgba(0, 0, 0, 1)"}}>
            <Modal.Body>
                <div>
                    <h1>회원가입</h1>
                    <span>(탭으로 이동하세요)</span>
                </div>

                <form className={"mt-3"}>

                    <div className="member_signup_input" style={{paddingLeft: "100px", paddingRight: "100px"}}>
                        <input type="text" name="name" className="form-control rounded-pill" placeholder="이름"
                               value={name}
                               onChange={(e) => setName(e.target.value)} style={{
                            padding: "10px",
                            borderRadius: "35px",
                            border: "none",
                            backgroundColor: "#ffffff",
                            outline: "auto", // 포커스 효과 제거
                        }}
                        />
                    </div>

                    <div className="member_signup_input" style={{paddingLeft: "100px", paddingRight: "100px"}}>
                        <input type="text" className="form-control rounded-pill" name="username" placeholder="아이디"
                               value={username}
                               onKeyDown={idCheck}
                               onChange={idOnChange} style={{
                            marginTop: '10px',
                            padding: "10px",
                            borderRadius: "35px",
                            border: "none",
                            backgroundColor: "#ffffff",
                            outline: "auto", // 포커스 효과 제거
                        }}
                        />
                    </div>
                    <span className={check ? "" : "visually-hidden"}
                          style={{paddingLeft: "100px", paddingRight: "100px", color: "red"}}>사용중인 아이디입니다.</span>

                    <div className="member_signup_input" style={{paddingLeft: "100px", paddingRight: "100px"}}>
                        <input type="password" className="form-control rounded-pill" name="password" placeholder="비밀번호"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               style={{
                                   marginTop: '10px',
                                   padding: "10px",
                                   borderRadius: "35px",
                                   border: "none",
                                   backgroundColor: "#ffffff",
                                   outline: "auto"
                               }}
                        />
                    </div>

                    <div className="member_signup_input" style={{paddingLeft: "100px", paddingRight: "100px"}}>
                        <input type="email" name="email" className="form-control rounded-pill" placeholder="이메일"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               style={{
                                   marginTop: '10px',
                                   padding: "10px",
                                   borderRadius: "35px",
                                   border: "none",
                                   backgroundColor: "#ffffff",
                                   outline: "auto", // 포커스 효과 제거
                               }}
                        />
                    </div>

                    <div className={"d-flex justify-content-end mt-3"}>
                        <Button className={"btn btn-success me-2"} type={"button"} onClick={handleSignupSubmit}>회원가입</Button>
                        <Button className={'btn btn-danger'} onClick={props.onHide}>취소</Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );

};

export default Membership;