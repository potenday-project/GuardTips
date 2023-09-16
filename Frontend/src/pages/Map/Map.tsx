import Header from "../../components/Header";
import { useLocation } from "react-router-dom";

const Map = () => {
  const location = useLocation();
  const enterName = location.state;

  console.log(enterName);

  return (
    <div>
      <Header title={"지도"} />
    </div>
  );
};

export default Map;
