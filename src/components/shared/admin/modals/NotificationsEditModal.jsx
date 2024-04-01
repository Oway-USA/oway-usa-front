import React, { useState } from "react";
import s from "@/styles/admin/Modal.module.scss";
import Modal from "@/components/shared/Modal";
import useNotification from "../../../../hooks/admin/useNotification";

export default function NotificationsEditModal({ isOpen, onClose, notification }) {
    const [title, setTitle] = useState(notification?.title || "");
    const [description, setDescription] = useState(notification?.description || "");
    const [icon, setIcon] = useState(null);
    const [previewImage, setPreviewImage] = useState(notification?.icon || null);

    const { updateNotification } = useNotification();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            if (icon) {
                formData.append("icon", icon);
            }

            await updateNotification(notification.id, formData);
            onClose(); // Close the modal after successful update
        } catch (error) {
            console.error("Error updating notification:", error);
        }
    };

    const handleDeleteImage = () => {
        setIcon(null);
        setPreviewImage(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setIcon(file);

        // Preview the image
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className={s.modal}>

            <Modal isOpen={isOpen} onClose={onClose}>
                <h3>Редактировать уведомление</h3>
                <form onSubmit={handleSubmit} className={s.notifications_form}>
                    <div>
                        <label htmlFor="">Заголовок</label>
                        <input
                            type="text"
                            placeholder="Введите заголовок"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="">Описание</label>
                        <input
                            type="text"
                            placeholder="Добавьте описание"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="">Картинка</label>
                        <div className={s.image_container}>
                            {previewImage && <img width={80} height={80} src={previewImage} alt="Preview" />}
                            <input type="file" onChange={handleImageChange} />
                            {previewImage && (
                                <button type="button" onClick={handleDeleteImage}>
                                    Удалить изображение
                                </button>
                            )}
                        </div>
                    </div>
                    <p>
                        Формат PNG, JPEG, JPG | Максимальный размер файла 5 МБ | 512x512
                    </p>
                    <div className={s.btn_center}>
                        <button type="submit" onClick={handleSubmit} className={s.submit_btn}>
                            Сохранить изменения
                        </button>
                    </div>
                </form>
            </Modal>
        </div>

    );
}
