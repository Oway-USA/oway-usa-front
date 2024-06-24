import React, { useEffect, useState } from "react";
import s from "@/styles/pages/admin/AdminWareHousesPage.module.scss";
import WarehousesProductsTable from "@/components/shared/admin/WarehousesProductsTable";
import useWarehouses from "@/hooks/admin/useWarehouses";
import CustomSelect from "@/components/partials/select/SearchSelectCustom";
import Breadcrumbs from "@/components/shared/admin/bread/Bread";

export default function AdminWarehousesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    warehouses,
    fetchWarehouses,
    deleteWarehouse,
    isLoading,
    error,
    count,
    setFilters,
    deleteMultipleWarehouses,
  } = useWarehouses(currentPage);

  const [filters, setFiltersState] = useState({
    name: "",
    track_number: "",
    status: "",
    country_of_origin: "",
    country_of_destination: "",
    weight: "",
    price: "",
    date_sent: "",
  });
  useEffect(() => {
    fetchWarehouses({ currentPage, ...filters });
  }, [currentPage, filters]);

  const handleFilterChange = (key, value) => {
    setFiltersState((prevFilters) => ({ ...prevFilters, [key]: value }));
    setFilters({ [key]: value });
  };

  return (
    <div className={s.warehouses_page}>
      <Breadcrumbs />
      <div className={s.filters}>
        <CustomSelect onFilterChange={handleFilterChange} />
      </div>
      <WarehousesProductsTable
        currentPage={currentPage}
        setCurrent={setCurrentPage}
        current={currentPage}
        deleteMultipleWarehouses={deleteMultipleWarehouses}
        isLoading={isLoading}
        error={error}
        count={count}
        warehouses={warehouses}
        fetchWarehouses={fetchWarehouses}
        deleteWarehouse={deleteWarehouse}
        filters={filters}
      />
    </div>
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
