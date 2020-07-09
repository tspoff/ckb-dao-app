import React from "react";
import styled from "styled-components";
import { shortenAddress } from "src/ckb-helpers/utils";
import Identicon from "./common/Identicon";
import { CenteredCol } from "./common/Grid";

const Wrapper = styled.div`
  width: 150px;
  background: var(--content-background);
  padding: 0px 5px;
  border-radius: 10px;
  border: 1px solid var(--content-border);
  display: flex;
  justify-content: space-between;
`;

const AddressPillbox = (props) => {
  return (
    <Wrapper onClick={props.onClick}>
          <CenteredCol size={2}>
            <Identicon value={props.address} />
          </CenteredCol>
          <CenteredCol size={4}>
            <p>{shortenAddress(props.address)}</p>
          </CenteredCol>
    </Wrapper>
  );
};
export default AddressPillbox;
