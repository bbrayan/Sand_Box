import React from 'react';

import './Board.css';


const Board = () =>{

    //using hooks for inputs
    return (
        <div className="container">
                <div className="colorPickerContainer">
                    <input type="color"></input>
                </div>
                <div className="boardContainer">
                    <canvas className="board" id="board"></canvas>
                </div>
        </div>
    )
}

export default Board;