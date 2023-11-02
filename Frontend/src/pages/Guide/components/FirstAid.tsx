import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const FirstAidWrap = styled.div`
  margin-top: 32px;
  height: 810px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const FirstAidList = styled.ul`
  height: 100%;
  margin-bottom: 350px;
  li {
    width: 100%;
    height: 82px;
    border-radius: 20px;
    border: 1px solid var(--G_03, #d9d9d9);
    box-sizing: border-box;
    background: var(--W_00, #fff);
    display: flex;
    align-items: center;

    margin-bottom: 8px;
    position: relative;
    padding: 20px;
    p {
      letter-spacing: -0.4px;
      font: 600 20px "Pretendard";
      margin-left: 8px;
    }
    div {
      width: 31px;
      height: 31px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
  li::after {
    content: "";
    width: 18px;
    height: 18px;
    background: url("assets/icon/icon_S_ arrow.png") no-repeat;
    background-size: contain;
    position: absolute;
    right: 20px;
    top: 30px;
  }
`;

const FirstAid = () => {
  const navigate = useNavigate();
  const onClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const {
      currentTarget: { innerText },
    } = e;
    navigate(`/guide/firstaid/${innerText}`, { state: innerText });
  };
  const mockData = [
    "심폐소생술(CPR)",
    "자동심장충격(AED)",
    "기도폐쇄",
    "지혈처치",
    "절단상 처치",
    "코피 처치",
    "화상 처치",
    "뱀 물림",
    "설사약 제조(ORS)",
  ];

  return (
    <FirstAidWrap>
      <FirstAidList>
        {mockData.map((x) => {
          return (
            <li
              key={x}
              onClick={(e) => {
                onClick(e);
              }}
            >
              <div>
                <img src="assets/icon/plus.png" alt="plus" />
              </div>
              <p>{x}</p>
            </li>
          );
        })}
      </FirstAidList>
    </FirstAidWrap>
  );
};

export default FirstAid;
