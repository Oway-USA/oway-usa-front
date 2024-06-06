import React, { useEffect, useState } from "react";
import s from "@/styles/pages/admin/AdminUsersPage.module.scss";
import c from "@/styles/pages/admin/AdminWareHousesPage.module.scss";
import { Pagination } from "@nextui-org/react";
import useUsersAdmin from "@/hooks/admin/useUsers";
import Loading from "@/components/shared/admin/Loading";
import UserDetailModal from "@/components/shared/users/modals/UserDetailModal";

const PAGE_SIZE = 7;

export default function AdminUsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPhoneNumber, setSearchPhoneNumber] = useState("");
  const [searchUniqueId, setSearchUniqueId] = useState("");
  const { users, isLoading, fetchUsers, updateUsers } =
    useUsersAdmin(currentPage);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [windowWidth, setWindowWidth] = useState(undefined);

  useEffect(() => {
    setIsLoadingPage(true);
    fetchUsers(currentPage).then(() => setIsLoadingPage(false));

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currentPage]);

  const deselectUser = () => setSelectedUser(null);

  const handleEditUser = (userData) => {
    updateUsers(userData.id)
      .then(() => {
        updateUsers(currentPage);
        deselectUser();
      })
      .catch((error) => {
        console.error("Error editing user:", error);
      });
  };

  const displayStyle =
    windowWidth <= 700 ? { display: "none" } : { display: "flex", gap: "20px" };

  if (isLoading || isLoadingPage) {
    return <Loading />;
  }

  return (
    <>
      <div style={displayStyle} className={c.warehouses_page}>
        <div className={c.filters}>
          <div className={c.search}>
            <img src="/assets/icons/search.svg" alt="icon" />
            <input
              type="text"
              placeholder="Поиск по номеру телефона"
              value={searchPhoneNumber}
              onChange={(e) => setSearchPhoneNumber(e.target.value)}
            />
          </div>
          <div className={c.search}>
            <img src="/assets/icons/search.svg" alt="icon" />
            <input
              type="text"
              placeholder="Поиск по уникальному ID"
              value={searchUniqueId}
              onChange={(e) => setSearchUniqueId(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className={s.users_page}>
        <table>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Почта</th>
              <th>Номер телефона</th>
              <th>Уникальный ID</th>
              <th>Данные ID паспорта</th>
            </tr>
          </thead>
          <tbody>
            {users?.results
              ?.filter((item) => item.id !== 1)
              .filter(
                (user) =>
                  user.phone_number.includes(searchPhoneNumber) &&
                  user.unique_id.includes(searchUniqueId)
              )
              .map((user) => (
                <div key={user.id} className={s.border}>
                  <tr key={user.id}>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone_number || "Номер телефона не указан"}</td>
                    <td>#{user.unique_id}</td>
                    <td className={s.dn1}>
                      <button
                        className={s.btn}
                        onClick={() => setSelectedUser(user)}
                      >
                        Подробнее
                      </button>
                    </td>
                  </tr>
                  <div className={s.dn}>
                    <button
                      className={s.btn}
                      onClick={() => setSelectedUser(user)}
                    >
                      Подробнее
                    </button>
                  </div>
                </div>
              ))}
          </tbody>
        </table>
        {selectedUser && (
          <UserDetailModal
            userData={selectedUser}
            close={deselectUser}
            editUser={handleEditUser}
          />
        )}
        <div className={s.pagination}>
          <Pagination
            variant="bordered"
            total={Math.ceil(users.count / PAGE_SIZE)}
            initialPage={currentPage}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
}
