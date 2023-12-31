import { inspect } from "util";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const DisasterWrap = styled.div`
  margin-top: 32px;
  /* height: 810px; */
  /* overflow-y: scroll; */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
const CardWrap = styled.div`
  width: 31%;
`;

const MainCard = styled.div`
  width: 100%;
  height: 108px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MainViewContainer = styled.div`
  overflow-y: auto;
  scrollbar-width: none;
  height: 100%;
  padding-bottom: 100px;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }
`;

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
`;
function SubTitleStyle(subTitleText: String) {
  return (
    <div
      style={{
        color: "#000",
        marginTop: "32px",
        marginBottom: "14px",
        fontSize: "18px",
        fontStyle: "normal",
        fontWeight: 600,
        lineHeight: "normal",
        fontFamily: "Pretenderd",
      }}
    >
      {subTitleText}
    </div>
  );
}

interface ItemData {
  name: string;
  ImageUrl: string;
}

const subTitleList = ["자연재난", "사회재난", "생활안전", "비상대피"];
const natureMockData: ItemData[] = [
  { name: "침수", ImageUrl: "assets/icon/flooding.png" },
  { name: "강풍", ImageUrl: "assets/icon/wind.png" },
  { name: "한파", ImageUrl: "assets/icon/coldwind.png" },
  { name: "낙뢰", ImageUrl: "assets/icon/thunderstroke.png" },
  { name: "태풍", ImageUrl: "assets/icon/typhoon.png" },
  { name: "대설", ImageUrl: "assets/icon/snow.png" },
  { name: "호우", ImageUrl: "assets/icon/flood.png" },
  { name: "폭염", ImageUrl: "assets/icon/heat.png" },
  { name: "황사", ImageUrl: "assets/icon/snow.png" },
  { name: "지진", ImageUrl: "assets/icon/thunderstroke.png" },
  { name: "해일", ImageUrl: "assets/icon/tsunami.png" },
  { name: "가뭄", ImageUrl: "assets/icon/drought.png" },
  { name: "홍수", ImageUrl: "assets/icon/flood.png" },
  { name: "해수면상승", ImageUrl: "assets/icon/sealevel.png" },
  { name: "산사태", ImageUrl: "assets/icon/landslide.png" },
];

const societyMockData: ItemData[] = [
  { name: "화재", ImageUrl: "assets/icon/fire.png" },
  { name: "산불", ImageUrl: "assets/icon/forestfire.png" },
  { name: "정전", ImageUrl: "assets/icon/blackout.png" },
  { name: "정보통신사고", ImageUrl: "assets/icon/information.png" },
  { name: "식용수", ImageUrl: "assets/icon/drinking.png" },
  { name: "건축물붕괴", ImageUrl: "assets/icon/collapse.png" },
];

const DisasterItemCard = (disasterName: string, disasterIcon: string) => {
  const navigate = useNavigate();
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const {
      currentTarget: { innerText },
    } = e;
    navigate(`/guide/disaster/${innerText}`, { state: innerText });
  };
  return (
    <CardWrap
      key={disasterName}
      onClick={(e) => {
        onClick(e);
      }}
    >
      <MainCard>
        <img src={disasterIcon} alt={"재난 사진"} />
      </MainCard>
      <div
        style={{
          marginTop: "8px",
          textAlign: "center",
          fontSize: "20px",
          color: "#000000",
          fontWeight: 600,
          fontFamily: "Pretendard",
        }}
      >
        {disasterName}
      </div>
    </CardWrap>
  );
};

const DisasterResponse = () => {
  return (
    <DisasterWrap>
      {
        <div>
          <MainViewContainer>
            {SubTitleStyle(subTitleList[0])}
            <CardContainer>
              {natureMockData.map((item) => {
                return DisasterItemCard(item.name, item.ImageUrl);
              })}
            </CardContainer>
            {SubTitleStyle(subTitleList[1])}
            <CardContainer>
              {societyMockData.map((item) => {
                return DisasterItemCard(item.name, item.ImageUrl);
              })}
            </CardContainer>
          </MainViewContainer>
        </div>
      }
    </DisasterWrap>
  );
};

export default DisasterResponse;
