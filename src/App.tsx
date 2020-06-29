import React from "react";
import styled from "styled-components";
import logo from "./logo.svg";
import "./App.css";
import WalletInfo from "./components/WalletInfo";

const PageContainer = styled.div``;

function App() {
  return (
    <div className="App">
      <PageContainer>
        <WalletInfo />
      </PageContainer>
    </div>
  );
}

export default App;
