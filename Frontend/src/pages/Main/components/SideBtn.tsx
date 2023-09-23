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
    .imgWrap {
      width: 100%;
      height: 112px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: url("assets/folder.png") no-repeat;
      background-size: contain;
      div {
        width: 40px;
        height: 36px;
        margin-top: 10px;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
    div {
      position: relative;
      width: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    p {
      text-align: center;
      color: var(--G_01, #717175);
      font: 700 18px "Giants";
      margin-top: 12px;
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
            <div className="imgWrap">
              {/* <img src="assets/folder.png" alt="" /> */}
              <div>
                <img src={x.img} alt="" />
              </div>
            </div>
            <p>{x.name}</p>
          </li>
        );
      })}
    </SideBtnWrap>
  );
};

export default SideBtn;
