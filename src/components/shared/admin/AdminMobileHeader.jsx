import React, { useState } from "react";
import s from "@/styles/users/UserMobileHeaeder.module.scss";
import c from "@/styles/components/layout/Header.module.scss";
import { Badge, Button } from "@nextui-org/react";
import useNotification from "@/hooks/admin/useNotification";
import { NotificationIcon } from "./NotificationIcon";
import { useRouter } from "next/router";
import useUserData from "@/hooks/user/useUserData";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import useLogout from "@/hooks/auth/useLogout";
import ModalAdminMobil from "@/components/partials/ModalAdminMobil";

export default function AdminMobileHeader({ children }) {
  const { products } = useNotification();
  const router = useRouter();
  const { userData, loading, error } = useUserData();
  const logout = useLogout();
  const isActive = (path) => router.pathname === path;
  const [isNavOpen, setIsNavOpen] = useState(false);

  if (error) return <div className={s.header}>Error: {error}</div>;

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  const links = [
    {
      href: "/admin",
      label: "Главная",
      icon: "/assets/icons/admin-icons/главная.svg",
    },
    {
      href: "/admin/users",
      label: "Пользователи",
      icon: "/assets/icons/admin-icons/пользователи.svg",
    },
    {
      href: "/admin/notifications",
      label: "Уведомления",
      icon: "/assets/icons/admin-icons/уведомления.svg",
    },
    {
      href: "/admin/products",
      label: "Горячие предложения",
      icon: "/assets/icons/admin-icons/товары.svg",
    },
    {
      href: "/admin/warehouses",
      label: "Склад",
      icon: "/assets/icons/admin-icons/склад.svg",
    },
    {
      href: "/admin/requests",
      label: "Входящие запросы",
      icon: "/assets/icons/admin-icons/requests.svg",
    },
    {
      href: "/admin/shops-catalog",
      label: "Каталог сайтов",
      icon: "/assets/icons/admin-icons/сайты.svg",
    },
    {
      href: "/admin/user-parcels",
      label: "Ожидаемые посылки",
      icon: "/assets/icons/calc_icon.svg",
    },
    {
      href: "/admin/companies",
      label: "Логотипы компаний",
      icon: "/assets/icons/city.svg",
    },
    {
      href: "/admin/illinois",
      label: "Клиенты за Иллинойс",
      icon: "/assets/icons/united-states-of-america.svg",
    },
  ];

  return (
    <div className={s.container}>
      <div className={s.header_container}>
        <header>
          <Link href="/admin">
            <img src="/assets/icons/logo.svg" alt="" />
          </Link>

          <div>
            {/* <Badge
              content={products?.total_not_checked_notifications}
              shape="circle"
              color="danger"
            >
              <Button
                radius="full"
                isIconOnly
                aria-label="13 notifications"
                variant="light"
                onClick={() => router.push("/user/notifications")}
              >
                <NotificationIcon size={24} />
              </Button>
            </Badge>
            <div className={s.user_code}>
              <span>#{loading ? "загрузка..." : userData?.unique_id}</span>
            </div> */}
            <div>
              <button onClick={toggleNav}>
                {isNavOpen ? (
                  <RxCross2 size={25} />
                ) : (
                  <RxHamburgerMenu size={25} />
                )}
              </button>
            </div>
          </div>
        </header>
        <div className={`${s.nav} ${isNavOpen ? s.visibleFilter : ""}`}>
          <div className={`${s.filterComponentContainer}`}>
            <ModalAdminMobil
              links={links}
              isActive={isActive}
              logout={logout}
              toggleNav={toggleNav}
            />
          </div>
        </div>
      </div>

      <main className={s.pages_container}>{children}</main>
    </div>
  );
}
