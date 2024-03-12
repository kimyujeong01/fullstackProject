import React, {useEffect, useState} from "react";
import {Nav} from "react-bootstrap";
import TabContent from "./TabContent";
import {useLocation} from "react-router-dom";
import Header2 from "../layout/Header2";

function Other(props) {
   const [tab ,setTab] =useState(0);
   const location = useLocation();

   useEffect(() => {
      setTab(location.state.tabNum);
   }, []);


   return (
      <div>
         <Header2/>
         <div className={"m-5 py-4"}>
            <Nav variant="underline" defaultActiveKey={location.state.linkNum} className={"border-bottom"}>
               <Nav.Item>
                  <Nav.Link onClick={(e) => {
                     setTab(0)
                  }} eventKey="link0">팀원소개</Nav.Link>
               </Nav.Item>
               <Nav.Item>
                  <Nav.Link onClick={(e) => {
                     setTab(1)
                  }} eventKey="link1">이용약관</Nav.Link>
               </Nav.Item>
               <Nav.Item>
                  <Nav.Link onClick={(e) => {
                     setTab(2)
                  }} eventKey="link2">청소년보호정책</Nav.Link>
               </Nav.Item>
               <Nav.Item>
                  <Nav.Link onClick={(e) => {
                     setTab(3)
                  }} eventKey="link3">개인정보 처리방침</Nav.Link>
               </Nav.Item>
               <Nav.Item>
                  <Nav.Link onClick={(e) => {
                     setTab(4)
                  }} eventKey="link4">저작권 표기</Nav.Link>
               </Nav.Item>
            </Nav>
            <div className={"p-4"}>
               <TabContent tab={tab}/>
            </div>
         </div>
      </div>
   );
}

export default Other;