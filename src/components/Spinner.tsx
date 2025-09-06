import React from "react";
import { BarLoader } from "react-spinners";

export const Spinner = () => {
  return (
    <React.Fragment>
      <div style={{ display: "flex" }}>
        <BarLoader color="#2196F3" width={150} />
      </div>
    </React.Fragment>
  );
};
