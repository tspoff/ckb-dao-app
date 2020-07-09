import React from "react";
import styled from "styled-components";
import { formatBalance } from "src/ckb-helpers/formatters";

const Wrapper = styled.div``;

const CkbValue = (props) => {
  return <Wrapper>{formatBalance(props.amount)} CKB</Wrapper>;
};

export default CkbValue;
