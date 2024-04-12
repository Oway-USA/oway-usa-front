import React from "react";
import s from "@/styles/partials/Map.module.scss";

const ModalMap = ({ stepId, title, onClose, description }) => {

    return (
        <div className={s.modal}>
            <span>{title}</span>
            <p>{description}</p>
        </div>
    );
}

export default ModalMap;
