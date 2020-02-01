import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { FirebaseAppProvider, SuspenseWithPerf } from 'reactfire'
import 'firebase/performance'

const firebaseConfig = {
    apiKey: "AIzaSyBkw-TlISFpDhrRn03-sc_B4xRWWoG0cOk",
    authDomain: "stream-share-react.firebaseapp.com",
    databaseURL: "https://stream-share-react.firebaseio.com",
    projectId: "stream-share-react",
    storageBucket: "stream-share-react.appspot.com",
    messagingSenderId: "305783609456",
    appId: "1:305783609456:web:fc34c53a2c8d8889a97cb5"
  };

ReactDOM.render(
    <FirebaseAppProvider firebaseConfig={firebaseConfig} initPerformance>
        <SuspenseWithPerf fallback={'Laoding...'} traceId={'loader'}>
        <App />
        </SuspenseWithPerf>
    </FirebaseAppProvider>, 
document.getElementById('root'))
;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
