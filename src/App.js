import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import Main from './Main';

class App extends React.Component {
constructor(props){
  super(props);
}
state = {

};
render() {
  return (
    <div className="App">
    <Main />
    </div>
  );
}
}
export default App;
