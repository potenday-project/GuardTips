import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const SideBtnWrap = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  li {
    width: 112px;
    height: 110px;
    margin-right: 16px;
    border: dashed 1px;
    padding: 1rem 0;
    transform: translate(0, 0);
    flex: 0 0 auto;
  }
`;

interface ISideBtn {
  sideData: { [key: string]: string }[];
  name: string;
}

const SideBtn = ({ sideData, name }: ISideBtn) => {
  const navigate = useNavigate();
  const onClick = (x: string) => {
    navigate(`/${name}`, { state: x });
  };
  return (
    <SideBtnWrap>
      {sideData.map((x) => {
        return (
          <li key={x.name} onClick={() => onClick(x.name)}>
            {x.name}
          </li>
        );
      })}
    </SideBtnWrap>
  );
};

export default SideBtn;
