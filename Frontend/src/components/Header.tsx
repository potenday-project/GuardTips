import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const HeaderWrap = styled.section`
  background: #fbfbfc;
  box-shadow: 0px 16px 16px 0px rgba(0, 0, 0, 0.07);
  width: 100%;
  height: 70px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    position: absolute;
    left: 30px;
  }
  h2 {
    text-align: center;
    font-family: "Giants";
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

interface IHeader {
  title: string;
}

const Header = ({ title }: IHeader) => {
  let history = useNavigate();
  return (
    <HeaderWrap>
      <div
        onClick={() => {
          history(-1);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="22"
          viewBox="0 0 13 22"
          fill="none"
        >
          <path
            d="M11 20L2 11L11 2"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h2>{title}</h2>
    </HeaderWrap>
  );
};

export default Header;
