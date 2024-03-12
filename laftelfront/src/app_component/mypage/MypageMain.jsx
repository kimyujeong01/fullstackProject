import React, {useState} from "react";
import {Nav, Tab, Tabs} from "react-bootstrap";
import AppTabContent from "./AppTabContent";
import { RiInboxArchiveLine } from "react-icons/ri";

function MypageMain(props) {
   const [tab ,setTab] =useState(0);

   return (
      <div style={{width: "100%"}}>
         <div className={"m-4"}>
            <h1><RiInboxArchiveLine /> 보관함</h1>
            <Nav variant="underline" defaultActiveKey={"link0"} className={"border-bottom"}>
               <Nav.Item>
                  <Nav.Link onClick={(e) => {
                     setTab(0)
                  }} eventKey="link0">보고싶다</Nav.Link>
               </Nav.Item>
               <Nav.Item>
                  <Nav.Link onClick={(e) => {
                     setTab(1)
                  }} eventKey="link1">보는중</Nav.Link>
               </Nav.Item>
               <Nav.Item>
                  <Nav.Link onClick={(e) => {
                     setTab(2)
                  }} eventKey="link2">코멘트</Nav.Link>
               </Nav.Item>
            </Nav>
            <div>
               <AppTabContent tab={tab}/>
            </div>
         </div>
      </div>
   );
}

export default MypageMain;