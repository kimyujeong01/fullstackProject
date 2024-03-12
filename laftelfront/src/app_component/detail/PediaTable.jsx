import React, {useEffect, useState} from "react";
import { Table } from "react-bootstrap";

import { TbThumbUp } from "react-icons/tb";
import ContentModal from "./ContentModal";
import axios from "axios";
import {useLocation} from "react-router-dom";
import Star from "./Star";


function PediaTable({row, onButtonClick}) {

    const location = useLocation();
    const itemId = location.state?.item;
    const [content, setContent] = useState([]);
    const [penOnOff , setPenOnOff] = useState(false);


    const handleButtonClick = () => {
        // 버튼 클릭 시 실행될 로직을 작성합니다.
        console.log("버튼이 클릭되었습니다.");
    };

    const penButton = (e) => {
        setPenOnOff(true);
    }
    const handleContentClick = () => {
        onButtonClick(row);
    }

    const data = [
        { user_id: 1, content: "", great:"" , star_rating:""},
        {
            user_id: 2, content: "", great: <TbThumbUp/>, star_rating:""
        },
    ];
    useEffect(() => {
        window.scrollTo(0,0);
        let now = new Date();
        const itemId = "41846";

        axios.get(`/api/v1.0/items/${itemId}/detail/`)
            .then(res => {
                const {data} = res;
                setContent(data);

            })
            .catch(err => {
                console.log(err);
            });
    }, [itemId]);

    return (
        <div style={{width: "150px", height: "100px", marginLeft: "-20px"}}>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>아이디</th>
                    <th>내용</th>
                    <th>좋아요</th>
                    <th>별점</th>
                </tr>
                </thead>
                <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        <td>{row.user_id}</td>
                        <td>
                            <ContentModal show={penOnOff} onHide={() => setPenOnOff(false)} name={content.name}/>
                            <a onClick={penButton}>
                                <img src="/image/pen.png" alt="코멘트"
                                     style={{width: '60px', height: 'auto', marginRight: '10px'}}/>
                            </a>
                        </td>
                        <button onClick={handleButtonClick}>
                            <TbThumbUp/>
                        </button>

                        <td><Star/>{row.star_rating}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default PediaTable;
