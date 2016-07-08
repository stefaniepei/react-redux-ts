import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import Demo from './components/app/demo';

const node = document.getElementById('app');
ReactDOM.render(<App name="React"/>, node);

const demoNode = document.getElementById('demo');
ReactDOM.render(<Demo />,demoNode);
