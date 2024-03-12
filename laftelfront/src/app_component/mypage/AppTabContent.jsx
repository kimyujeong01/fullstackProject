import React from "react";
import Service from "../../component/other/Service";
import Youth from "../../component/other/Youth";
import AppView from "./AppView";
import AppWish from "./AppWish";
import AppComment from "./AppComment";

function AppTabContent(props) {
   if (props.tab === 0) {
      return <AppWish />
   }
   if (props.tab === 1) {
      return <AppView />
   }
   if (props.tab === 2) {
      return <AppComment />
   }
}

export default AppTabContent;