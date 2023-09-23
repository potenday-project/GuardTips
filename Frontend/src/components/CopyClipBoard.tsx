interface ICopyClipBoard {
  text: string;
}

const CopyClipBoard = ({ text }: ICopyClipBoard) => {
  const handleCopyClipBoard = async (copyText: string) => {
    try {
      await navigator.clipboard.writeText(copyText);
      alert("복사 성공!");
    } catch (error) {
      alert("복사 실패!");
    }
  };
  return (
    <span
      style={{
        width: "15px",
        height: "17px",
        display: "inline-block",
        marginLeft: "3px",
      }}
      onClick={(e) => {
        e.stopPropagation();
        handleCopyClipBoard(text);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
      >
        <rect
          x="0.4"
          y="0.4"
          width="9"
          height="9"
          rx="1.6"
          stroke="#056FE7"
          strokeWidth="0.8"
        />
        <rect
          x="4.6"
          y="4.59995"
          width="9"
          height="9"
          rx="1.6"
          fill="white"
          stroke="#056FE7"
          strokeWidth="0.8"
        />
      </svg>
    </span>
  );
};

export default CopyClipBoard;
