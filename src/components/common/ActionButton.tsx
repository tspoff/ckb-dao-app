import React from "react";
import styled from "styled-components";

const Button = styled.button`
    background-color: var(--content-background);
    color: var(--content-primary-text);
    border: 1px solid var(--content-border);
    border-radius: 5px;
    padding: 10px;
    margin: 5px;
    font-size: 14px;
    :hover {
        background-color: var(--input-hover-border);
    }
`;
const ActionButton = (props) => {
  const { children, onClick } = props;

  return (
        <Button onClick={onClick}> 
            {children}
        </Button>
  );
};

export default ActionButton;
