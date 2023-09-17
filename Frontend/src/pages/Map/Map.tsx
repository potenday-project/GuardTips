import { styled } from "styled-components";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const MapWrap = styled.section`
  width: 100%;
  height: 100%;
  background-color: pink;
  position: relative;
`;

const MapContents = styled.div`
  width: 100%;
  padding: 0 30px;
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
  }
  .nowPlace {
    position: relative;
    width: 100%;
    height: 92px;
    border-radius: 20px;
    background: var(--W_00, #fff);
    box-shadow: 0px 16px 16px 0px rgba(137, 137, 152, 0.1);
    svg {
      position: absolute;
      right: 0;
      top: 0;
    }
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 20px 0px 20px 20px;
      background: #056fe7;
      width: 94px;
      height: 92px;
      flex-shrink: 0;
    }
  }
`;

const ContentsWrap = styled.section`
  padding: 0 30px;
  border-radius: 20px 20px 0 0;
  width: 100%;
  height: 471px;
  background-color: white;
  position: absolute;
  bottom: 0;
`;

const SelectWrap = styled.div`
  position: relative;
  margin: 20px 0;
  h3 {
    color: var(--G_00, #000);
    font-family: "Giants";
    font-size: 22px;
    font-weight: 700;
  }
`;

const SelectList = styled.ul`
  width: 153px;
  height: 264px;
  border-radius: 12px;
  background: var(--G_04, #ececec);
  display: inline-block;
  margin-top: 4px;
  position: absolute;
  z-index: 1;
  .active {
    width: 100%;
    border-radius: 12px;
    background: var(--B_00, rgba(5, 111, 231, 0.3));
  }
  li {
    text-indent: 15px;
    color: var(--G_00, #000);
    font-family: "Pretendard";
    font-size: 16px;
    font-weight: 500;
    line-height: 43.5px;
  }
`;
const ListWrap = styled.div`
  height: 100%;
  overflow-y: scroll;
  /* 스크롤 안보이기 */
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  ::-webkit-scrollbar {
    display: none;
  }
  ul {
  }
`;

interface IList {
  color: string;
}
const List = styled.li<IList>`
  position: relative;
  display: flex;
  margin-bottom: 8px;
  padding: 20px 26px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  border-radius: 20px;
  border: 1px solid var(--G_03, #d9d9d9);
  background: var(--W_00, #fff);
  box-sizing: border-box;
  .label {
    position: absolute;
    top: 0;
    right: 0;
    width: 67px;
    height: 100%;
    flex-shrink: 0;
    border-radius: 0px 20px 20px 20px;
    background: #056fe7;
    background: ${(props) =>
      props.color === "민방위대피소"
        ? "#056fe7"
        : props.color === "임시주거시설"
        ? "pink"
        : props.color === "지진 대피소"
        ? "yellow"
        : props.color === "급수시설"
        ? "#5EBBCB"
        : props.color === "병원"
        ? "#EF4AAD"
        : props.color === "약국"
        ? "#7750E7"
        : null};
  }
`;

const Map = () => {
  const location = useLocation();
  const enterName = location.state;
  const [showMenu, setShowMenu] = useState(false);
  const [menuName, setMenuName] = useState("전체");
  const [showNow, setShowNow] = useState(false);

  const menuList = [
    "전체",
    "민방위대피소",
    "임시주거시설",
    "지진 대피소",
    "급수시설",
    "병원&약국",
  ];

  const data = [
    {
      name: "용산초등학교 운동장",
      address: "서울특별시 용산구 한강로2가 1-0",
      type: "민방위대피소",
    },
    {
      name: "용산초등학교 운동장",
      address: "서울특별시 용산구 한강로2가 1-0",
      type: "병원",
    },
    {
      name: "용산초등학교 운동장",
      address: "서울특별시 용산구 한강로2가 1-0",
      type: "급수시설",
    },
    {
      name: "용산초등학교 운동장",
      address: "서울특별시 용산구 한강로2가 1-0",
      type: "약국",
    },
    {
      name: "temp",
      address: "a",
      type: "임시주거시설",
    },

    {
      name: "temp",
      address: "a",
      type: "지진 대피소",
    },
  ];
  const [dataArr, setDataArr] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (enterName === "") {
      setMenuName("전체");
    } else {
      setMenuName(enterName);
    }
    const registerEvent = async () => {
      const url = "https://apis.data.go.kr/1741000/TsunamiShelter3";
      try {
        const res = await await axios
          .get(
            `${url}/getTsunamiShelter1List?serviceKey=${process.env.REACT_APP_API_KEY}&pageNo=1&numOfRows=10&type=json`,
          )
          .then((res) => {
            setDataArr(res.data.TsunamiShelter[1].row);
            setLoading(true);
          });
      } catch (err) {
        console.error(err);
      }
    };
    registerEvent();
  }, []);

  console.log(dataArr);

  const menuClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const {
      currentTarget: { innerText },
    } = e;
    setMenuName(innerText);
    setShowMenu(false);
  };

  const searched = data.filter((data) => {
    if (menuName === "전체") {
      return data;
    } else if (menuName === "병원&약국") {
      return data.type.includes("병원") || data.type.includes("약국");
    }
    return data.type.includes(menuName);
  });

  return (
    <MapWrap>
      <Header title={"지도"} />
      <MapContents>
        <IconWrap>
          {showNow ? (
            <li className="nowPlace">
              <div>내 위치</div>
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
            <li onClick={() => setShowNow(true)}>현재위치</li>
          )}
          <li>위치 재설정</li>
          <li>검색</li>
        </IconWrap>
        지도
      </MapContents>
      <ContentsWrap>
        <SelectWrap>
          <h3 onClick={() => setShowMenu((prev) => !prev)}>{menuName}</h3>
          {showMenu ? (
            <SelectList>
              {menuList.map((menu) => {
                return (
                  <li
                    key={menu}
                    className={menuName === menu ? "active" : undefined}
                    onClick={menuClick}
                  >
                    {menu}
                  </li>
                );
              })}
            </SelectList>
          ) : null}
        </SelectWrap>
        <ListWrap>
          <ul>
            {searched.map((data, index) => {
              return (
                <List key={index} color={data.type}>
                  <h3>{data.name}</h3>
                  <p>{data.address}</p>
                  <div className="label"></div>
                </List>
              );
            })}
          </ul>
        </ListWrap>
      </ContentsWrap>
    </MapWrap>
  );
};

export default Map;
