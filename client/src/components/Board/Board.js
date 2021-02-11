import React, {useEffect, useState, useRef} from 'react';

import './Board.css';


const Board = ({ color, size, setColor, setSize }) =>{
    //example of refrence keep track of refrence to elements or any kind of information really
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const boardContainerRef = useRef(null);

    useEffect(() =>{
        const canvas = canvasRef.current;
        canvas.width = parseInt(getComputedStyle(boardContainerRef.current).getPropertyValue('width'));
        canvas.height = parseInt(getComputedStyle(boardContainerRef.current).getPropertyValue('height'));

        const context =canvas.getContext("2d");
        context.lineWidth = size;
        context.lineJoin = 'round';
        context.lineCap = 'round';
        context.strokeStyle = color;
        contextRef.current = context;
    }, [])
    
    const startDrawing  = () =>{
        contextRef.current.beginPath();

    }
    const finishDrawing  = () =>{
        
    }
    const draw = () =>{

    }
    
    //using hooks for inputs
    return (
        <div className="container">
                <div className="colorPickerContainer">
                    <input type="color"
                    value={color}
                    onChange={(event) => setColor(event.target.value)}
                    ></input>
                </div>
                <div className="boardContainer" id="boardContainer" ref={boardContainerRef}>
                    <canvas className="board" id="board"
                        ref={canvasRef}
                        onMouseDown={startDrawing}
                        onMouseUp={finishDrawing}
                        oneMouseMove={draw}
                    ></canvas>
                </div>
        </div>
    )
}

export default Board;