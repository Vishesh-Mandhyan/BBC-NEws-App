import React  from "react";
import spinner from "./Hourglass.gif";

const Loading =()=> {
    return (
      <div className="text-center">
        <img className="my-3" src={spinner} alt="loading" />
      </div>
    );
  
}

export default Loading;
