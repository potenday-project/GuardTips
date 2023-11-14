import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import {
  categoryNameAtom,
  dataArrAtom,
  listNameAtom,
  mapListShowAtom,
} from "../../../recoil/atom";
import CopyClipBoard from "../../../components/CopyClipBoard";
import { IData } from "../Map";
import List from "./List";

interface IShowMenu {
  $isOpen: boolean;
}

const ContentsWrap = styled.section<{ ani: boolean }>`
  padding: 0 30px;
  border-radius: 20px 20px 0 0;
  width: 100%;
  /* height: 50vh; */
  height: 50%;
  background-color: white;
  position: absolute;
  bottom: -200px;
  overflow: hidden;
  ${({ ani }) =>
    ani &&
    ` animation: blink 1s forwards ;
        -webkit-animation: blink .3s ease-in-out forwards ;
      }
      @keyframes blink {
        to {
          bottom: 0;
        }
      }
      @-webkit-keyframes blink {
        to {
          bottom: 0;
        }

  `}
`;
const SelectWrap = styled.div`
  position: relative;
  margin: 20px 0;
  h3 {
    color: var(--G_00, #000);
    font: 700 22px "Giants";
    display: inline-block;
  }
`;

const Icon = styled.div<{ $isOpen: boolean }>`
  display: inline-block;
  transform-origin: 45% 65%;
  transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : null)};
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
  .addressWrap {
    display: flex;
  }
`;

interface IListMenu {
  clickEvent: any;
  dataArr: IData | undefined;
  wholeData:
    | {
        [key: string]: string | number;
        tag: string;
        title: string;
        address: string;
      }[]
    | undefined;
}

const ListMenu = ({ clickEvent, dataArr, wholeData }: IListMenu) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useRecoilState(categoryNameAtom);
  const setListName = useSetRecoilState(listNameAtom);
  const [tap, setTap] = useRecoilState(mapListShowAtom);

  const menuList = [
    "전체",
    "전체 대피소",
    "임시주거시설",
    "지진 대피소",
    "급수시설",
    "병원&약국",
  ];

  const menuClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const {
      currentTarget: { innerText },
    } = e;
    setCategoryName(innerText);
    setShowMenu(false);
  };

  return (
    <ContentsWrap
      ani={tap}
      onClick={() => {
        setTap(true);
      }}
    >
      <SelectWrap>
        <h3 onClick={() => setShowMenu((prev) => !prev)}>
          {categoryName}{" "}
          <Icon $isOpen={showMenu}>
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
          </Icon>
        </h3>

        {showMenu ? (
          <SelectList>
            {menuList.map((menu) => {
              return (
                <li
                  key={menu}
                  className={categoryName === menu ? "active" : undefined}
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
          {dataArr && categoryName === "급수시설" ? (
            dataArr.waterworks.map((data, index) => {
              return (
                <List
                  key={uuidv4()}
                  tag={categoryName}
                  data={data}
                  clickEvent={clickEvent}
                  setListName={setListName}
                />
              );
            })
          ) : dataArr && categoryName === "전체 대피소" ? (
            dataArr.shelter.map((data, index) => {
              if (data.tag === "전체 대피소") {
                return (
                  <List
                    key={uuidv4()}
                    tag={categoryName}
                    data={data}
                    clickEvent={clickEvent}
                    setListName={setListName}
                  />
                );
              } else {
                return null;
              }
            })
          ) : dataArr && categoryName === "병원&약국" ? (
            dataArr.hospital.map((data, index) => (
              <List
                key={uuidv4()}
                tag={categoryName}
                data={data}
                clickEvent={clickEvent}
                setListName={setListName}
              />
            ))
          ) : dataArr && categoryName === "전체" ? (
            wholeData?.map((data, index) => (
              <List
                key={uuidv4()}
                tag={categoryName}
                data={data}
                clickEvent={clickEvent}
                setListName={setListName}
              />
            ))
          ) : dataArr && categoryName === "임시주거시설" ? (
            dataArr.shelter.map((data, index) => {
              if (data.tag === "임시주거시설") {
                return (
                  <List
                    key={uuidv4()}
                    tag={categoryName}
                    data={data}
                    clickEvent={clickEvent}
                    setListName={setListName}
                  />
                );
              } else {
                return null;
              }
            })
          ) : dataArr && categoryName === "지진 대피소" ? (
            dataArr.shelter.map((data, index) => {
              if (data.tag === "지진 대피소") {
                return (
                  <List
                    key={uuidv4()}
                    tag={categoryName}
                    data={data}
                    clickEvent={clickEvent}
                    setListName={setListName}
                  />
                );
              }
            })
          ) : (
            <p>주변에 {categoryName}(이)가 없습니다!</p>
          )}
        </ul>
      </ListWrap>
    </ContentsWrap>
  );
};

export default ListMenu;
