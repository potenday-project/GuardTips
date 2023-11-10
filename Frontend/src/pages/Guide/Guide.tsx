import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { Router, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import DisasterResponse from "./components/DisasterResponse";
import FirstAid from "./components/FirstAid";
import GHB from "./components/GHB";
import Header from "../../components/Header";

const GuideWrap = styled.section`
  width: 100%;
`;

const ContentsWrap = styled.div`
  padding: 0 30px;
`;

interface IBanner {
  name: string;
}
const BannerWrap = styled.div<IBanner>`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: end;
  .background {
    width: 90%;
    height: 200px;
    border-radius: 40px 0px 40px 40px;
    background: ${(props) =>
      props.name === "재난대처"
        ? `url('${process.env.PUBLIC_URL}/assets/icon/disaster_bg.png') no-repeat`
        : props.name === "응급처치"
        ? `url('${process.env.PUBLIC_URL}/assets/icon/firstaid_bg.png') no-repeat`
        : props.name === "생존배낭"
        ? `url('${process.env.PUBLIC_URL}/assets/icon/ghb_bg.png') no-repeat`
        : null};
    background-size: contain;
    .imgWrap {
      width: 145px;
      position: absolute;
      right: 50px;
      bottom: -30px;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
  }
`;

const TabWrap = styled.ul`
  margin-top: 70px;
  color: var(--G_03, #d9d9d9);
  font-family: "Giants";
  font-size: 22px;
  font-weight: 700;
  width: 300px;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 90px;
  z-index: 1;
  .active {
    border-bottom: solid 2px #056fe7;
    color: #056fe7;
    font-weight: 700;
  }
`;

const Guide = () => {
  const location = useLocation();
  const enterName = location.state;
  const [name, setName] = useState(enterName);

  const [isAnd, setIsAnd] = useState("");

  const data = ["재난대처", "응급처치", "생존배낭"];

  // useEffect(() => {
  //   let stored = localStorage.getItem("tabs");
  //   if (!stored) return;
  //   setName(stored);
  // }, [enterName]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [name]);

  const onClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const {
      currentTarget: { textContent },
    } = e;
    setName(textContent);
    // localStorage.setItem("tabs", innerText);
  };

  // 안드로이드 구분?
  useEffect(() => {
    // userAgent에 ios // android 가 있는 지 확인해줍니다.
    const iOS = navigator.userAgent.match(/iOS_App/i);
    const Android = navigator.userAgent.match(/Android_App/i);
    if (Android) setIsAnd("Android_App");
  }, []);

  return (
    <GuideWrap>
      <Header title="가이드" />
      <BannerWrap name={name}>
        <div className="background">
          <div className="imgWrap">
            {name === "재난대처" ? (
              <img src="assets/siren.png" alt="" />
            ) : name === "응급처치" ? (
              <img src="assets/firstaid.png" alt="" />
            ) : name === "생존배낭" ? (
              <img src="assets/bag.png" alt="" />
            ) : null}
          </div>
        </div>
      </BannerWrap>
      <ContentsWrap>
        <TabWrap>
          {data.map((x) => {
            return (
              <li
                key={x}
                onClick={onClick}
                className={x === name ? "active" : undefined}
              >
                {x}
              </li>
            );
          })}
        </TabWrap>
        {name === "생존배낭" ? (
          <GHB />
        ) : name === "응급처치" ? (
          <FirstAid />
        ) : (
          <DisasterResponse />
        )}
      </ContentsWrap>
    </GuideWrap>
  );
};

export default Guide;
