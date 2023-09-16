import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import NotFound from "./pages/NotFound";
import { styled } from "styled-components";
import Guide from "./pages/Guide/Guide";
import Map from "./pages/Map/Map";

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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/guide" element={<Guide />}></Route>
          <Route path="/map" element={<Map />}></Route>

          {/* 일치하는 라우터가 없는 경우 */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </AppWrap>
  );
}

export default App;
