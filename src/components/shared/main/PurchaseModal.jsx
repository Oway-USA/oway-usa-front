import React from "react";
import s from "@/styles/shared/main/PurchaseModal.module.scss";
import { RxCross2 } from "react-icons/rx";

const PurchaseModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    window.location.reload();
  };

  return (
    <div className={s.modal_overlay} onClick={onClose}>
      <div className={s.modal_content} onClick={(e) => e.stopPropagation()}>
        <div className={s.modal_header}>
          <h3>Ваша заявка на выкуп принята!</h3>
          <div className={s.btn_center}>
            <button onClick={handleClose} className={s.close_btn}>
              <RxCross2 size={20} />
            </button>
          </div>
        </div>

        <div>
          <p>
            Уважаемый клиент ваша заявка принята, ожидайте обратную связь в
            течении 6 часов.
          </p>
          <div className={s.btn}>
            <button className={s.button} onClick={handleClose}>
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
