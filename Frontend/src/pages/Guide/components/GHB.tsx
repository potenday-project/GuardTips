import { styled } from "styled-components";

const GHBWrap = styled.div`
  margin-top: 22px;
  /* height: 810px; */
  /* overflow-y: scroll; */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const GHBList = styled.div`
  height: 100%;
  margin-bottom: 100px;

  h3 {
    width: 100%;
    height: 74px;
    border-radius: 20px;
    margin: 10px 0;
    border: 1px solid var(--G_03, #d9d9d9);
    background: var(--W_00, #fff);
    letter-spacing: -0.4px;
    font: 600 20px "Pretendard";
    display: flex;
    align-items: center;
    padding: 20px;
    div {
      width: 32px;
      height: 32px;
      box-sizing: border-box;
      margin-right: 5px;
      img {
        width: 100%;
      }
    }
  }
  input[type="checkbox"] {
    display: none;
  }
  input[type="checkbox"] + label {
    cursor: pointer;
    padding-left: 30px;
    background-repeat: no-repeat;
    background-image: url("assets/icon/check.png");
    background-size: contain;
  }
  input[type="checkbox"]:checked + label {
    background-image: url("assets/icon/checked.png");
  }
  input[type="checkbox"]:disabled + label {
    background-image: url("assets/icon/check.png");
  }
`;
const CheckBoxWrap = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

const CheckBoxInput = styled.input`
  width: 30px;
  height: 30px;
  border-radius: 50px;
`;
const CheckBoxLabel = styled.label`
  height: 23px;
  color: var(--G_00, #000);
  font: 400 16px "Pretendard";
  line-height: 150.023%; /* 24.004px */
  letter-spacing: -0.4px;
`;

const GHB = () => {
  const mockData = {
    food: [
      "칼로리 높은 초코바&초코과자",
      "사탕",
      "동결건조 식량",
      "참치캔",
      "생수 2~3병",
    ],
    temp: [
      "바람막이 재킷",
      "모자",
      "마스크",
      "핫팩이나 손난로",
      "장갑",
      "양말",
      "미니담요",
    ],
    sos: ["호루라기", "손전등", "신호용 작은 거울", "야광봉"],
    tel: ["라디오 (건전지)", "통신거리 5km 이하 생활무전기 (충전기)"],
    medi: [
      "응급처치용품(밴드, 소독제, 반창고, 면봉 등)",
      "감기약, 해열진통제",
      "소화제",
    ],
    etc: [
      "나침반",
      "덕트테이프",
      "긴줄",
      "손목시계",
      "접이나이프",
      "낚시기구",
      "휴지",
      "신분증,여권",
      "1회용 나이프",
      "현금",
      "방수천",
    ],
  };
  return (
    <GHBWrap>
      <GHBList>
        <ul>
          <h3>
            <div>
              <img src="assets/icon/icon_food.svg" alt="" />
            </div>
            비상식량
          </h3>
          {mockData.food.map((x) => {
            return (
              <CheckBoxWrap key={x}>
                <CheckBoxInput type="checkbox" id={x} />
                <CheckBoxLabel htmlFor={x}>{x}</CheckBoxLabel>
              </CheckBoxWrap>
            );
          })}
        </ul>
        <ul>
          <h3>
            <div>
              <img src="assets/icon/icon_cloth.svg" alt="" />
            </div>
            체온유지 용품
          </h3>
          {mockData.temp.map((x) => {
            return (
              <CheckBoxWrap key={x}>
                <CheckBoxInput type="checkbox" id={x} />
                <CheckBoxLabel htmlFor={x}>{x}</CheckBoxLabel>
              </CheckBoxWrap>
            );
          })}
        </ul>
        <ul>
          <h3>
            <div>
              <img src="assets/icon/icon_megaphone.svg" alt="" />
            </div>
            구조용품
          </h3>
          {mockData.sos.map((x) => {
            return (
              <CheckBoxWrap key={x}>
                <CheckBoxInput type="checkbox" id={x} />
                <CheckBoxLabel htmlFor={x}>{x}</CheckBoxLabel>
              </CheckBoxWrap>
            );
          })}
        </ul>
        <ul>
          <h3>
            <div>
              <img src="assets/icon/icon_radio.svg" alt="" />
            </div>
            통신기
          </h3>
          {mockData.tel.map((x) => {
            return (
              <CheckBoxWrap key={x}>
                <CheckBoxInput type="checkbox" id={x} />
                <CheckBoxLabel htmlFor={x}>{x}</CheckBoxLabel>
              </CheckBoxWrap>
            );
          })}
        </ul>
        <ul>
          <h3>
            <div>
              <img src="assets/icon/icon_medicine.svg" alt="" />
            </div>
            구급약
          </h3>
          {mockData.medi.map((x) => {
            return (
              <CheckBoxWrap key={x}>
                <CheckBoxInput type="checkbox" id={x} />
                <CheckBoxLabel htmlFor={x}>{x}</CheckBoxLabel>
              </CheckBoxWrap>
            );
          })}
        </ul>
        <ul>
          <h3>
            <div>
              <img src="assets/icon/icon_alert.svg" alt="" />
            </div>
            기타
          </h3>
          {mockData.etc.map((x) => {
            return (
              <CheckBoxWrap key={x}>
                <CheckBoxInput type="checkbox" id={x} />
                <CheckBoxLabel htmlFor={x}>{x}</CheckBoxLabel>
              </CheckBoxWrap>
            );
          })}
        </ul>
      </GHBList>
    </GHBWrap>
  );
};

export default GHB;
