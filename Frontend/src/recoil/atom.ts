import { atom } from "recoil";

interface IData {
  order: number;
  name: string;
  address: string;
  code: number[];
  type: string;
  detail?: { [key: string]: string };
}

export const dataArrAtom = atom<IData[]>({
  key: `dataArr`,
  default: [
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
  ],
});

export const categoryNameAtom = atom({
  key: `categoryName`,
  default: "전체",
});

export const showDetailAtom = atom({
  key: `showDetail`,
  default: false,
});

export const listNameAtom = atom({
  key: `listName`,
  default: "",
});

export const showSearchAtom = atom({
  key: `showSearch`,
  default: false,
});

export const curLocationAtom = atom({
  key: `curLocation`,
  default: { latitude: 0, longitude: 0 },
});
