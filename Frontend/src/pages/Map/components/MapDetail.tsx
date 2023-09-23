import { styled } from "styled-components";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  categoryNameAtom,
  dataArrAtom,
  listNameAtom,
  showDetailAtom,
} from "../../../recoil/atom";
import CopyClipBoard from "../../../components/CopyClipBoard";
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
    p {
      width: 88% !important;
      text-align: start !important;
    }
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
    width: 345px;
    margin-left: 12px;
    display: inline-block;
    h3 {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: var(--G_00, #000);
      font-family: "Giants";
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 4px;
      display: inline-block;
    }
    .subTitle {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: var(--main, #056fe7);
      font-family: "Pretendard";
      font-size: 14px;
      font-weight: 400;
      margin-bottom: 18px;
    }
  }
  .addressWrap {
    display: flex;
    justify-content: flex-start;
  }
  .detailList {
    border-radius: 12px;
    border: 1px solid var(--G_03, #d9d9d9);
    padding: 20px;
    li {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 3px;
      p {
        width: 80%;
        text-align: end;
        word-break: keep-all;
      }
      span {
        color: var(--G_02, #8b8b92);
        font: 400 16px/24px "Pretendard";
        word-break: keep-all;
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
  .badgeWrap {
    position: absolute;
    top: -25px;
    right: 30px;
    border-radius: 20px 20px 0px 0px;
    background: #aacaf0;
    display: inline-flex;
    padding: 2px 18px;
    justify-content: center;
    align-items: center;
    letter-spacing: -0.35px;
    font: 600 14px/150.023% "Pretendard";
  }
`;

interface IDetail {
  dataArr: IData | undefined;
  wholeData:
    | {
        [key: string]: string | number;
        tag: string;
        title: string;
        address: string;
      }[]
    | undefined;
}

const MapDetail = ({ dataArr, wholeData }: IDetail) => {
  const setShowDetail = useSetRecoilState(showDetailAtom);
  const listName = useRecoilValue(listNameAtom);
  const categoryName = useRecoilValue(categoryNameAtom);

  const render = () => {
    if (dataArr && categoryName === "급수시설") {
      for (let i = 0; i < dataArr.waterworks.length; i++) {
        if (dataArr.waterworks[i].title === listName) {
          let data = dataArr.waterworks[i];
          return (
            <div key={data.title}>
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
                <h3>{data.title}</h3>
                <p className="subTitle">
                  {data.address}
                  <CopyClipBoard text={data.address} />
                </p>
              </div>
              {data.tag === "급수시설" ? (
                <ul className="detailList">
                  <li>
                    <span>시설</span>
                    <p>{data.facility}</p>
                  </li>
                  <li>
                    <span>규모</span>
                    <p>{data.scale}</p>
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
      }
    } else if (dataArr && categoryName === "전체 대피소") {
      for (let i = 0; i < dataArr.shelter.length; i++) {
        if (dataArr.shelter[i].title === listName) {
          let data = dataArr.shelter[i];
          return (
            <div key={data.title}>
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
                <h3>{data.title}</h3>
                <div className="addressWrap">
                  <p className="subTitle">{data.address}</p>
                  <CopyClipBoard text={data.address} />
                </div>
              </div>
              {data.tag === "대피소" || data.tag === "지진옥외" ? (
                <ul className="detailList">
                  <li>
                    <span>시설</span>
                    <p>{data.facility}</p>
                  </li>
                  <li>
                    <span>규모</span>
                    <p>{data.scale}</p>
                  </li>
                  <li>
                    <span>최대 수용인원</span>
                    <p>{data.address}</p>
                  </li>
                  <li>
                    <span>전화번호</span>
                    <p>{data.address}</p>
                  </li>
                  {data.badge != "-" ? (
                    <div className="badgeWrap">{data.badge}</div>
                  ) : null}
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
      }
    } else if (dataArr && categoryName === "병원&약국") {
      for (let i = 0; i < dataArr.hospital.length; i++) {
        if (dataArr.hospital[i].title === listName) {
          let data = dataArr.hospital[i];
          return (
            <div key={data.title}>
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
                <h3>{data.title}</h3>
                <div className="addressWrap">
                  <p className="subTitle">{data.address}</p>
                  <CopyClipBoard text={data.address} />
                </div>
              </div>
              {data.tag === "병원" ? (
                <ul className="detailList">
                  <li>
                    <span>시설</span>
                    <p>{data.facility}</p>
                  </li>
                  <li>
                    <span>전화번호</span>
                    <p>{data.address}</p>
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
      }
    } else if (dataArr && wholeData && categoryName === "전체") {
      for (let i = 0; i < wholeData.length; i++) {
        if (wholeData[i].title === listName) {
          let data = wholeData[i];
          return (
            <div key={data.title}>
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
                <h3>{data.title}</h3>
                <div className="addressWrap">
                  <p className="subTitle">{data.address}</p>
                  <CopyClipBoard text={data.address} />
                </div>
              </div>
              {data.tag === "대피소" || data.tag === "지진옥외" ? (
                <ul className="detailList">
                  <li>
                    <span>시설</span>
                    <p>{data.facility}</p>
                  </li>
                  <li>
                    <span>규모</span>
                    <p>{data.scale}</p>
                  </li>
                  <li>
                    <span>최대 수용인원</span>
                    <p>{data.address}</p>
                  </li>
                  <li>
                    <span>전화번호</span>
                    <p>{data.address}</p>
                  </li>
                  {data.badge != "-" ? (
                    <div className="badgeWrap">{data.badge}</div>
                  ) : null}
                </ul>
              ) : data.tag === "급수시설" ? (
                <ul className="detailList">
                  <li>
                    <span>시설</span>
                    <p>{data.facility}</p>
                  </li>
                  <li>
                    <span>규모</span>
                    <p>{data.scale}</p>
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
              ) : data.tag === "병원" ? (
                <ul className="detailList">
                  <li>
                    <span>시설</span>
                    <p>{data.facility}</p>
                  </li>
                  <li>
                    <span>전화번호</span>
                    <p>{data.tel}</p>
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
      }
    }
  };
  return <DetailWrap>{render()}</DetailWrap>;
};

export default MapDetail;
