import { styled } from "styled-components";
import { IData } from "../Map";

const DetailWrap = styled.div`
  width: 100%;
  height: auto;
  padding: 30px;
  position: absolute;
  bottom: 70px;
  background: var(--W_00, #fff);
  border-radius: 20px 20px 0px 0px;
  .waterDetail {
    width: 100%;
    border-radius: 12px;
    background: rgba(239, 74, 173, 0.1);
    color: var(--P_00, #ef4aad);
    font: 400 14px "Pretendard";
    padding: 6px 4px;
    margin-top: 20px;
    word-break: keep-all;
    display: flex;
    justify-content: space-around;
    align-items: center;
    span {
      width: 20px;
      height: 20px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
  svg {
    float: inline-start;
    margin-top: 4px;
  }
  .titleWrap {
    margin-left: 12px;
    display: inline-block;
    h3 {
      color: var(--G_00, #000);
      font-family: "Giants";
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 4px;
      display: inline-block;
    }
    .subTitle {
      color: var(--main, #056fe7);
      font-family: "Pretendard";
      font-size: 14px;
      font-weight: 400;
      margin-bottom: 18px;
    }
  }
  .detailList {
    border-radius: 12px;
    border: 1px solid var(--G_03, #d9d9d9);
    padding: 20px;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        color: var(--G_02, #8b8b92);
        font: 400 16px/24px "Pretendard";
      }
    }
  }
  .btnWrap {
    width: 100%;
    display: flex;
    justify-content: end;
    margin-top: 20px;
    font: 600 18px/24px "Pretendard";
    button {
      display: inline-flex;
      padding: 13px 34px;
      border-radius: 8px;
      border: 0;
      background-color: transparent;
    }
    :nth-child(2) {
      background: var(--main, #056fe7);
      color: var(--W_00, #fff);
    }
  }
`;

interface IMapDetail {
  dataArr: IData[];
  listName: string;
  setShowDetail: any;
}

const MapDetail = ({ dataArr, listName, setShowDetail }: IMapDetail) => {
  return (
    <DetailWrap>
      {dataArr.map((data) => {
        if (data.name === listName) {
          return (
            <div key={data.name}>
              <svg
                onClick={() => setShowDetail(false)}
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="20"
                viewBox="0 0 11 20"
                fill="none"
              >
                <path
                  d="M10 19L1 10L10 0.999999"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="titleWrap">
                <h3>{data.name}</h3>
                <p className="subTitle">{data.address}</p>
              </div>
              {data.detail && data.type === "민방위대피소" ? (
                <ul className="detailList">
                  <li>
                    <span>시설</span>
                    <p>{data.detail["place"]}</p>
                  </li>
                  <li>
                    <span>규모</span>
                    <p>{data.detail["size"]}</p>
                  </li>
                  <li>
                    <span>최대 수용인원</span>
                    <p>{data.detail["people"]}</p>
                  </li>
                  <li>
                    <span>전화번호</span>
                    <p>{data.detail["phone"]}</p>
                  </li>
                </ul>
              ) : data.detail && data.type === "급수시설" ? (
                <ul className="detailList">
                  <li>
                    <span>시설</span>
                    <p>{data.detail["place"]}</p>
                  </li>
                  <li>
                    <span>규모</span>
                    <p>{data.detail["size"]}</p>
                  </li>
                  <li>
                    <div className="waterDetail">
                      <span>
                        <img src="assets/icon/alert.png" alt="alert" />
                      </span>
                      <p>
                        호수, 분수대, 하천, 개울물로 식수 사용은
                        <br /> 감염의 위험이 있어 급수시설 이용을 추천드립니다.
                      </p>
                    </div>
                  </li>
                </ul>
              ) : data.detail && data.type === "병원" ? (
                <ul className="detailList">
                  <li>
                    <span>시설</span>
                    <p>{data.detail["place"]}</p>
                  </li>
                  <li>
                    <span>전화번호</span>
                    <p>{data.detail["phone"]}</p>
                  </li>
                </ul>
              ) : (
                <ul>정보 준비중입니다.</ul>
              )}

              <div className="btnWrap">
                <button>자세히보기</button>
                <button>공유하기</button>
              </div>
            </div>
          );
        }
      })}
    </DetailWrap>
  );
};

export default MapDetail;
