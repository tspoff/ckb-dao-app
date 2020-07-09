import React from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import logo from "./logo.svg";
import "./App.css";
import ProposalFeed from "./components/proposal/ProposalFeed";
import CreateProposalForm from "./components/CreateProposalForm";
import Header from "./components/Header";
import WalletModal from "./components/WalletModal";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  margin: 0 auto;
`;

function App() {
  return (
    <div className="App">
      <div className="app-shell">
        <Header />
        <WalletModal/>
        <Container>
          <ContentWrapper>
          <HashRouter>
            <Switch>
              <Route path="/create" component={CreateProposalForm} />
              <Route path="/feed" component={ProposalFeed} />
              <Redirect from="/" to="/feed" />
            </Switch>
          </HashRouter>
          </ContentWrapper>
        </Container>
      </div>
    </div>
  );
}

export default App;
