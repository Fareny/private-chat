import React, { useEffect, useRef, useState } from 'react';
import style from './websock.css';
import ModalIMG from './ModalIMG/ModalIMG';
import ShowModal from './ShowModal/ShowModal';
import EntryForm from './EntryForm/EntryForm';
import Chat from './Chat/Chat';

function WebSock() {
    const container = document.getElementById('message-area');
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState('');
    const [remember, setRemember] = useState(false);
    const [room, setRoom] = useState('');
    const [previewUrl, setPreviewUrl] = useState(null);
    const [show, setShow] = useState(null);

    const socket = useRef(null);

    useEffect(() => {
        const savedRoom = localStorage.getItem('room');
        if (savedRoom) {
            const data = JSON.parse(savedRoom);
            setUsername(data.username);
            setRoom(data.room);
            setRemember(data.checked);
        }
        autoScrollToBottom();
    }, [messages]);

    function autoScrollToBottom() {
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }

    const handleConnect = () => {
        if (username.length > 12 || username.length < 1) {
            return alert('Имя пользователя должно быть не меньше 1 и не больше 12 символов');
        }
        if (room.length > 12 || room.length < 1) {
            return alert('Название комнаты должно быть не меньше 1 и не больше 12 символов');
        }

        socket.current = new WebSocket('ws://localhost:5000');
        const data = { room, username, checked: remember };
        if (remember) {
            localStorage.setItem('room', JSON.stringify(data));
        } else {
            localStorage.removeItem('room');
        }

        socket.current.onopen = () => {
            setConnected(true);
            const connectionMessage = {
                event: 'connection',
                room,
                id: Date.now(),
                username,
            };
            socket.current.send(JSON.stringify(connectionMessage));
            setInputValue('');
        };

        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        socket.current.onclose = () => {
            const disconnectionMessage = {
                event: 'close',
                room,
                id: Date.now(),
                username,
            };
            socket.current.send(JSON.stringify(disconnectionMessage));
            setConnected(false);
        };

        socket.current.onerror = () => {
            console.log('error');
        };
    };

    const handleSendMessage = () => {
        if (inputValue.length === 0 && !previewUrl) {
            return;
        }

        const message = {
            event: 'message',
            room,
            id: Date.now(),
            username,
            message: inputValue,
            photo: previewUrl,
        };

        socket.current.send(JSON.stringify(message));
        setInputValue('');
        setPreviewUrl(null);
    };

    const handleDisconnect = () => {
        const disconnectionMessage = {
            event: 'close',
            room,
            id: Date.now(),
            username,
        };
        socket.current.send(JSON.stringify(disconnectionMessage));
        setConnected(false);
        setMessages([]);
        socket.current.close();
    };

    const entryFormProps = {
        username,
        setUsername,
        room,
        setRoom,
        remember,
        setRemember,
        handleConnect,
    };

    const chatProps = {
        inputValue,
        setInputValue,
        setPreviewUrl,
        handleSendMessage,
        room,
        messages,
        username,
        setShow,
        handleDisconnect,
    };

    const modalProps = {
        setShow,
        show,
    };

    const modalImgProps = {
        previewUrl,
        setPreviewUrl,
        setInputValue,
        inputValue,
        handleSendMessage,
    };

    if (!connected) {
        return <EntryForm {...entryFormProps} />;
    }

    return (
        <div className={style.main__chat__wrapper}>
            <Chat {...chatProps} />

            {show && <ShowModal {...modalProps} />}

            {previewUrl && <ModalIMG {...modalImgProps} />}
        </div>
    );
}

export default WebSock;
