import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import styled from "styled-components";
import disaterArray from "./data/disater.json";
import { useState } from "react";
import DisasterList from "./components/DisasterList";

const DetailWrap = styled.section`
  height: 100%;
  .contentsWrap {
    padding: 20px;
    overflow-y: scroll;
    .subtitle {
      color: var(--main, #056fe7);
      font: 600 20px "Pretendard";
    }
    h1 {
      font: 700 30px "Giants";
    }
    h2 {
      font: 700 20px "Giants";
      color: #056fe7;
      margin: 20px 0;
    }
    h3 {
      display: flex;
      font: 600 20px/22px "Pretendard";
      margin-bottom: 10px;
      margin-top: 20px;
      span {
        margin-left: 5px;
      }
    }
    li {
      color: var(--G_00, #000);
      font: 400 18px/22px "Pretendard";
      margin-bottom: 6px;
      position: relative;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;

export const ListContents = styled.li`
  color: var(--G_00, #000);
  font: 400 18px/22px "Pretendard";
  margin-bottom: 6px;
  padding-left: 20px;
  position: relative;
  &::before {
    content: "•";
    width: 10px;
    height: 10px;
    position: absolute;
    top: 0;
    left: 0px;
  }
`;

const ContentsBox = styled.div`
  width: 100%;
  height: 75vh;
  background-color: #fff;
  overflow-y: scroll;
  margin-top: 18px;
  border-radius: 12px;
  border: 1px solid var(--G_03, #d9d9d9);
  padding: 20px;
`;

export const TipBox = styled.div`
  border-radius: 12px;
  background: rgba(239, 74, 173, 0.1);
  padding: 7px 10px 7px 13px;
  color: var(--P_00, #ef4aad);
  font: 400 14px "Pretendard";
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    width: 20px;
    height: 20px;
    img {
      width: 100%;
      object-fit: contain;
    }
  }
  p {
    width: 90%;
  }
`;

interface IDisaterArray {
  [key: string]: {
    유의사항: string;
    "사전 준비": string[] | { title: string; desc: string | string[] }[];
    "발생 시 유의사항"?: string;
    "발생 시": string[] | { title: string; desc: string | string[] }[];
    "발생 이후 유의사항"?: string;
    "발생 이후"?: string[] | { title: string; desc: string | string[] }[];
    "주요기관 연락처": string;
  };
}

export default function DisasterDetail() {
  // 라우터로 받아온 정보
  const location = useLocation();
  const enterName = `${location.state}`.replace(/\n/g, "");

  const arrayData: IDisaterArray = disaterArray;

  const arr = arrayData[enterName];

  return (
    <DetailWrap>
      <Header title="" />
      <div className="contentsWrap">
        <p className="subtitle">자연재난</p>
        <h1>{enterName}</h1>
        {arr ? (
          <ContentsBox>
            <TipBox>
              <div>
                <img src="/assets/icon/alert.png" alt="" />
              </div>
              <p>{arr["유의사항"]}</p>
            </TipBox>

            <DisasterList name={"사전 준비"} arrayData={arr["사전 준비"]} />
            <DisasterList
              name={"발생 시"}
              arrayData={arr["발생 시"]}
              tip={arr["발생 시 유의사항"]}
            />
            {arr["발생 이후"] ? (
              <DisasterList
                name={"발생 이후"}
                arrayData={arr["발생 이후"]}
                tip={arr["발생 이후 유의사항"]}
              />
            ) : null}
            <ul>
              <h2>주요기관 연락처</h2>
              <ListContents>{arr["주요기관 연락처"]}</ListContents>
            </ul>
          </ContentsBox>
        ) : (
          <ContentsBox>서비스 준비중입니다!</ContentsBox>
        )}
      </div>
    </DetailWrap>
  );
}
