import React, { useState } from "react";
import s from "@/styles/admin/Modal.module.scss";
import c from "@/styles/admin/WarehouseProductsModal.module.scss";
import ImageModal from "../ImageModal";

const InputField = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) => (
  <div className={c.input}>
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      name={id}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default function Step1({
  formData,
  handleChange,
  handleImageChange,
  nextStep,
  currentStep,
  setCurrentStep,
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const country_of_origin = [
    { id: 3, name: "CША" },
    { id: 4, name: "Турция" },
  ];
  const country_of_destination = [
    { id: 3, name: "CША" },
    { id: 4, name: "Турция" },
  ];
  const handleSelectChange1 = (e) => {
    const newSelectedId = e.target.value;
    handleChange({
      target: { name: "country_of_origin", value: newSelectedId },
    });
  };
  const handleImageSelect = (e) => {
    handleImageChange(e);
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
  };
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSelectChange2 = (e) => {
    const newSelectedId2 = e.target.value;
    handleChange({
      target: { name: "country_of_destination", value: newSelectedId2 },
    });
  };

  return (
    <div className={c.step}>
      <div className={c.steps_progress}>
        <div className={c.line}></div>
        <button
          type="button"
          className={currentStep >= 1 ? `${c.active_step}` : ""}
          onClick={() => setCurrentStep(1)}
        >
          1
        </button>
        <div className={c.line}></div>
        <button
          type="button"
          className={currentStep >= 2 ? `${c.active_step}` : ""}
          onClick={() => setCurrentStep(2)}
        >
          2
        </button>
        <div className={c.line}></div>
        <button
          type="button"
          className={currentStep >= 3 ? `${c.active_step}` : ""}
          onClick={() => setCurrentStep(3)}
        >
          3
        </button>
        <div className={c.line}></div>
      </div>
      <form action="" className={s.step_form}>
        <div className={c.first_block}>
          <InputField
            id="name"
            label="Название посылки"
            value={formData.name}
            onChange={handleChange}
            placeholder="Введите название посылки"
          />
          <div className={c.input}>
            <label htmlFor="image">Фото посылки</label>
            <label className="custom-file-upload">
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleImageSelect}
              />
              <img src="/assets/icons/selectimg.svg" alt="select img" />
              <span>Выбрать картинку</span>
            </label>
            {selectedImage && (
              <button type="button" onClick={openModal}>
                Посмотреть картинку
              </button>
            )}
          </div>

          <div className={c.flex}>
            <div className={c.input}>
              <label htmlFor="country_of_origin">Страна отправки</label>
              <select
                id="country_of_origin"
                name="country_of_origin"
                value={formData.country_of_origin || ""}
                onChange={handleSelectChange1}
                className={c.select}
              >
                <option value="">Выберите страну</option>
                {country_of_origin.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={c.input}>
              <label htmlFor="country_of_destination">Страна прибытия</label>
              <select
                id="country_of_destination"
                name="country_of_destination"
                value={formData?.country_of_destination}
                onChange={handleSelectChange2}
                className={c.select}
              >
                <option value="">Выберите страну</option>
                {country_of_destination.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={c.flex}>
            <InputField
              id="weight"
              label="Вес"
              type="number"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Впишите вес"
            />
            <InputField
              id="track_number"
              label="Трек-номер"
              type="number"
              value={formData.track_number}
              onChange={handleChange}
              placeholder="Введите ID посылки"
            />
          </div>

          <div className={c.flex}>
            <InputField
              id="length"
              label="Длина"
              type="number"
              placeholder="Впишите длину"
              value={formData.length}
              onChange={handleChange}
            />
            <InputField
              id="width"
              label="Ширина"
              type="number"
              placeholder="Впишите ширину"
              value={formData.width}
              onChange={handleChange}
            />
            <InputField
              id="height"
              label="Высота"
              type="number"
              placeholder="Впишите высоту"
              value={formData.height}
              onChange={handleChange}
            />
          </div>

          <InputField
            id="comments"
            label="Комментарий"
            value={formData.comments}
            onChange={handleChange}
            placeholder="Пришитие комментарий"
          />
        </div>
      </form>
      <button className={c.submit_btn} onClick={nextStep}>
        Продолжить
      </button>
      {showModal && <ImageModal src={selectedImage} onClose={closeModal} />}
    </div>
  );
}
