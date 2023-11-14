import styled from "styled-components";
import { IData } from "../Map";
import CopyClipBoard from "../../../components/CopyClipBoard";
import { v4 as uuidv4 } from "uuid";

interface IListColor {
  color: string;
}

const ListItem = styled.li<IListColor>`
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
      props.color === "전체 대피소" ||
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

interface IList {
  data:
    | {
        address: string;
        distance: number;
        facility: string;
        gu: string;
        latitude: number;
        longitude: number;
        scale?: string;
        si: string;
        tag: string;
        title: string;
      }
    | {
        [key: string]: string | number;
        tag: string;
        title: string;
        address: string;
      };
  tag: string;
  clickEvent: any;
  setListName: any;
}

export default function List({ data, tag, clickEvent, setListName }: IList) {
  return (
    <ListItem
      key={`${data.title}-${tag}${uuidv4()}`}
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
    </ListItem>
  );
}
