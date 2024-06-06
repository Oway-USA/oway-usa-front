import React, { useState } from "react";
import s from "@/styles/pages/admin/AdminWareHousesPage.module.scss";
import Loading from "./Loading";
import { Pagination } from "@nextui-org/react";
import WerehousesModal from "./modals/WarehousesModal";

export default function WarehousesProductsTable({
  warehouses,
  deleteWarehouse,
  isLoading,
  error,
  current,
  setCurrent,
  nameFilter,
  trackNumberFilter,
  statusFilter,
  countryFilter,
}) {
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [confirmDeleteWarehouse, setConfirmDeleteWarehouse] = useState(null);

  const filteredWarehouses = warehouses?.results?.filter(
    (warehouse) =>
      warehouse.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      warehouse.track_number.toString().includes(trackNumberFilter) &&
      (statusFilter === "" || warehouse.status.name === statusFilter) &&
      (countryFilter === "" || warehouse.country.name === countryFilter)
  );

  const handleDetailsClick = (warehouse) => {
    setSelectedWarehouse(warehouse);
  };

  const handleDeleteConfirmation = (warehouse) => {
    setConfirmDeleteWarehouse(warehouse);
  };

  const handleDelete = (warehouseId) => {
    deleteWarehouse(warehouseId);
    setConfirmDeleteWarehouse(null);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className={s.th0}>
              {" "}
              <input type="checkbox" /> Название товара
            </th>
            <th className={s.th1}>Дата отправки</th>
            <th className={s.th1}>Дата прибытия</th>
            <th className={s.th2}>Вес (кг)</th>
            <th className={s.th1}>Трек-номер</th>
            <th className={s.th1}>Статус</th>
            <th className={s.th3}>Действие</th>
          </tr>
        </thead>
        <tbody>
          {filteredWarehouses?.map((warehouse) => (
            <div
              key={warehouse.id}
              className={warehouse.is_parcels === true ? s.parcel_tr : s.border}
            >
              <div className={s.df}>
                <tr key={warehouse.id}>
                  <td className={s.th0}>
                    <input type="checkbox" />
                    {warehouse.name}
                  </td>
                  <td className={s.th1}>{warehouse.date_sent}</td>
                  <td className={s.th1}>{warehouse.date_arrived}</td>
                  <td className={s.th2}>{warehouse.weight}</td>
                  <td className={s.th1}>{warehouse.track_number}</td>
                  <td
                    className={s.th1}
                    style={{
                      color:
                        warehouse.status?.name === "Доставлено"
                          ? "#06DB02"
                          : "inherit",
                    }}
                  >
                    {warehouse.status?.name}
                  </td>
                  <td className={s.button}>
                    <button
                      className={s.btn}
                      onClick={() => handleDetailsClick(warehouse)}
                    >
                      Подробнее
                    </button>
                    <img
                      className={s.delete}
                      onClick={() => handleDeleteConfirmation(warehouse)}
                      src="/assets/icons/delete.svg"
                      alt="Delete"
                    />
                    <img
                      onClick={() => handleDetailsClick(warehouse)}
                      className={s.edit}
                      src="/assets/icons/edit.svg"
                      alt="Edit"
                    />
                  </td>
                </tr>
                <div className={s.button1}>
                  <img
                    className={s.delete}
                    onClick={() => handleDeleteConfirmation(warehouse)}
                    src="/assets/icons/delete.svg"
                    alt="Delete"
                  />
                  <img
                    onClick={() => handleDetailsClick(warehouse)}
                    className={s.edit}
                    src="/assets/icons/edit.svg"
                    alt="Edit"
                  />
                </div>
              </div>
              <div className={s.dn}>
                <div>
                  <button
                    className={s.btn}
                    onClick={() => handleDetailsClick(warehouse)}
                  >
                    Подробнее
                  </button>
                </div>
              </div>
            </div>
          ))}
        </tbody>
      </table>
      <div className={s.pagination}>
        <Pagination
          variant="bordered"
          total={warehouses?.total_pages}
          initialPage={current}
          onChange={(page) => setCurrent(page)}
        />
      </div>

      {selectedWarehouse && (
        <WerehousesModal
          warehouse={selectedWarehouse}
          onClose={() => setSelectedWarehouse(null)}
        />
      )}

      {confirmDeleteWarehouse && (
        <>
          <div className={s.modalBackdrop}></div>
          <div className={s.confirmDeleteModal}>
            <p>Вы уверены, что хотите удалить этот товар?</p>
            <div>
              <button onClick={() => handleDelete(confirmDeleteWarehouse.id)}>
                Да
              </button>
              <button onClick={() => setConfirmDeleteWarehouse(null)}>
                Отмена
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
