import { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
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

const BannerWrap = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: end;
  .background {
    width: 90%;
    height: 200px;
    border-radius: 40px 0px 40px 40px;
    background: #e8008b
      radial-gradient(
        268.28% 100% at 50% 0%,
        rgba(255, 255, 255, 0.32) 0%,
        rgba(255, 255, 255, 0) 100%
      );
  }
`;

const TabWrap = styled.ul`
  margin-top: 90px;
  color: var(--G_03, #d9d9d9);
  font-family: "Giants";
  font-size: 22px;
  font-weight: 700;
  width: 300px;
  display: flex;
  justify-content: space-between;
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

  console.log(enterName);

  const data = ["재난대처", "응급처치", "생존배낭"];
  let history = useNavigate();
  const onClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const {
      currentTarget: { innerText },
    } = e;
    setName(innerText);
  };

  return (
    <GuideWrap>
      <Header title="가이드" />
      <BannerWrap>
        <div className="background"></div>
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
