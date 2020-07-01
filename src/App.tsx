import React from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import logo from "./logo.svg";
import "./App.css";
import ProposalFeed from "./components/proposal/ProposalFeed";
import CreateProposalForm from "./components/CreateProposalForm";
import Header from "./components/Header";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

function App() {
  return (
    <div className="App">
      <div className="app-shell">
        <Header />
        <Container>
          <HashRouter>
            <Switch>
              <Route path="/create" component={CreateProposalForm} />
              <Route path="/feed" component={ProposalFeed} />
              <Redirect from="/" to="/feed" />
            </Switch>
          </HashRouter>
        </Container>
      </div>
    </div>
  );
}

export default App;
