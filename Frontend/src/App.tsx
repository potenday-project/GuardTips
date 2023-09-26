import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavermapsProvider } from "react-naver-maps";
import Main from "./pages/Main/Main";
import NotFound from "./pages/NotFound";
import { styled } from "styled-components";
import Guide from "./pages/Guide/Guide";
import Map from "./pages/Map/Map";
import { Suspense, useEffect } from "react";
import GuideDetail from "./pages/Guide/GuideDetail";
import axios from "axios";

const AppWrap = styled.section`
  max-width: 430px;
  height: 932px;
  margin: 0 auto;
  border: solid 1px;
  overflow: hidden;
`;

function App() {
  return (
    <AppWrap>
      <NavermapsProvider ncpClientId={`${process.env.REACT_APP_NAVER_ID}`}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/guide" element={<Guide />}></Route>
            <Route path="/guide/:id" element={<GuideDetail />}></Route>
            <Route
              path="/map"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Map />
                </Suspense>
              }
            ></Route>

            {/* 일치하는 라우터가 없는 경우 */}
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </NavermapsProvider>
    </AppWrap>
  );
}

export default App;
