import React from 'react'
import gendo from '../../img/Gendo.png';
import Resizer from '../Resizer/Resizer';
import { AiOutlinePaperClip } from 'react-icons/ai';
import style from './chat.module.css'

function Chat({ username, room, messages, setShow, handleSendMessage, inputValue, setInputValue, setPreviewUrl, handleDisconnect }) {

    return (
        <div className={style.main__chat}>
            <img className={style.logo__icon} src={gendo} alt='' />
            <div className={style.center}>

                <div>
                    <div className={style.logo}>
                        <h2>FarenyMessage</h2>
                    </div>
                    <div className={style.message__form}>
                        <input
                            className={style.message__input}
                            placeholder="Ваше сообщение!"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            type="text"
                        />
                        <div className={style.file__input__container}>
                            <label htmlFor="file-input" className={style.file__input__label}>
                                <AiOutlinePaperClip />
                            </label>
                            <input
                                id="file-input"
                                type="file"
                                onChange={(e) => Resizer(e, 1920, 1080, setPreviewUrl)}
                            />
                        </div>
                        <div className={style.btn__wrapper}>
                            <button onClick={handleSendMessage} className={style.glow__on__hover}>
                                Отправить
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <label className={style.welcome__chat}>Добро пожаловать в канал {room} !</label>
            <div id='message-area' className={style.message__area}>

                {messages.map((mess) => (
                    <div className={mess.username === username && mess.event === 'message' ? style.my__message : style.other__message} key={mess.id}>
                        {mess.event === 'connection' ? (
                            <div className={style.connect__message}>Пользователь {mess.username} подключился!</div>

                        ) : mess.event === 'close' ? (

                            <div className={style.connect__message}>Пользователь {mess.username} отключился!</div>

                        ) : <div className={style.wrap__message}>
                            {mess.photo && <img className={style.message__photo} onClick={() => Resizer(mess.photo, 1920, 1080, setShow)} src={mess.photo} alt="Фото пользователя" />}
                            <div className={style.message}>{mess.username}: {mess.message}</div>
                        </div>
                        }
                    </div>
                ))}
            </div>
            <button className={style.exit__chat} onClick={() => handleDisconnect()}>Выйти</button>
        </div >
    )
}

export default Chat