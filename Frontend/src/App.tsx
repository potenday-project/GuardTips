import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavermapsProvider } from "react-naver-maps";
import Main from "./pages/Main/Main";
import NotFound from "./pages/NotFound";
import { styled } from "styled-components";
import Guide from "./pages/Guide/Guide";
import Map from "./pages/Map/Map";
import { Suspense, useEffect } from "react";
import DisasterDetail from "./pages/Guide/DisasterDetail";
import FirstaidDetail from "./pages/Guide/FirstaidDetail";

const AppWrap = styled.section`
  max-width: 430px;
  /* height: 100vh; */
  height: 932px;
  margin: 0 auto;
  border: solid 1px;
  overflow-x: hidden;
  overflow-y: scroll;
  /* 스크롤 안보이기 */
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  ::-webkit-scrollbar {
    display: none;
  }
  background: linear-gradient(180deg, #fcfcfc 0%, #e9e9f4 100%) fixed;
  box-sizing: border-box;
`;

function App() {
  return (
    <AppWrap>
      <NavermapsProvider ncpClientId={`${process.env.REACT_APP_NAVER_ID}`}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/guide" element={<Guide />}></Route>
            <Route
              path="/guide/firstaid/:id"
              element={<FirstaidDetail />}
            ></Route>
            <Route
              path="/guide/disaster/:id"
              element={<DisasterDetail />}
            ></Route>
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
