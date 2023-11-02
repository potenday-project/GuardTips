import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface IHeaderStyle {
  $istitledisplay?: boolean;
}

const HeaderWrap = styled.section<IHeaderStyle>`
  background: #fbfbfc;
  box-shadow: ${(props) =>
    props.$istitledisplay ? "0px 16px 16px 0px rgba(0, 0, 0, 0.07)" : null};
  width: 100%;
  height: 70px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
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
  const [istitledisplay, setTitleDisplay] = useState(true);
  useEffect(() => {
    if (title === "") {
      setTitleDisplay(false);
    }
  }, []);
  let history = useNavigate();
  return (
    <HeaderWrap $istitledisplay={istitledisplay}>
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

      <h2>{istitledisplay ? title : null}</h2>
    </HeaderWrap>
  );
};

export default Header;
