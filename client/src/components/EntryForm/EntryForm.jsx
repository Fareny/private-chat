import React from 'react'
import gendo from '../../img/Gendo.png';
import style from './entryform.module.css';

function EntryForm({ username, setUsername, room, setRoom, setRemember, handleConnect, remember }) {
    return (
        <div className={style.username__form}>

            <img className={style.logo__icon} src={gendo} alt='' />
            <div className={style.logo}>
                <h2>FarenyMessage</h2>
            </div>
            <div className={style.form}>
                <div className={style.input__area}>
                    <input
                        className={style.input}
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Введите ваше имя"
                    />
                    <input
                        className={style.input}
                        type="text"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                        placeholder="Введите айди комнаты"
                    />
                </div>
                <div className={style.btn__wrapper}>
                    <button onClick={handleConnect} className={style.glow__on__hover}>
                        Войти
                    </button>
                    <div onClick={() => setRemember(!remember)} className={style.remember__wrapper}>
                        <label className={style.remember__text}>Запомнить комнату</label>
                        <input
                            className="remember-checkbox"
                            type="checkbox"
                            checked={remember}
                            onChange={() => setRemember(!remember)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EntryForm