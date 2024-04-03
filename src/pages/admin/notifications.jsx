import React, { useState } from "react";
import s from "@/styles/pages/admin/AdminNotificationsPage.module.scss";
import useNotification from "../../hooks/admin/useNotification";
import NotificationsEditModal from "../../components/shared/admin/modals/NotificationsEditModal";

export default function AdminNotificationPage() {
  const { products, deleteNotification, updateNotification, isLoading } =
    useNotification();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (productId) => {
    try {
      await deleteNotification(productId);
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const handleUpdate = async (productId) => {
    try {
      setSelectedNotification(
        products.find((product) => product.id === productId)
      );
      setIsEditing(true);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  const toggleModal = (isOpen) => {
    setIsModalOpen(isOpen);
    if (!isOpen) {
      setIsEditing(false);
      setSelectedNotification(null);
    }
  };
  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <main className={s.noti_page}>
      {products.map((product, index) => (
        <div key={index} className={s.notification}>
          <img src={product.icon} alt="" />
          <div className={s.text}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
          </div>
          <div>
            <button onClick={() => handleDelete(product.id)}>
              <img src="/assets/icons/delete.svg" alt="" />
            </button>
            <button
              className={s.button}
              onClick={() => handleUpdate(product.id)}
            >
              <img src="/assets/icons/edit.svg" alt="" />
            </button>
          </div>
        </div>
      ))}
      {isEditing && (
        <NotificationsEditModal
          onUpdate={(formData) => {
            updateNotification(selectedNotification.id, formData);
            toggleModal(false);
          }}
          isOpen={isModalOpen}
          onClose={() => toggleModal(false)}
          notification={selectedNotification}
        />
      )}
    </main>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.accessToken;

  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return { props: {} };
}
