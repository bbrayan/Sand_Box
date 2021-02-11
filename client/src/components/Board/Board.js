import React, {useEffect} from 'react';

import './Board.css';


const Board = ({ color, size, ctxx, setColor, setSize, setCtxx }) =>{


    useEffect(() => {
       drawOnCanvas();
    },[color]) 

    const drawOnCanvas = (() => {
        var canvas = document.querySelector('#board');
        var ctx = canvas.getContext('2d');
       

        var sketch = document.querySelector('#boardContainer');
        var sketch_style = getComputedStyle(sketch);
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));

        var mouse = {x: 0, y: 0};
        var last_mouse = {x: 0, y: 0};

        /* Mouse Capturing Work */
        canvas.addEventListener('mousemove', function(e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;

            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        }, false);


        /* Drawing on Paint App */
        ctx.lineWidth = size;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = color;

        canvas.addEventListener('mousedown', function(e) {
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);

        canvas.addEventListener('mouseup', function() {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);

        var root = this;
        var onPaint = function() {
            ctx.beginPath();
            ctx.moveTo(last_mouse.x, last_mouse.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.closePath();
            ctx.stroke();

            //if(root.timeout != undefined) clearTimeout(root.timeout);
            //root.timeout = setTimeout(function(){
                //var base64ImageData = canvas.toDataURL("image/png");
                //root.socket.emit("canvas-data", base64ImageData);
            //}, 1000)
        };
    })
    //using hooks for inputs
    return (
        <div className="container">
                <div className="colorPickerContainer">
                    <input type="color"
                    value={color}
                    onChange={(event) => setColor(event.target.value)}
                    ></input>
                </div>
                <div className="boardContainer" id="boardContainer">
                    <canvas className="board" id="board"></canvas>
                </div>
        </div>
    )
}

export default Board;