import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useFunctions, FirebaseAppProvider, useFirebaseApp } from 'reactfire'
import 'firebase/functions'



function App() {


  const helloWorldFunction = useFirebaseApp().functions().httpsCallable('helloWorld')

  helloWorldFunction()
  .then(result => {
    console.log(result)
  })
  .catch(e => {
    console.log(e)
  })

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload. aifdubsioubfriugb
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
  );
}

export default App;
