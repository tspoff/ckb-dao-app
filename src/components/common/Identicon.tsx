import React from "react";
import styled from "styled-components";
import { Hashicon } from "@emeraldpay/hashicon-react";

const Identicon = (props) => {
  return <Hashicon value={props.value} size={30} />;
};

export default Identicon;
