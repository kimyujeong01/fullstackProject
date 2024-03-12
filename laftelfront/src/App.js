import {BrowserRouter, Route, Routes} from "react-router-dom";

import ErrorPage from "./component/layout/ErrorPage";
import React from "react";
import Laftel from "./component/main/Laftel";
import MobileTodoApp from "./component/MobileTodoApp";

import { BrowserView, MobileView } from 'react-device-detect';


import AniDetail from "./component/detail/AniDetail";
import NewAniTotal from "./component/newani/NewAniTotal";
import Login from "./component/Login/LoginMain";
import NewAni from "./component/main/NewAni";
import Other from "./component/other/Other";
import KeywordMain from "./component/keyword/KeywordMain";
import Finder from "./component/finder/Finder";
import MLaftel from "./app_component/main/MLaftel";

import Similar from "./app_component/detail/Similar";

import EpList from "./app_component/detail/EpList";
import MSearch from "./app_component/search/MSearch";
import MOther from "./app_component/detail/MOther";
import MDay from "./app_component/detail/MDay";
import MypageMain from "./app_component/mypage/MypageMain";
import MyPage2 from "./component/MyPage/MyPage2";
import MFinder from "./app_component/finder/MFinder";



    function App() {

    return (
      <div className="App">
          <BrowserView>
              <BrowserRouter>
                  <Routes>
                      <Route path={'/'} element={<Laftel/>}>
                          <Route index element={<NewAni/>}/>

                          <Route path={'Detail'} element={<AniDetail/>}/>




                      </Route>
                      <Route path={'NewAniTotal'} element={<NewAniTotal/>}/>
                      <Route path={'LoginPage'} element={<MyPage2/>}/>
                      <Route path={'Finder'} element={<Finder/>}/>
                      <Route path={'search'} element={<KeywordMain/>} />
                      <Route path={'Login'} element={<Login/>}/>
                      <Route path={'*'} element={<ErrorPage/>}/>
                      <Route path={'Other'} element={<Other/>}/>
                  </Routes>
              </BrowserRouter>
          </BrowserView>
          <MobileView>
              <BrowserRouter>
                  <Routes>
                      <Route path={'/'} element={<MLaftel />}>   </Route>
                      <Route path={'*'} element={<ErrorPage />} />
                      <Route path={'m.'} element={<MobileTodoApp/>}></Route>
                      <Route path={'Detail'} element={<EpList/>}></Route>
                      <Route path={'similar'} element={<Similar/>}></Route>
                      <Route path={'search'} element={<MSearch/>}/>
                      <Route path={'login'} element={<Login/>}/>
                      <Route path={'M'} element={<MOther/>} />
                      <Route path={'day'} element={<MDay/>}/>
                      <Route path={'LoginPage'} element={<MypageMain/>}></Route>
                      <Route path={'Finder'} element={<MFinder/>}/>

                  </Routes>
              </BrowserRouter>
          </MobileView>

      </div>
  );
}

export default App;