import React from "react";
import Login from "./Login";
import SideImageAnimation from "../../test/SideImageAnimation";
import style from "../../css/Login.module.css";

function LoginMain(props) {
    return (
        <div className={style.loginMainContainer}> {/* 컨테이너 div */}
          <div className={style.backgroundComponent}>
            <SideImageAnimation imageSrc={"https://laftel.net/assets/auth/BG_0.png"}/> {/* 배경 컴포넌트 */}
              <SideImageAnimation imageSrc={"https://laftel.net/assets/auth/BG_1.png"}/> {/* 배경 컴포넌트 */}
              <SideImageAnimation imageSrc={"https://laftel.net/assets/auth/BG_2.png"}/> {/* 배경 컴포넌트 */}
              <SideImageAnimation imageSrc={"https://laftel.net/assets/auth/BG_3.png"}/> {/* 배경 컴포넌트 */}
              <SideImageAnimation imageSrc={"https://laftel.net/assets/auth/BG_4.png"}/> {/* 배경 컴포넌트 */}
          </div>
          <div className={style.loginComponent}>
            <Login/> {/* 로그인 컴포넌트 */}
          </div>
        </div>
    );
}

export default LoginMain;