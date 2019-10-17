import React from 'react';
import logo from './logo.svg';
import { CardGrid } from './components/grid/index.js';
import './App.css';

function App() {
    return (
        <div className="App">
        <header className="App-header">
            <CardGrid/>
        </header>
        <footer/>
        </div>
    );
}

export default App;
