import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

export const MainBtnWrap = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  li {
    margin-bottom: 12px;
    height: 143px;
    word-break: keep-all;
    border-radius: 40px;
    h2 {
      font-family: "Giants";
      font-size: 28px;
      font-weight: 700;
    }
  }
  li:nth-child(1) {
    width: 100%;
    height: 176px;
  }
  li:nth-child(2),
  li:nth-child(3) {
    height: 290px;
    width: 48.3%;
  }
  li:nth-child(4) {
    width: 100%;
  }

  p {
    color: var(--W_01, rgba(255, 255, 255, 0.4));
    font-family: "Giants";
    font-size: 20px;
    font-weight: 700;
  }
  a {
    display: contents;
  }
  .blue {
    box-shadow: 0px 30px 40px 0px rgba(1, 98, 236, 0.3);
    background: #056fe7
      radial-gradient(
        268.28% 100% at 50% 0%,
        rgba(255, 255, 255, 0.32) 0%,
        rgba(255, 255, 255, 0) 100%
      );
  }
  .pink {
    box-shadow: 0px 30px 40px 0px rgba(232, 0, 139, 0.3);
    background: #e8008b
      radial-gradient(
        268.28% 100% at 50% 0%,
        rgba(255, 255, 255, 0.32) 0%,
        rgba(255, 255, 255, 0) 100%
      );
  }
  .green {
    box-shadow: 0px 30px 40px 0px rgba(43, 165, 186, 0.3);
    background: #29aec5
      radial-gradient(
        268.28% 100% at 50% 0%,
        rgba(255, 255, 255, 0.32) 0%,
        rgba(255, 255, 255, 0) 100%
      );
  }
  .purple {
    box-shadow: 0px 30px 30px 0px rgba(180, 85, 224, 0.3);
    background: #7750e7
      radial-gradient(
        268.28% 100% at 50% 0%,
        rgba(255, 255, 255, 0.32) 0%,
        rgba(255, 255, 255, 0) 100%
      );
  }
`;

const TextWrap = styled.div``;

interface IMainBtn {
  mainData: { [key: string]: string }[];
  name: string;
}

const MainBtn = ({ mainData, name }: IMainBtn) => {
  const navigate = useNavigate();
  const onClick = (x: string) => {
    if (x.includes("출동차량")) {
      return;
    }
    navigate(`/${name}`, { state: x });
  };
  return (
    <>
      <MainBtnWrap>
        {mainData.map((x) => {
          return (
            <li key={x.name} onClick={() => onClick(x.name)} className={x.btn}>
              <TextWrap>
                <p>{name === "map" ? "지도" : "가이드"}</p>
                <h2>{x.name}</h2>
              </TextWrap>
            </li>
          );
        })}
      </MainBtnWrap>
    </>
  );
};

export default MainBtn;
