import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import {
  curLocationAtom,
  showDetailAtom,
  showSearchAtom,
} from "../../../recoil/atom";

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

interface IMapIcon {
  curPlace: number[] | undefined;
  clickEvent: any;
  nowPlace: any;
}

const MapIcon = ({ curPlace, clickEvent, nowPlace }: IMapIcon) => {
  const [showNow, setShowNow] = useState(false);
  const setShowDetail = useSetRecoilState(showDetailAtom);
  const setShowSearch = useSetRecoilState(showSearchAtom);
  const curLocation = useRecoilValue(curLocationAtom);

  return (
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
              <span>경도(x) </span>
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
          <img src="assets/icon/my.svg" alt="내 위치" />
        </li>
      )}
      <li
        className="icon"
        onClick={() => {
          clickEvent([curLocation.latitude, curLocation.longitude]);
          setShowDetail(false);
        }}
      >
        <img src="assets/icon/reset.svg" alt="내위치" />
      </li>
      <li
        className="icon"
        onClick={() => {
          setShowSearch(true);
        }}
      >
        <img src="assets/icon/search.svg" alt="검색" />
      </li>
      <li className="icon" onClick={nowPlace}>
        <img src="assets/icon/icon_reset.png" alt="현위치에서찾기" />
      </li>
    </IconWrap>
  );
};

export default MapIcon;
