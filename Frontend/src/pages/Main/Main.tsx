import { styled } from "styled-components";
import { useState } from "react";
import MainBtn from "./components/MainBtn";
import SideBtn from "./components/SideBtn";

const MainWrap = styled.div`
  padding: 20px;
`;

const TapMenuWrap = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;

const TapMenu = styled.div`
  width: 100px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  color: var(--G_03, #d9d9d9);
  font: 700 18px "Giants";
  .active {
    border-bottom: solid 2px #056fe7;
    color: #056fe7;
    font-weight: 700;
  }
`;

const Logo = styled.div`
  color: var(--G_03, #d9d9d9);
  font: 700 20px "Giants";
`;

const Main = () => {
  const [tap, setTap] = useState(true);

  const mapMain = [
    { name: "대피 시설", btn: "blue", img: "assets/exit.png" },
    { name: "출동차량 위치확인", btn: "pink", img: "assets/ambulance.png" },
    { name: "급수시설", btn: "green", img: "assets/water.png" },
    { name: "병원&약국", btn: "purple", img: "assets/pharmacy.png" },
  ];
  const mapSide = [
    { name: "생존배낭" },
    { name: "재난대처" },
    { name: "응급처치" },
  ];

  const guideMain = [
    { name: "재난대처", btn: "pink", img: "assets/siren.png" },
    { name: "생존배낭", btn: "blue", img: "assets/bag.png" },
    { name: "응급처치", btn: "purple", img: "assets/firstaid.png" },
  ];

  const guideSide = [
    { name: "대피 시설" },
    { name: "출동차량" },
    { name: "급수시설" },
    { name: "병원&약국" },
  ];

  return (
    <MainWrap>
      <TapMenuWrap>
        <TapMenu>
          <p
            className={tap ? "active" : undefined}
            onClick={() => {
              setTap(true);
            }}
          >
            지도
          </p>
          <p
            className={!tap ? "active" : undefined}
            onClick={() => {
              setTap(false);
            }}
          >
            가이드
          </p>
        </TapMenu>
        <Logo>GuardTips</Logo>
      </TapMenuWrap>

      {tap ? (
        <>
          <MainBtn mainData={mapMain} name="map" />
          <SideBtn sideData={mapSide} name="guide" />
        </>
      ) : (
        <>
          <MainBtn mainData={guideMain} name="guide" />
          <SideBtn sideData={guideSide} name="map" />
        </>
      )}
    </MainWrap>
  );
};

export default Main;
