import React from "react";
import s from "@/styles/admin/AdminLayout.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import AdminHeader from "./AdminHeader";
import useLogout from "@/hooks/auth/useLogout";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const logout = useLogout();
  const isActive = (path) => router.pathname === path;

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
      href: "/admin/warehouses",
      label: "Склады",
      icon: "/assets/icons/admin-icons/склад.svg",
    },
    {
      href: "/admin/requests",
      label: "Входящие запросы",
      icon: "/assets/icons/admin-icons/requests.svg",
    },
    {
      href: "/admin/catalog/shops-catalog",
      label: "Каталог",
      icon: "/assets/icons/admin-icons/сайты.svg",
    },
    {
      href: "/admin/user-parcels",
      label: "Ожидаемые посылки",
      icon: "/assets/icons/calc_icon.svg",
    },
    {
      href: "/admin/illinois",
      label: "Клиенты за Иллинойс",
      icon: "/assets/icons/united-states-of-america.svg",
    },
    {
      href: "/admin/bulletin-board",
      label: "Доска объявлений",
      icon: "/assets/icons/admin-icons/bulletin_board.svg",
    },
  ];

  return (
    <>
      <div className={s.layout}>
        <div className={s.sidebar}>
          <div onClick={() => router.push("/")} className={s.logo}>
            <img src="/assets/icons/owayUSE.svg" alt="Oway USA" />
          </div>

          <nav>
            <ul>
              {links.map((link) => (
                <Link key={link.label} href={link.href}>
                  <li className={isActive(link.href) ? s.active : ""}>
                    {typeof link.icon === "string" ? (
                      <img
                        src={link.icon}
                        alt="icon"
                        className={isActive(link.href) ? s.active_icon : ""}
                      />
                    ) : (
                      <span>{link.icon}</span>
                    )}
                    {link.label}
                  </li>
                </Link>
              ))}
              <button onClick={logout} className={s.logout}>
                <img src="/assets/icons/logout.svg" alt="logout" />
                Выйти
              </button>
            </ul>
          </nav>
        </div>
        <div className={s.admin_pages}>
          <AdminHeader />
          <main className={s.admin_page_content}>{children}</main>
        </div>
      </div>
    </>
  );
}
