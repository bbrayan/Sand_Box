import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';

import TextContainer from '../TextContainer/TextContainer';
import InfoBar from '../InforBar/InforBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import Board from '../Board//Board'
let socket;


const Chat = ({ location }) =>{
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [size, setSize] = useState('');
    const [color, setColor] = useState('#000000');
    const [ctxx, setCtxx] = useState(null);
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000'

    useEffect(() =>{
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT, {transports: ['websocket', 'polling', 'flashsocket']});
        
        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, () => {
           
        });

        return () =>{
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, location.search])
    //function to recieve messages
    useEffect(() => {
        socket.on('message', (message) => {
            setMessages(messages => [ ...messages, message ]);
            console.log(message);
        })

        socket.on("roomData", ({ users }) => {
            setUsers(users);
          });
    }, []) 
    // note reason for bug was that it would setup up a listener everytime a message was recieved [messages] to [] fixed it.

    //function for sending messages
    const sendMessage = (event) => {
        //prevent the page from refreshes
        console.log(message);
        event.preventDefault();
        if(message){
            socket.emit('sendMessage', message, () => setMessage(''));
        }

    }

    return (
        <div className="outerContainer">
         
                <Board size={size} color={color} ctx={ctxx} setColor={ setColor } setSize={ setSize } setCtx={ setCtxx }/>
 
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={ setMessage } sendMessage={ sendMessage } />
            </div>
            <div className="container"><TextContainer users={users}/></div>
        </div>
    )
}

export default Chat;