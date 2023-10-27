import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import styled from "styled-components";
import disaterArray from "./data/disater.json";
import { useState } from "react";

const DetailWrap = styled.section`
  height: 100%;
  background: linear-gradient(180deg, #fbfbfc 0%, #ebebf5 100%);

  .contentsWrap {
    padding: 30px;
    overflow-y: scroll;
    .subtitle {
      color: var(--main, #056fe7);
      font: 600 20px "Pretendard";
    }
    h1 {
      font: 700 30px "Giants";
    }
    div {
      margin-top: 18px;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid var(--G_03, #d9d9d9);
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
`;

const ContentsBox = styled.div`
  width: 100%;
  height: 90vh;
  background-color: #fff;
`;

interface IDisaterArray {
  [key: string]: {
    유의사항: string;
    "사전 준비": string[] | { title: string; desc: string | string[] }[];
    "발생 시": string[] | { title: string; desc: string | string[] }[];
    "주요기관 연락처": string;
  };
}

export default function DisasterDetail() {
  // 라우터로 받아온 정보
  const location = useLocation();
  const enterName = `${location.state}`;

  const arrayData: IDisaterArray = disaterArray;

  const arr = arrayData[enterName];

  if (typeof arr["사전 준비"][0] === "string") {
    console.log(arr["사전 준비"]);
  } else {
    console.log(arr["사전 준비"]);
  }

  return (
    <DetailWrap>
      <Header title="" />
      <div className="contentsWrap">
        <p className="subtitle">자연재난</p>
        <h1>{enterName}</h1>
        <ContentsBox>
          <span>{arr["유의사항"]}</span>
          <ul>
            <h1>사전 준비</h1>
            {arr["사전 준비"].map((x, index) => {
              if (typeof x === "object") {
                return (
                  <li>
                    <h2>
                      {index + 1}.{x.title}
                    </h2>
                    <p>{x.desc}</p>
                  </li>
                );
              }
              return <li>{x.toString()}</li>;
            })}
          </ul>
          <ul>
            <h1>발생 시</h1>
            {arr["사전 준비"].map((x, index) => {
              if (typeof x === "object") {
                return (
                  <li>
                    <h2>
                      {index + 1}.{x.title}
                    </h2>
                    <p>{x.desc}</p>
                  </li>
                );
              }
              return <li>{x.toString()}</li>;
            })}
          </ul>
        </ContentsBox>
      </div>
    </DetailWrap>
  );
}
