import { styled } from "styled-components";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
  InfoWindow,
} from "react-naver-maps";
import ListMenu from "./components/ListMenu";
import MapDetail from "./components/MapDetail";
import MapIcon from "./components/MapIcon";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  categoryNameAtom,
  curLocationAtom,
  dataArrAtom,
  listNameAtom,
  showDetailAtom,
  showSearchAtom,
} from "../../recoil/atom";
import SearchModal from "./components/SearchModal";
import { apiconfig } from "../../hooks/apiconfig";

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
  waterworks: [
    {
      address: string;
      distance: number;
      facility: string;
      gu: string;
      latitude: number;
      longitude: number;
      scale: string;
      si: string;
      tag: string;
      title: string;
    },
  ];
  shelter: [
    {
      address: string;
      badge: string;
      capacity: string;
      distance: number;
      facility: string;
      gu: string;
      latitude: number;
      longitude: number;
      scale: string;
      si: string;
      tag: string;
      tel: string;
      title: string;
    },
  ];
  hospital: [
    {
      address: string;
      distance: number;
      facility: string;
      gu: string;
      latitude: number;
      longitude: number;
      si: string;
      tag: string;
      tel: string;
      title: string;
    },
  ];
}

interface IArr {
  [key: string]: string | number;
  tag: string;
  title: string;
  address: string;
  latitude: number;
  longitude: number;
}

const Map = () => {
  // 라우터로 받아온 정보
  const location = useLocation();
  const enterName = location.state;

  // 지도
  const [mapRef, setMapRef] = useState<any>(null);
  const navermaps = useNavermaps();

  // 분류 이름
  const [categoryName, setCategoryName] = useRecoilState(categoryNameAtom);
  // 상세 정보
  const [showDetail, setShowDetail] = useRecoilState(showDetailAtom);

  // 최근 위치(=현재 위치)
  const [curPlace, setCurPlace] = useState<number[]>();

  // 검색 모달창
  const [showSearch, setShowSearch] = useRecoilState(showSearchAtom);
  // 리스트 이름
  const [listName, setListName] = useRecoilState(listNameAtom);

  // 임시 데이터
  const mockData = useRecoilValue(dataArrAtom);

  const [myLocation, setMyLocation] = useRecoilState(curLocationAtom);

  const [wholeData, setWholeData] = useState<IArr[]>();

  const wholeDataArr = () => {
    let sortArr: {
      [key: string]: string | number;
      tag: string;
      title: string;
      address: string;
      latitude: number;
      longitude: number;
    }[] = [];
    if (dataArr) {
      dataArr.waterworks.map((x) => sortArr.push(x));
      dataArr.shelter.map((x) => sortArr.push(x));
      dataArr.hospital.map((x) => sortArr.push(x));
    }
    sortArr.sort((a, b) => {
      return +a.distance - +b.distance;
    });
    setWholeData(sortArr);
  };

  useEffect(() => {
    wholeDataArr();

    if (enterName === "") {
      setCategoryName("전체");
    } else if (enterName === "대피 시설") {
      setCategoryName("전체 대피소");
    } else {
      setCategoryName(enterName);
    }
  }, []);

  useEffect(() => {
    wholeDataArr();
  }, [categoryName]);

  // api test
  const [dataArr, setDataArr] = useState<IData>();
  axios.defaults.withCredentials = true;
  axios.defaults.headers["Access-Control-Allow-Origin"] = "*";

  useEffect(() => {
    const apiUrl = "https://www.guardsafe.store";
    let longitude = myLocation.longitude;
    let latitude = myLocation.latitude;
    const getApi = async () => {
      const url = `/api?longitude=${longitude}&latitude=${latitude}`;
      try {
        const res = await await axios
          .get(`${apiconfig.SERVER_URI}${url}`)
          .then((res) => {
            setDataArr(res.data);
          });
      } catch (err) {
        console.error(err);
        console.log(apiconfig.SERVER_URI, url);
      }
    };
    getApi();
  }, [myLocation]);

  const [infowindow, setInfoWindow] = useState<any>(null);

  function onSuccessGeolocation(position: any) {
    if (!mapRef || !infowindow) return;

    const location = new navermaps.LatLng(
      position.coords.latitude,
      position.coords.longitude,
    );
    mapRef.setCenter(location);
    mapRef.setZoom(10);

    setMyLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }

  function onErrorGeolocation() {
    const center = mapRef.getCenter();
    setMyLocation({ latitude: center.lat(), longitude: center.lng() });
  }

  useEffect(() => {
    if (!mapRef || !infowindow) {
      return;
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        onSuccessGeolocation,
        onErrorGeolocation,
      );
    } else {
      var center = mapRef.getCenter();
      infowindow.setContent(
        '<div style="padding:20px;"><h5 style="margin-bottom:5px;color:#f00;">Geolocation not supported</h5></div>',
      );
      infowindow.open(mapRef, center);
    }
  }, [mapRef, infowindow]);

  const clickMapEvent = (code: number[]) => {
    if (mapRef) {
      mapRef.panTo(
        new navermaps.LatLng(new navermaps.LatLng(code[0] - 0.006, code[1])),
      );
      setCurPlace(code);
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
            defaultCenter={new navermaps.LatLng(37.5657, 126.9769)}
            defaultZoom={15}
            maxZoom={15}
            minZoom={15}
            ref={setMapRef}
          >
            {dataArr && categoryName === "급수시설"
              ? dataArr.waterworks.map((data) => (
                  <Marker
                    key={data.title}
                    position={
                      new navermaps.LatLng(data.latitude, data.longitude)
                    }
                    title={data.title}
                    onClick={() => {
                      clickMapEvent([data.latitude, data.longitude]);
                      setListName(data.title);
                    }}
                    icon={{
                      content: `<div class="marker waterMarker"><img src="assets/icon/drop.png" alt=${data.tag} /></div>`,
                    }}
                  />
                ))
              : dataArr && categoryName === "전체 대피소"
              ? dataArr.shelter.map((data) => (
                  <Marker
                    key={data.title}
                    position={
                      new navermaps.LatLng(data.latitude, data.longitude)
                    }
                    title={data.title}
                    onClick={() => {
                      clickMapEvent([data.latitude, data.longitude]);
                      setListName(data.title);
                    }}
                    icon={{
                      content: `<div class="marker exitMarker"><img src="assets/icon/exit.png" alt=${data.tag} /></div>`,
                    }}
                  />
                ))
              : dataArr && categoryName === "병원&약국"
              ? dataArr.hospital.map((data) => (
                  <Marker
                    key={data.title}
                    position={
                      new navermaps.LatLng(data.latitude, data.longitude)
                    }
                    title={data.title}
                    onClick={() => {
                      clickMapEvent([data.latitude, data.longitude]);
                      setListName(data.title);
                    }}
                    icon={{
                      content:
                        data.tag === "약국"
                          ? `<div class="marker medicineMarker"><img src="assets/icon/medicine.png" alt=${data.tag} /></div>`
                          : data.tag === "병원"
                          ? `<div class="marker hospitalMarker"><img src="assets/icon/hospital.png" alt=${data.tag} /></div>`
                          : `<div></div>`,
                    }}
                  />
                ))
              : dataArr && categoryName === "전체"
              ? wholeData?.map((data) => (
                  <Marker
                    key={data.title}
                    position={
                      new navermaps.LatLng(data.latitude, data.longitude)
                    }
                    title={data.title}
                    onClick={() => {
                      clickMapEvent([data.latitude, data.longitude]);
                      setListName(data.title);
                    }}
                    icon={{
                      content:
                        data.tag === "민방위대피소" ||
                        data.tag === "지진옥외" ||
                        data.tag === "대피소"
                          ? `<div class="marker exitMarker"><img src="assets/icon/exit.png" alt=${data.tag} /></div>`
                          : data.tag === "급수시설"
                          ? `<div class="marker waterMarker"><img src="assets/icon/drop.png" alt=${data.tag} /></div>`
                          : data.tag === "약국"
                          ? `<div class="marker medicineMarker"><img src="assets/icon/medicine.png" alt=${data.tag} /></div>`
                          : data.tag === "병원"
                          ? `<div class="marker hospitalMarker"><img src="assets/icon/hospital.png" alt=${data.tag} /></div>`
                          : `<div></div>`,
                    }}
                  />
                ))
              : null}
            {showDetail ? (
              <MapDetail dataArr={dataArr} wholeData={wholeData} />
            ) : (
              <ListMenu
                clickEvent={clickMapEvent}
                dataArr={dataArr}
                wholeData={wholeData}
              />
            )}
            <InfoWindow content="" ref={setInfoWindow} />
          </NaverMap>
        </MapDiv>
        <MapIcon curPlace={curPlace} clickEvent={clickMapEvent} />
        {showSearch ? <SearchModal /> : null}
      </MapContents>
    </MapWrap>
  );
};

export default Map;
