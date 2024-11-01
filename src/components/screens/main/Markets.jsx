import React from "react";
import s from "@/styles/screens/main/Markets.module.scss";
import Button from "../../partials/Button";
import Link from "next/link";

export default function Markets() {
  return (
    <div className={s.heroSection_page} 
      data-aos="fade-up" 
      data-aos-offset="300"
      data-aos-easing="ease-in-sine"
    >
      <div className={`${s.heroSection_page} container`}>
        <div className={s.heroSection_info}>
          <h1>
            Покупайте на <strong>Amazon/TrendYol</strong> <br />
            Получайте в <strong>странах СНГ</strong>
          </h1>
          <div className={s.heroSection_info_span}>
            <span>
              <strong>Amazon</strong> — американская компания, крупнейшая в мире
              на рынках платформ электронной коммерции и публично-облачных
              вычислений по выручке и рыночной капитализации.
            </span>
          </div>
          <Link href="https://www.amazon.com/" target="__blank">
            <Button button="Посетить сайт" />
          </Link>
        </div>
        <div className={s.heroSection_img} data-aos="zoom-out-left">
          <img src="assets/images/marketsBox.png" alt="" />
        </div>
      </div>
    </div>
  );
}
