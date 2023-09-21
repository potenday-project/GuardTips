import { styled } from "styled-components";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
} from "react-naver-maps";
import ListMenu from "./components/ListMenu";
import MapDetail from "./components/MapDetail";
import MapIcon from "./components/MapIcon";
import axios from "axios";

const MapWrap = styled.section`
  width: 100%;
  height: 100%;
  position: relative;
  .marker {
    width: 40.711px;
    height: 40.711px;
    transform: rotate(45deg);
    border-radius: 30px 30px 0px 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 50%;
      height: 50%;
      transform: rotate(-45deg);
      object-fit: contain;
    }
  }
  .exitMarker {
    background: #056fe7;
  }
  .waterMarker {
    background: #5ebbcb;
  }
  .medicineMarker {
    background: #7750e7;
  }
  .hospitalMarker {
    background: #ef4aad;
  }
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

  const [curPlace, setCurPlace] = useState<number[]>();
  const [tempData, setTempData] = useState<IData[]>([]);

  const [map, setMap] = useState<any>(null);
  const navermaps = useNavermaps();

  const [showDetail, setShowDetail] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [listName, setListName] = useState("");

  const [dataArr, setDataArr] = useState();

  useEffect(() => {
    const getWaterApi = async () => {
      const url =
        "http://49.50.167.129:5000/waterworks?si=서울특별시&gu=종로구";
      try {
        const res = await await axios.get(`${url}`).then((res) => {
          setDataArr(res.data);
        });
      } catch (err) {
        console.error("err");
      }
    };
    if (enterName === "급수시설") {
      getWaterApi();
    }
  }, []);

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
        detail: {
          place: "수정 아파트 지하1층 (공공시설)",
          size: "611㎡",
        },
      },
      {
        order: 1341,
        name: "역삼",
        address: "서울특별시 용산구 한강로2가 1-0",
        code: [37.500622, 127.036456],
        type: "병원",
        detail: {
          place: "수정 아파트 지하1층 (공공시설)",
          phone: "052-209-3688",
        },
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

  return (
    <MapWrap>
      <Header title={"지도"} />
      <MapContents>
        <MapDiv
          style={{
            position: "absolute",
            width: "100%",
          }}
          className="map"
        >
          <NaverMap
            defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
            defaultZoom={15}
            maxZoom={18}
            minZoom={15}
            ref={setMap}
          >
            {tempData.map((data) => {
              return (
                <Marker
                  key={data.name}
                  position={new navermaps.LatLng(data.code[0], data.code[1])}
                  title={data.name}
                  onClick={() => {
                    onClick(data.code);
                    setListName(data.name);
                  }}
                  icon={{
                    content:
                      data.type === "민방위대피소"
                        ? `<div class="marker exitMarker"><img src="assets/icon/exit.png" alt=${data.type} /></div>`
                        : data.type === "급수시설"
                        ? `<div class="marker waterMarker"><img src="assets/icon/drop.png" alt=${data.type} /></div>`
                        : data.type === "약국"
                        ? `<div class="marker medicineMarker"><img src="assets/icon/medicine.png" alt=${data.type} /></div>`
                        : data.type === "병원"
                        ? `<div class="marker hospitalMarker"><img src="assets/icon/hospital.png" alt=${data.type} /></div>`
                        : `<div></div>`,
                  }}
                />
              );
            })}
            {showDetail ? (
              <MapDetail
                dataArr={tempData}
                listName={listName}
                setShowDetail={setShowDetail}
              />
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
        <MapIcon
          curPlace={curPlace}
          onClick={onClick}
          setShowDetail={setShowDetail}
          setShowSearch={setShowSearch}
        />
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
