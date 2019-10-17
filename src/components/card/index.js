import React from 'react';
import './style.css';

export function Card(props) {
    return (
        <div className="card" onClick={props.onClick}>
            <img src={props.img}></img>
        </div>
    )
}