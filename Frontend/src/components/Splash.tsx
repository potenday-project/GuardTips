import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  let navigate = useNavigate();

  useEffect(() => {
    //Idle timer

    let timerId: any;

    const resetTimer = () => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        navigate("/");
      }, 30 * 1000); //30 sec idle time
    };

    document.addEventListener("keydown", resetTimer);
    document.addEventListener("mousemove", resetTimer);
    return () => {
      clearTimeout(timerId);
      document.removeEventListener("keydown", resetTimer);
      document.removeEventListener("mousemove", resetTimer);
    };
  }, []);
};
