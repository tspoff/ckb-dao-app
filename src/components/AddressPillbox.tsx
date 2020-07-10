import React from "react";
import styled from "styled-components";
import AddressView from "./AddressView";

const Wrapper = styled.div`
  background: var(--content-background);
  padding: 0px 10px;
  border-radius: 10px;
  border: 1px solid var(--content-border);
  display: flex;
  justify-content: space-between;
`;

const AddressPillbox = (props) => {
  return (
    <Wrapper onClick={props.onClick}>
          <AddressView shorten address={props.address}/>
    </Wrapper>
  );
};
export default AddressPillbox;
