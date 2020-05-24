import React, { useState } from 'react';
import './App.css';
import logo from './logo.svg';
import DoomsDay from './doomsday/doomsday';
import DoomsDayReference from './doomsday/doomsday-reference';

const App = () => {
  const [state, setState] = useState({ isSideNavCollapsed: true, date: new Date() })
  const setDate = (date) => setState({ ...state, ...{ date } })
  const setIsSideNavCollapsed = (isSideNavCollapsed) => setState({ ...state, ...{ isSideNavCollapsed } })
  return (
    <div className="app">
      <SideNav title={"Doomsday Algorithm Steps"} setIsSideNavCollapsed={setIsSideNavCollapsed}>
        <DoomsDayReference date={state.date} />
      </SideNav>
      <div className={`main-content ${state.isSideNavCollapsed ? "side-nav-collapsed" : ""}`}>
        <DoomsDay updateDate={setDate} date={state.date} />
        <div className="footer">
          Reference: <a href="https://firstsundaydoomsday.blogspot.com/2011/01/learn-by-example.html">firstsundaydoomsday: Bob Goddard</a>
        </div>
      </div>
    </div>
  );
}

// TODO: Make this it's own component
const SideNav = (props) => {
  const [state, setState] = useState({
    isSideNavCollapsed: true,
    isExpanderVisible: false,
    floatingButtonX: 0,
    floatingButtonY: 0
  })

  const onExpanderOver = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setState({ ...state, ...{ isExpanderVisible: true } })
  }

  const onExpanderMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setState({ ...state, ...{ floatingButtonX: event.clientX + 10, floatingButtonY: event.clientY - 10 } })
  }

  const onExpanderOut = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setState({ ...state, ...{ isExpanderVisible: false } })
  }

  const toggleSideNav = (event) => {
    setState({ ...state, ...{ isSideNavCollapsed: !state.isSideNavCollapsed } })
    props.setIsSideNavCollapsed(!state.isSideNavCollapsed)
  }

  const floatingButton = (
    <button style={{
      borderRadius: "100%",
      position: "absolute",
      animation: "1s expand",
      transition: "0.5s transform",
      transform: `${state.isExpanderVisible ? "scale(1.0)" : "scale(0)"}`,
      border: "none",
      color: "white",
      zIndex: -1,
      boxShadow: `${state.isExpanderVisible ? "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)" : "none"}`,
      backgroundColor: `${state.isExpanderVisible ? "#522fad" : "transparent"}`,
      top: `${state.floatingButtonY}px`,
      left: `${state.floatingButtonX}px`,
      height: "30px",
      width: "30px",
    }}>
      {state.isExpanderVisible ? state.isSideNavCollapsed ? ">" : "<  " : ""}
    </button>
  )

  return (
    <div className={`side-nav ${state.isSideNavCollapsed ? "collapsed" : ""}`}>
      <div className="side-nav-content">
        <div onClick={toggleSideNav} className="side-nav-header">
          <img src={logo} className="app-logo" alt="logo" />
          <span className="side-nav-title">{props.title}</span>
        </div>
        {state.isSideNavCollapsed ? "" : props.children}
      </div>
      {floatingButton}
      <div onClick={toggleSideNav} onMouseMove={onExpanderMove} onMouseOver={onExpanderOver} onMouseOut={onExpanderOut} className={`side-nav-expander ${state.isExpanderVisible ? "show" : ""}`}></div>
    </div >
  )
}

export default App;
