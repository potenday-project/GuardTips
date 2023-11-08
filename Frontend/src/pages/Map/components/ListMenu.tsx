import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  categoryNameAtom,
  dataArrAtom,
  listNameAtom,
  mapListShowAtom,
} from "../../../recoil/atom";
import CopyClipBoard from "../../../components/CopyClipBoard";
import { IData } from "../Map";

interface IList {
  color: string;
}

interface IShowMenu {
  isOpen: boolean;
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

const Icon = styled.div<{ isOpen: boolean }>`
  display: inline-block;
  transform-origin: 45% 65%;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : null)};
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
    width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: var(--Sub_01, var(--G_00, #000));
    font: 600 18px/24px "Pretendard";
  }
  p {
    width: 230px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
      props.color === "민방위대피소" ||
      props.color === "임시주거시설" ||
      props.color === "지진 대피소" ||
      props.color === "대피소" ||
      props.color === "지진옥외" ||
      props.color === "이재민 임시주거시설" ||
      props.color === "지진겸용 임시주거시설"
        ? `#056fe7 no-repeat url('${process.env.PUBLIC_URL}/assets/icon/exit.png')`
        : props.color === "급수시설"
        ? `#5EBBCB no-repeat url('${process.env.PUBLIC_URL}/assets/icon/drop.png')`
        : props.color === "병원"
        ? `#EF4AAD no-repeat url('${process.env.PUBLIC_URL}/assets/icon/hospital.png')`
        : props.color === "약국"
        ? `#7750E7 no-repeat url('${process.env.PUBLIC_URL}/assets/icon/medicine.png')`
        : null};
    background-position: center;
  }
  .copy {
    display: inline-block;
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
          <Icon isOpen={showMenu}>
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
          {dataArr && categoryName === "급수시설"
            ? dataArr.waterworks.map((data, index) => {
                return (
                  <List
                    key={`${data.title}-waterworks`}
                    color={data.tag}
                    onClick={(e) => {
                      clickEvent([data.latitude, data.longitude]);
                      setListName(data.title);
                    }}
                  >
                    <h3>{data.title}</h3>
                    <div className="addressWrap">
                      <p>{data.address}</p>
                      <CopyClipBoard text={data.address} />
                    </div>
                    <div className="label"></div>
                  </List>
                );
              })
            : dataArr && categoryName === "전체 대피소"
            ? dataArr.shelter.map((data, index) => {
                return (
                  <List
                    key={`${data.title}-shelter`}
                    color={data.tag.split(",")[0]}
                    onClick={(e) => {
                      clickEvent([data.latitude, data.longitude]);
                      setListName(data.title);
                    }}
                  >
                    <h3>{data.title}</h3>
                    <div className="addressWrap">
                      <p>{data.address}</p>
                      <CopyClipBoard text={data.address} />
                    </div>
                    <div className="label"></div>
                  </List>
                );
              })
            : dataArr && categoryName === "병원&약국"
            ? dataArr.hospital.map((data, index) => {
                return (
                  <List
                    key={`${data.title}-hospital`}
                    color={data.tag}
                    onClick={(e) => {
                      clickEvent([data.latitude, data.longitude]);
                      setListName(data.title);
                    }}
                  >
                    <h3>{data.title}</h3>
                    <div className="addressWrap">
                      <p>{data.address}</p>
                      <CopyClipBoard text={data.address} />
                    </div>

                    <div className="label"></div>
                  </List>
                );
              })
            : dataArr && categoryName === "전체"
            ? wholeData?.map((data, index) => {
                return (
                  <List
                    key={index}
                    color={data.tag.split(",")[0]}
                    onClick={(e) => {
                      clickEvent([data.latitude, data.longitude]);
                      setListName(data.title);
                    }}
                  >
                    <h3>{data.title}</h3>
                    <div className="addressWrap">
                      <p>{data.address}</p>
                      <CopyClipBoard text={data.address} />
                    </div>
                    <div className="label"></div>
                  </List>
                );
              })
            : null}
        </ul>
      </ListWrap>
    </ContentsWrap>
  );
};

export default ListMenu;
