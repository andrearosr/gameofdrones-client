import React from 'react';
import { RoutedTabs, NavTab } from 'react-router-tabs';

const Layout = ({ children }) => {
  return (
    <div className="container">
      <header>
        <h1 className="title-font page-title">Game of Drones</h1>
      </header>
      <div className="content">
        <div className="box">
          <RoutedTabs className="tabbar" activeTabClassName="activeTab">
            <NavTab to="/game" className="tab tab-left">Game</NavTab>
            <NavTab to="/scoreboard" className="tab tab-right">Scoreboard</NavTab>
          </RoutedTabs>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
