import React from 'react'
import { IoMdClose } from "react-icons/io";

function ShowModal({ setShow, show }) {
    return (
        <div className='modal__wrapper'>
            <div className='modal__photo'>

                <div className='modal__photo__preview' >
                    <img className='modal__photo__preview__img' src={show} alt='' />
                    <IoMdClose onClick={() => setShow(null)} className='close__modal__btn' />
                </div >

            </div>
        </div>
    )
}

export default ShowModal