import React from 'react'
import { IoMdClose } from "react-icons/io";
import './modalimg.css'

function ModalIMG({ previewUrl, handleSendMessage, inputValue, setInputValue, setPreviewUrl }) {
    return (
        <div className='modal__wrapper'>
            <div className='modal__photo'>

                <div className='modal__photo__preview' >
                    <img className='modal__photo__preview__img' src={previewUrl} alt='' />
                    <IoMdClose onClick={() => setPreviewUrl(null)} className='close__modal__btn' />
                    <input
                        className="modal__input"
                        placeholder="Ваше сообщение!"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        type="text"
                    />
                    <button className='send__btn' onClick={handleSendMessage}>Отправить</button>
                </div >

            </div>
        </div>
    )
}

export default ModalIMG