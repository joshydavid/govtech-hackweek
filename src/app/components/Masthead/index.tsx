"use client";

import SgdsMasthead from "@govtechsg/sgds-web-component/react/masthead/index.js";

const Masthead = () => {
  return (
    <div className="fixed z-20 w-screen">
      <SgdsMasthead fluid={true}></SgdsMasthead>
    </div>
  );
};

export default Masthead;
