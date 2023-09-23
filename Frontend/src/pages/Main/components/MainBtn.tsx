import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const MainBtnWrap = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  li {
    position: relative;
    margin-bottom: 12px;
    height: 143px;
    word-break: keep-all;
    border-radius: 40px;
    padding: 30px;
    h2 {
      color: var(--W_00, #fff);
      font: 700 28px "Giants";
    }
  }
  li:nth-child(1) {
    width: 100%;
    height: 176px;
    display: flex;
    align-items: end;
  }
  li:nth-child(2),
  li:nth-child(3) {
    height: 290px;
    width: 48.3%;
  }
  li:nth-child(4) {
    width: 100%;
    display: flex;
    align-items: end;
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
  .carModalWrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 430px;
    height: 932px;
    z-index: 99;
    display: flex;
    justify-content: center;
    .bg {
      background: rgba(52, 52, 52, 0.6);
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    .modal {
      position: absolute;
      width: 380px;
      height: 213px;
      padding: 30px;
      margin-top: 150px;
      border-radius: 12px;
      background: var(--W_00, #fff);
      z-index: 100;
    }
    input {
      border-radius: 8px;
      border: 1px solid var(--G_03, #d9d9d9);
    }
    .btnWrap {
      display: flex;
      justify-content: end;
      font: 600 18px/24px "Pretendard";
      button {
        display: inline-flex;
        padding: 13px 34px;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        border: 0;
      }
      :nth-child(2) {
        background: var(--main, #056fe7);
        margin-left: 14px;
        color: var(--W_00, #fff);
      }
    }
    h3 {
      color: #050505;
      letter-spacing: -0.44px;
      text-transform: uppercase;
      font: 700 22px "Giants";
      margin-bottom: 14px;
    }
    input {
      display: flex;
      width: 310px;
      padding: 13px 105px 13px 15px;
      align-items: center;
      gap: 8px;
      margin-bottom: 14px;
    }
    .notice {
      display: flex;
      width: 370px;
      height: 73px;
      margin-top: 400px;
      padding: 28px 61px;
      justify-content: center;
      align-items: center;
      border-radius: 20px;
      background: var(--W_00, #fff);
      z-index: 2;
      box-shadow: 0px 16px 16px 0px rgba(137, 137, 152, 0.1);
    }
  }
`;

const ImgWrap = styled.div`
  position: absolute;
  right: 10px;
  width: 168px;
  height: 168px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const TextWrap = styled.div``;

interface IMainBtn {
  mainData: { [key: string]: string }[];
  name: string;
}

const MainBtn = ({ mainData, name }: IMainBtn) => {
  const [carModal, setCarModal] = useState(false);
  const navigate = useNavigate();
  const onClick = (x: string) => {
    if (x.includes("출동차량")) {
      setCarModal(true);
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
              <ImgWrap>
                <img src={x.img} alt="" />
              </ImgWrap>
            </li>
          );
        })}
        {carModal ? (
          <div className="carModalWrap">
            <div
              className="bg"
              onClick={() => {
                setCarModal(false);
              }}
            ></div>
            <div className="modal">
              <h3>출동차량 위치 확인</h3>
              <input type="text" placeholder="신고자분 전화번호 입력" />
              <div className="btnWrap">
                <button
                  onClick={() => {
                    setCarModal(false);
                  }}
                >
                  취소
                </button>
                <button>검색</button>
              </div>
            </div>
            <div className="notice">서비스 준비중입니다!</div>
          </div>
        ) : null}
      </MainBtnWrap>
    </>
  );
};

export default MainBtn;
