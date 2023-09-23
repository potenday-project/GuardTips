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
    p {
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

const GuideDetail = () => {
  // 라우터로 받아온 정보
  const location = useLocation();
  const enterName = location.state;

  const [imgData, setImgData] = useState();

  useEffect(() => {
    const apiUrl = "https://49.50.167.129:5001/images";
    const getApi = async () => {
      const url = `${apiUrl}/${enterName}.png
      `;
      try {
        const res = await await axios.get(`${url}`).then((res) => {
          setImgData(res.data);
        });
      } catch (err) {
        console.error("err");
      }
    };
    getApi();
  }, []);

  console.log(imgData);

  return (
    <DetailWrap>
      <Header title="" />
      <div className="contentsWrap">
        <p>응급처치</p>
        <h1>{enterName}</h1>
        <div>
          <img src={imgData} alt="" />
        </div>
      </div>
    </DetailWrap>
  );
};

export default GuideDetail;
