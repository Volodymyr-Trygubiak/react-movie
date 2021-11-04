import React, { useState, useEffect, useRef } from 'react';
import './modal.scss'

import { BiX } from "react-icons/bi"

const Modal = ({ active, id, children }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(active)
  }, [active])

  return (
    <div id={id} className={`modal ${isActive ? 'active' : ''}`}>
      {children}
    </div>
  )
}



export const ModalContent = ({ onClose, children }) => {
  const contentRef = useRef(null);

  const closeModal = () => {
    contentRef.current.parentNode.classList.remove('active');
    if (onClose) onClose();
  }

  return (
    <div ref={contentRef} className="modal__content">
      {children}
      <div className="modal__content__close" onClick={closeModal}>
        <BiX />
      </div>
    </div>
  )
}

export default Modal;
