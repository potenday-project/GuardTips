import { styled } from "styled-components";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
} from "react-naver-maps";
import ListMenu from "./components/ListMenu";

const MapWrap = styled.section`
  width: 100%;
  height: 100%;
  position: relative;
`;

const SearchModal = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
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
    width: 370px;
    height: 213px;
    padding: 30px;
    margin-top: 150px;
    flex-shrink: 0;
    border-radius: 12px;
    background: var(--W_00, #fff);
    z-index: 100;
  }
  .btnWrap {
    display: flex;
    justify-content: end;
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
`;

const MapContents = styled.div`
  width: 100%;
  padding: 0 30px;
  .map {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 70px;
    left: 0;
  }
`;

const IconWrap = styled.ul`
  margin-top: 11px;
  display: flex;
  flex-direction: column;
  align-items: end;
  li {
    width: 50px;
    height: 50px;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0px 16px 16px 0px rgba(137, 137, 152, 0.1);
    margin-bottom: 16px;
    z-index: 99;
  }
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .nowPlace {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    height: 92px;
    border-radius: 20px;
    background: var(--W_00, #fff);
    box-shadow: 0px 16px 16px 0px rgba(137, 137, 152, 0.1);
    svg {
      position: absolute;
      right: 20px;
      top: 20px;
    }
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 20px 0px 20px 20px;
      background: #056fe7;
      width: 94px;
      height: 92px;
      flex-shrink: 0;
      color: var(--W_00, #fff);
      font: 600 20px "Pretendard";
    }
    .textWrap {
      margin-left: 16px;
      p {
        color: var(--G_00, #000);
        font: 600 16px/30px "Pretendard";
      }
      span {
        color: var(--G_02, #8b8b92);
        font: 600 16px "Pretendard";
      }
    }
  }
`;

const DetailWrap = styled.div`
  width: 100%;
  height: auto;
  padding: 30px;
  position: absolute;
  bottom: 70px;
  background: var(--W_00, #fff);
  border-radius: 20px 20px 0px 0px;

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
      :first-child {
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

export interface IData {
  order: number;
  name: string;
  address: string;
  code: number[];
  type: string;
  detail?: { [key: string]: string };
}

const Map = () => {
  const location = useLocation();
  const enterName = location.state;
  const [menuName, setMenuName] = useState("전체");
  const [showNow, setShowNow] = useState(false);

  const [curPlace, setCurPlace] = useState<number[]>();
  const [tempData, setTempData] = useState<IData[]>([]);

  const [map, setMap] = useState<any>(null);
  const navermaps = useNavermaps();

  const [showDetail, setShowDetail] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [listName, setListName] = useState("");

  useEffect(() => {
    setTempData([
      {
        order: 11,
        name: "잠실새내",
        address: "서울특별시 용산구 한강로2가 1-0",
        code: [37.511687, 127.086162],
        type: "민방위대피소",
        detail: {
          place: "수정 아파트 지하1층 (공공시설)",
          size: "611㎡",
          people: "740명",
          phone: "052-209-3688",
        },
      },
      {
        order: 23,
        name: "종합운동장",
        address: "서울특별시 용산구 한강로2가 1-0",
        code: [37.510997, 127.073642],
        type: "급수시설",
      },
      {
        order: 1456,
        name: "삼성",
        address: "서울특별시 용산구 한강로2가 1-0",
        code: [37.508844, 127.06316],
        type: "민방위대피소",
      },
      {
        order: 71,
        name: "선릉",
        address: "서울특별시 용산구 한강로2가 1-0",
        code: [37.504503, 127.049008],
        type: "지진 대피소",
      },
      {
        order: 1341,
        name: "역삼",
        address: "서울특별시 용산구 한강로2가 1-0",
        code: [37.500622, 127.036456],
        type: "병원",
      },
      {
        order: 65,
        name: "강남",
        address: "서울특별시 용산구 한강로2가 1-0",
        code: [37.497175, 127.027926],
        type: "병원",
      },
      {
        order: 333,
        name: "교대",
        address: "서울특별시 용산구 한강로2가 1-0",
        code: [37.493415, 127.01408],
        type: "임시주거시설",
      },
      {
        order: 575,
        name: "방배",
        address: "서울특별시 용산구 한강로2가 1-0",
        code: [37.481426, 126.997596],
        type: "민방위대피소",
      },
      {
        order: 3,
        name: "사당",
        address: "서울특별시 용산구 한강로2가 1-0",
        code: [37.47653, 126.981685],
        type: "약국",
      },
      {
        order: 578,
        name: "신대방",
        address: "서울특별시 용산구 한강로2가 1-0",
        code: [37.487462, 126.913149],
        type: "급수시설",
      },
    ]);
  }, []);

  useEffect(() => {
    if (enterName === "") {
      setMenuName("전체");
    } else if (enterName === "대피 시설") {
      setMenuName("전체 대피소");
    } else {
      setMenuName(enterName);
    }
  }, []);

  const onClick = (x: number[]) => {
    if (map) {
      map.panTo(
        new naver.maps.LatLng(new naver.maps.LatLng(x[0] - 0.006, x[1])),
      );
      setCurPlace(x);
    }
    setShowDetail(true);
  };

  // 리랜더링 방지
  const filterData = tempData.filter((data) => {
    if (data.name === listName) {
      return data;
    }
    return <div>{data.order}</div>;
  });

  return (
    <MapWrap>
      <Header title={"지도"} />
      <MapContents>
        <MapDiv
          style={{
            position: "absolute",
            width: "100%",
            // height: "100vh",
          }}
          className="map"
        >
          <NaverMap
            defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
            defaultZoom={15}
            maxZoom={15}
            minZoom={15}
            ref={setMap}
          >
            {tempData.map((x) => {
              return (
                <Marker
                  key={x.name}
                  position={new navermaps.LatLng(x.code[0], x.code[1])}
                  title={x.name}
                  onClick={() => {
                    onClick(x.code);
                  }}
                />
              );
            })}
            {showDetail ? (
              <DetailWrap>
                {tempData.map((x) => {
                  if (x.name === listName) {
                    return (
                      <div key={x.name}>
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
                          <h3>{x.name}</h3>
                          <p className="subTitle">{x.address}</p>
                        </div>

                        <ul className="detailList">
                          <li>
                            <p>시설</p>
                            <p>{x.detail ? x.detail["place"] : null}</p>
                          </li>
                          <li>
                            <p>규모</p>
                            <p>{x.detail ? x.detail["size"] : null}</p>
                          </li>
                          <li>
                            <p>최대 수용인원</p>
                            <p>{x.detail ? x.detail["people"] : null}</p>
                          </li>
                          <li>
                            <p>전화번호</p>
                            <p>{x.detail ? x.detail["phone"] : null}</p>
                          </li>
                        </ul>
                        <div className="btnWrap">
                          <button>자세히보기</button>
                          <button>공유하기</button>
                        </div>
                      </div>
                    );
                  }
                })}
              </DetailWrap>
            ) : (
              <ListMenu
                dataArr={tempData}
                menuName={menuName}
                clickEvent={onClick}
                setMenuName={setMenuName}
                setListName={setListName}
              />
            )}
          </NaverMap>
        </MapDiv>
        <IconWrap>
          {showNow ? (
            <li className="nowPlace">
              <div className="title">내 위치</div>
              <div className="textWrap">
                <p>
                  <span>위도(y) </span>
                  {curPlace ? curPlace[0] : 0}
                </p>
                <p>
                  <span>경도(x)</span>
                  {curPlace ? curPlace[1] : 0}
                </p>
              </div>

              <svg
                onClick={() => setShowNow(false)}
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
              >
                <path
                  d="M1 7L7 1L13 7"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </li>
          ) : (
            <li className="icon" onClick={() => setShowNow(true)}>
              <img src="assets/icon/location.png" alt="내 위치" />
            </li>
          )}
          <li
            className="icon"
            onClick={() => {
              onClick([37.3595704, 127.105399]);
              setShowDetail(false);
            }}
          >
            <img src="assets/icon/reset.png" alt="위치 재설정" />
          </li>
          <li
            className="icon"
            onClick={() => {
              setShowSearch(true);
            }}
          >
            <img src="assets/icon/search.png" alt="검색" />
          </li>
        </IconWrap>
        {showSearch ? (
          <SearchModal>
            <div
              className="bg"
              onClick={() => {
                setShowSearch(false);
              }}
            ></div>
            <div className="modal">
              <h3>검색</h3>
              <input type="text" placeholder="검색해주세요" />
              <div className="btnWrap">
                <button
                  onClick={() => {
                    setShowSearch(false);
                  }}
                >
                  취소
                </button>
                <button>검색</button>
              </div>
            </div>
          </SearchModal>
        ) : null}
      </MapContents>
    </MapWrap>
  );
};

export default Map;
