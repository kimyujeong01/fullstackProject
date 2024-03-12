import React, {useState} from "react";

import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import GenreSelect from "./GenreSelect";
import MgenreSelect from "../../app_component/login/MgenreSelect";

function Login() {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [genre,setGenre] = useState("");

    const genreButton = (e) => {
        setGenre(true);
    }

    const handleIdChange = (event) => {
        setId(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    // const handleEmailChange = (event) => {
    //     setEmail(event.target.value);
    // };

    const handleSubmit = (e) => {
        const data = {id: id, pw: password}
        e.preventDefault();




        // 입력창에 공백이 포함되어 있는지 확인
        if (id.trim() === "" || password.trim() === "") {
            alert("아이디, 비밀번호를 입력하세요.");
            return;
        }

        axios.post("/user/login", data)
            .then(res => {


                const data = res.data;
                const id1  = data.id;


                if(data === 0){
                    alert("아이디 혹은 비밀번호를 체크해주세요");


                }else{

                    alert(`${data.id}님 반갑습니다.`);
                    navigate(`/`);


                    const userInfoJSON = JSON.stringify(data);
                    const userIdJSON = JSON.stringify(id1);
                    sessionStorage.setItem('userInfo', userInfoJSON);
                    sessionStorage.setItem("userId", userIdJSON);

                }

            })
            .catch(err => {
                console.log(err);
            });

        // 여기에 데이터베이스와의 연결 및 로그인 처리 로직을 추가하세요.

        // console.log("이메일:", email);
    };

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            {/* 배경을 위한 div */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'black',
                opacity: '0.5',
                zIndex: 1
            }}/>
            {/* 로그인 폼을 담고 있는 div */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",


            }}>
                <div style={{
                    border: "1px solid black",
                    padding: "20px",
                    borderRadius: "5px",
                    width: "400px",
                    height: "360px",
                    position: "relative",
                    backgroundColor: "white",
                    textAlign: "center",
                    margin: "0 auto",

                }}>

                    <Link to={'/'}>
                    <img className={""} src="/image/logo1.png" style={{width:'250px', height:'100px',objectFit:'cover'}}></img>
                    </Link>
                    <h5 style={{fontSize: "15px", fontWeight: "bold"}}>로그인</h5>



                    <GenreSelect show={genre} onHide={()=>setGenre(false)} />
                    {/*모바일 취향선택 모달*/}
                    <MgenreSelect show={genre} onHide={()=>setGenre(false)} />

                    <form onSubmit={handleSubmit} className="form">
                        <div>
                            <input className="login" type="text" name="username" placeholder="아이디" value={id} onChange={handleIdChange}
                                   style={{padding: "10px", borderRadius: "35px", border: "none", backgroundColor: "#ffffff", outline: "auto"}}/>
                        </div>
                        <div className={"mt-3"}>
                            <input className="login" type="password" name="pwd" placeholder="비밀번호" value={password} onChange={handlePasswordChange}
                                   style={{padding: "10px", borderRadius: "35px", border: "none", backgroundColor: "#ffffff", outline: "auto"}}/>
                        </div>

                        <div style={{textAlign: "center", marginTop: '30px'}}>
                            <button style={{
                                width: "90px",
                                marginRight: "15px",
                                backgroundColor: "#112c88",
                                color: "white",
                                borderRadius: "15px"
                            }} onClick={genreButton} type={"button"}>회원가입
                            </button>
                            <button type="submit" style={{
                                width: "90px",
                                marginLeft: "10px",
                                backgroundColor: "#112c88",
                                color: "white",
                                borderRadius: "15px"
                            }}>로그인
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;