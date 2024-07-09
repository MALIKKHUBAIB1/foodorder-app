import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

function Modal({ children, open, className = "", onClose }) {
  const dialog = useRef(null);
  // const modal = dialog.current;
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    }
    return () => dialog.current.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;
