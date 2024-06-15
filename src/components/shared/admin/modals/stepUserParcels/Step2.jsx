import React from "react";
import c from "@/styles/admin/WarehouseProductsModal.module.scss";

export default function Step2({
  formData,
  handleChange,
  nextStep,
  currentStep,
  setCurrentStep,
  selectedOption,
  setSelectedOption,
  selectedOption2,
  setSelectedOption2,
}) {
  const status = [
    { id: 8, name: "Доставлено" },
    { id: 7, name: "Отправлено курьерской службой" },
    { id: 6, name: "Получен на складе" },
    { id: 5, name: "Отправлен" },
    { id: 4, name: "Получен в ПВЗ" },
    { id: 3, name: "Готов к выдаче" },
  ];
  const warehouses = [
    { id: 7, name: "Турция" },
    { id: 8, name: "Москва" },
    { id: 9, name: "Кыргызстан" },
    { id: 14, name: "Чикаго" },
  ];

  const handleSelectChange = (e) => {
    const newSelectedId = e.target.value;
    setSelectedOption(newSelectedId);
    handleChange({
      target: { name: "status", value: newSelectedId },
    });
  };
  const handleSelectChange1 = (e) => {
    const newSelectedId = e.target.value;
    setSelectedOption2(newSelectedId);
    console.log(newSelectedId, "warehouse");
    handleChange({
      target: { name: "warehouse", value: newSelectedId },
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
      <form action="" className={c.first_block}>
        <div className={c.input}>
          <label htmlFor="status">Выберите статус посылки</label>
          <select
            id="status"
            name="status"
            value={selectedOption}
            onChange={handleSelectChange}
            className={c.select}
          >
            <option value="">Выберите статус</option>
            {status.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className={c.input}>
          <label htmlFor="warehouses">Выберите склад</label>
          <select
            id="warehouses"
            name="warehouses"
            value={selectedOption2}
            onChange={handleSelectChange1}
            className={c.select}
          >
            <option value="">Выберите статус</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </option>
            ))}
          </select>
        </div>
        <div className={c.input}>
          <label htmlFor="price">Стоимость к оплате</label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Введите сумму"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className={c.flex}>
          <div className={c.input}>
            <label htmlFor="date_sent">Дата отправки</label>
            <input
              type="text"
              name="date_sent"
              id="date_sent"
              value={formData.date_sent}
              placeholder="дд.мм.гггг"
              onChange={handleChange}
            />
          </div>
          <div className={c.input}>
            <label htmlFor="date_arrived">Дата прибытия</label>
            <input
              type="text"
              name="date_arrived"
              id="date_arrived"
              value={formData.date_arrived}
              placeholder="дд.мм.гггг"
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
      <button className={c.submit_btn} onClick={nextStep}>
        Продолжить
      </button>
    </div>
  );
}