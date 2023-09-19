import { styled } from "styled-components";
import { IData } from "../Map";
import { useState } from "react";

interface IList {
  color: string;
}

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
    font: 700 22px "Giants";
  }
`;

const SelectList = styled.ul`
  width: 153px;
  border-radius: 12px;
  background: var(--G_04, #ececec);
  display: inline-block;
  margin-top: 4px;
  position: absolute;
  top: 30px;
  left: 0;
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
  h3 {
    color: var(--Sub_01, var(--G_00, #000));
    font: 600 18px/24px "Pretendard";
  }
  p {
    color: var(--main, #056fe7);
    font: 400 14px "Pretendard";
  }
  .label {
    position: absolute;
    top: 0;
    right: 0;
    width: 67px;
    height: 100%;
    flex-shrink: 0;
    border-radius: 0px 20px 20px 20px;
    background: ${(props) =>
      props.color === "민방위대피소"
        ? "#056fe7 no-repeat url('assets/icon/exit.png')"
        : props.color === "임시주거시설"
        ? "pink"
        : props.color === "지진 대피소"
        ? "yellow"
        : props.color === "급수시설"
        ? "#5EBBCB no-repeat url('assets/icon/drop.png')"
        : props.color === "병원"
        ? "#EF4AAD no-repeat url('assets/icon/hospital.png')"
        : props.color === "약국"
        ? "#7750E7 no-repeat url('assets/icon/medicine.png')"
        : null};
    background-position: center;
  }
`;

const ListWrap = styled.div`
  height: 100%;
  padding-bottom: 150px;
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

interface IListMenu {
  dataArr: IData[];
  menuName: string;
  clickEvent: any;
  setMenuName: any;
  setListName: any;
}

const ListMenu = ({
  dataArr,
  menuName,
  clickEvent,
  setMenuName,
  setListName,
}: IListMenu) => {
  const [showMenu, setShowMenu] = useState(false);

  const menuList = [
    "전체",
    "전체 대피소",
    "민방위대피소",
    "임시주거시설",
    "지진 대피소",
    "급수시설",
    "병원&약국",
  ];

  const menuClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const {
      currentTarget: { innerText },
    } = e;
    setMenuName(innerText);
    setShowMenu(false);
  };

  const filterData = dataArr.filter((data) => {
    if (menuName === "전체") {
      return data;
    } else if (menuName === "전체 대피소") {
      return (
        data.type.includes("민방위대피소") ||
        data.type.includes("지진 대피소") ||
        data.type.includes("임시주거시설")
      );
    } else if (menuName === "병원&약국") {
      return data.type.includes("병원") || data.type.includes("약국");
    }
    return data.type.includes(menuName);
  });
  return (
    <ContentsWrap>
      <SelectWrap>
        <h3 onClick={() => setShowMenu((prev) => !prev)}>
          {menuName}{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="9"
            viewBox="0 0 15 9"
            fill="none"
          >
            <path
              d="M1.0769 7.5L7.07691 1.5L13.0769 7.5"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </h3>

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
          {filterData.map((data, index) => {
            return (
              <List
                key={index}
                color={data.type}
                onClick={(e) => {
                  clickEvent(data.code);
                  setListName(data.name);
                }}
              >
                <h3>{data.name}</h3>
                <p>{data.address}</p>
                <div className="label"></div>
              </List>
            );
          })}
        </ul>
      </ListWrap>
    </ContentsWrap>
  );
};

export default ListMenu;
