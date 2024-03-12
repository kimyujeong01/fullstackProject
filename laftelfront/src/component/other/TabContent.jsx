import React from "react";
import Service from "./Service";
import Copyrights from "./Copyrights";
import Youth from "./Youth";
import Privacy from "./Privacy";

function TabContent(props) {
   if (props.tab === 0) {
      return (
         <div className={"fs-1"}>
            <ul>
               <li>팀장 : 윤성훈</li>
               <li>
                  팀원 :
                  <ul>
                     <li>김유정</li>
                     <li>박수연</li>
                     <li>나찬해</li>
                     <li>장석훈</li>
                  </ul>
               </li>
            </ul>
         </div>
      )
   }
   if (props.tab === 1) {
      return <Service />
   }
   if (props.tab === 2) {
      return <Youth />
   }
   if (props.tab === 3) {
      return <Privacy />
   }
   if (props.tab === 4) {
      return <Copyrights />
   }
}

export default TabContent;