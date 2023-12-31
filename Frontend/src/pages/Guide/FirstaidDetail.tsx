import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

const DetailWrap = styled.section`
  height: 100%;
  background: linear-gradient(180deg, #fbfbfc 0%, #ebebf5 100%);
  .contentsWrap {
    padding: 30px;
    overflow-y: scroll;
    /* 스크롤 안보이기 */
    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
    ::-webkit-scrollbar {
      display: none;
    }
    p {
      color: var(--main, #056fe7);
      font: 600 20px "Pretendard";
    }
    h1 {
      font: 700 30px "Giants";
    }
  }
`;
const ContentsBox = styled.div`
  width: 100%;
  max-height: 75vh;
  margin-top: 10px;
  background-color: #fff;
  border-radius: 12px;
  border: 1px solid var(--G_03, #d9d9d9);
  overflow-y: scroll;
  /* 스크롤 안보이기 */
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  ::-webkit-scrollbar {
    display: none;
  }
  div {
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--G_03, #d9d9d9);
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;

const FirstaidDetail = () => {
  // 라우터로 받아온 정보
  const location = useLocation();
  const enterName = location.state.replace(/\n/g, "");
  const mockData: { [key: string]: string } = {
    "심폐소생술(CPR)": "cpr",
    "자동심장충격(AED)": "aed",
    기도폐쇄: "choking",
    지혈처치: "stopbleeding",
    "절단상 처치": "cut",
    "코피 처치": "nosebleeding",
    "화상 처치": "burn",
    "뱀 물림": "snake",
    "설사약 제조(ORS)": "ors",
  };
  const [imgData, setImgData] = useState("");
  useEffect(() => {
    setImgData(mockData[`${enterName}`]);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <DetailWrap>
      <Header title="" />
      <div className="contentsWrap">
        <p>응급처치</p>
        <h1>{enterName}</h1>
        <ContentsBox>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/assets/firstaid/${imgData}.png`}
              alt={enterName}
            />
          </div>
        </ContentsBox>
      </div>
    </DetailWrap>
  );
};

export default FirstaidDetail;
