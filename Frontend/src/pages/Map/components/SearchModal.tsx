import { useRecoilValue, useSetRecoilState } from "recoil";
import { showSearchAtom } from "../../../recoil/atom";
import { styled } from "styled-components";

const SearchModalWrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  .bg {
    background: rgba(52, 52, 52, 0.6);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .modal {
    width: 370px;
    height: 213px;
    padding: 30px;
    margin-top: 150px;
    flex-shrink: 0;
    border-radius: 12px;
    background: var(--W_00, #fff);
    z-index: 100;
  }
  .btnWrap {
    display: flex;
    justify-content: end;
    button {
      display: inline-flex;
      padding: 13px 34px;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      border: 0;
    }
    :nth-child(2) {
      background: var(--main, #056fe7);
      margin-left: 14px;
    }
  }
  h3 {
    color: #050505;
    letter-spacing: -0.44px;
    text-transform: uppercase;
    font: 700 22px "Giants";
    margin-bottom: 14px;
  }
  input {
    display: flex;
    width: 310px;
    padding: 13px 105px 13px 15px;
    align-items: center;
    gap: 8px;
    margin-bottom: 14px;
  }
`;
const SearchModal = () => {
  const setShowSearch = useSetRecoilState(showSearchAtom);
  return (
    <SearchModalWrap>
      <div
        className="bg"
        onClick={() => {
          setShowSearch(false);
        }}
      ></div>
      <div className="modal">
        <h3>검색</h3>
        <input type="text" placeholder="검색해주세요" />
        <div className="btnWrap">
          <button
            onClick={() => {
              setShowSearch(false);
            }}
          >
            취소
          </button>
          <button>검색</button>
        </div>
      </div>
    </SearchModalWrap>
  );
};

export default SearchModal;
