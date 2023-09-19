import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const SideBtnWrap = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  li {
    width: 112px;
    margin-right: 16px;
    padding: 1rem 0;
    transform: translate(0, 0);
    flex: 0 0 auto;
    div {
      position: relative;
      width: 100%;
      border: dashed 1px;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    p {
      text-align: center;
    }
  }
`;

interface ISideBtn {
  sideData: { [key: string]: string }[];
  name: string;
}

const SideBtn = ({ sideData, name }: ISideBtn) => {
  const navigate = useNavigate();
  const onClick = (x: string) => {
    if (x.includes("출동차량")) {
      return;
    }
    navigate(`/${name}`, { state: x });
  };
  return (
    <SideBtnWrap>
      {sideData.map((x) => {
        return (
          <li key={x.name} onClick={() => onClick(x.name)}>
            <div>
              <img src="assets/folder.png" alt="" />
            </div>
            <p>{x.name}</p>
          </li>
        );
      })}
    </SideBtnWrap>
  );
};

export default SideBtn;
