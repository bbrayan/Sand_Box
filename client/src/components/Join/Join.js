import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css';
import sandBox from '../../icons/sandcastle.png';

const Join = () =>{
    //example of react hooks
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    //using hooks for inputs
    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Sand Castle</h1>
                <img src={sandBox} alt="Sand Castle" className="sandCastle" />
                <div >
                <h1 className="heading">Join</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
                <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
                <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>
            </div>
            </div>
        </div>
    )
}

export default Join;