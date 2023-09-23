import { inspect } from "util";
import { styled } from "styled-components";

function SubTitleStyle(subTitleText: String) {
  return (
    <div
      style={{
        color: "#000",
        marginTop: "32px",
        marginBottom: "14px",
        fontFamily: "Pretender",
        fontSize: "18px",
        fontStyle: "normal",
        fontWeight: 600,
        lineHeight: "normal",
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
  { name: "침수", ImageUrl: "https://picsum.photos/52/52" },
  { name: "강풍", ImageUrl: "https://picsum.photos/52/52" },
  { name: "한파", ImageUrl: "https://picsum.photos/52/52" },
  { name: "낙뢰", ImageUrl: "https://picsum.photos/52/52" },
  { name: "태풍", ImageUrl: "https://picsum.photos/52/52" },
  { name: "대설", ImageUrl: "https://picsum.photos/52/52" },
];

const societyMockData: ItemData[] = [
  { name: "화재", ImageUrl: "https://picsum.photos/52/52" },
  { name: "산불", ImageUrl: "https://picsum.photos/52/52" },
  { name: "정전", ImageUrl: "https://picsum.photos/52/52" },
  { name: "정보통신사고", ImageUrl: "https://picsum.photos/52/52" },
  { name: "식용수", ImageUrl: "https://picsum.photos/52/52" },
  { name: "건축물붕괴", ImageUrl: "https://picsum.photos/52/52" },
];

const livingSafetyMockData: ItemData[] = [
  { name: "침수", ImageUrl: "https://picsum.photos/52/52" },
  { name: "강풍", ImageUrl: "https://picsum.photos/52/52" },
  { name: "한파", ImageUrl: "https://picsum.photos/52/52" },
  { name: "낙뢰", ImageUrl: "https://picsum.photos/52/52" },
  { name: "태풍", ImageUrl: "https://picsum.photos/52/52" },
  { name: "대설", ImageUrl: "https://picsum.photos/52/52" },
];

const emergencyMockData: ItemData[] = [
  { name: "침수", ImageUrl: "https://picsum.photos/52/52" },
  { name: "강풍", ImageUrl: "https://picsum.photos/52/52" },
  { name: "한파", ImageUrl: "https://picsum.photos/52/52" },
  { name: "낙뢰", ImageUrl: "https://picsum.photos/52/52" },
  { name: "태풍", ImageUrl: "https://picsum.photos/52/52" },
  { name: "대설", ImageUrl: "https://picsum.photos/52/52" },
];

const DisasterItemCard = (disasterName: string, disasterIcon: string) => {
  const MainCard = styled.div`
    width: 108px;
    height: 108px;
    background-color: white;
    border-radius: 8px;
    border: 1px solid #d9d9d9;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  return (
    <div key={disasterName}>
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
        }}
      >
        {disasterName}
      </div>
    </div>
  );
};

const DisasterResponse = () => {
  const CardContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 14px;
  `;

  const MainViewContainer = styled.div`
    height: calc(100vh - 500px);
    overflow-y: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
      display: none;
    }
  `;

  return (
    <div>
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
            {SubTitleStyle(subTitleList[2])}
            <CardContainer>
              {livingSafetyMockData.map((item) => {
                return DisasterItemCard(item.name, item.ImageUrl);
              })}
            </CardContainer>
            {SubTitleStyle(subTitleList[3])}
            <CardContainer>
              {emergencyMockData.map((item) => {
                return DisasterItemCard(item.name, item.ImageUrl);
              })}
            </CardContainer>
          </MainViewContainer>
        </div>
      }
    </div>
  );
};

export default DisasterResponse;
