import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Membership from "../../component/Login/Membership";

function MgenreSelect(props) {
  const [member, setMember] = useState(false);
  const list = [
    "BL", "공포", "무협", "스릴러", "아이돌",
    "음악", "추리", "하렘", "GL 백합", "드라마",
    "미스터리", "스포츠", "악역영애", "이세계", "치유",
    "SF", "로맨스", "범죄", "시대물", "액션",
    "일상", "특촬", "개그", "모험", "성인",
    "아동", "음식", "재난", "판타지"
  ];
  const [genres, setGenres] = useState([]); //장르 추가시 추가됨.

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setMember(true);
  };

const checkLabel= () => {
    'display = '
  }

  const handleyearsChange = (selectedYear, isChecked) => {
    setGenres(prevState => {
      if (isChecked && prevState.length >= 5) {
        return prevState;
      }
      if (isChecked) {
        return [...prevState, selectedYear];
      } else {
        return prevState.filter(genres => genres !== selectedYear);
      }
    });
  };

  return (
      <Modal
          show={props.show}
          onHide={props.onHide}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          style={{ backgroundColor: "rgba(0, 0, 0, 1)" }}
      >
        <Modal.Body>
          <h1>취향선택</h1>
          <p>최대 5개만 선택 가능</p>

          <Membership show={member} onHide={() => setMember(false)} genresList={genres}/>
          <form onSubmit={handleSignupSubmit} className={"ms-sm-6"}>
            <div className="row py-lg-4 flex-wrap justify-content-between">
              {list.map((label, index) => (
                  <div key={label} className="col-4 mb-3">
                    <Form.Check
                        type="checkbox"
                        id={`default-checkbox-${label}`}
                        label={label}
                        checked={genres.includes(label)}
                        onChange={(e) => handleyearsChange(label, e.target.checked)} // 이벤트 핸들러 올바르게 적용됨
                        className="custom-check-label"
                        style={{fontSize: "14px", marginBottom: "10px"}}
                    />
                  </div>
              ))}
            </div>
            <div className={"d-flex justify-content-end mt-3"}>
              <Button className={"btn btn-danger"} onClick={props.onHide}>
                취소
              </Button>
              <Button className={"btn btn-success ms-2"} type={"submit"}>
                다음
              </Button>

            </div>
          </form>
        </Modal.Body>
      </Modal>
  );
}

export default MgenreSelect;