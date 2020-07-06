import React from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: ${props => props.visible ? `block` : `none`};
`;

const ModalBody = styled.section`
    position:fixed;
    background: white;
    width: 80%;
    height: auto;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
`;

const Modal = ({ onDismiss, visible, children }) => {
    return (
      <ModalContainer visible={visible}>
        <ModalBody>
          {children}
          <button onClick={onDismiss}>Close</button>
        </ModalBody>
      </ModalContainer>
    );
  };

  export default Modal;