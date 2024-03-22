import React from "react";
import s from "@/styles/screens/main/MoreServices.module.scss";
export default function MoreServices() {
  return (
      <div className={s.service}>
        <div className={`${s.service_container} container`}>
          <span>Дополнительные услуги</span>
          <h2>Наши дополнительные сервисы</h2>
          <div className={s.services_inner}>
            <div  className={s.services_inner_top}>
              <div>
                <div className={s.services_span}>
                  <div></div>
                  <span>Проверка техники на работоспособность</span>
                </div>
              </div>
              <div className={s.services_inner_top_block}>
                <div className={s.services_span}>
                  <div></div>
                  <span>Стоимость услуги: 5$</span>
                </div>
                <div className={s.services_span}>
                  <div></div>
                  <span>Эта услуга включает в себя тщательную проверку различных устройств и механизмов с целью выявления любых дефектов или неисправностей, гарантируя, что оборудование функционирует должным образом и готово к использованию.</span>
                </div>
              </div>
            </div>
            <div className={s.services_inner_down}>
              <div>
                <div className={s.services_span}>
                  <div></div>
                  <span>Проверка электроники на включение/выключение </span>
                </div>
              </div>
              <div className={s.services_inner_down_block}>
                <div className={s.services_span}>
                  <div></div>
                  <span>Эта услуга включает в себя тщательную проверку различных устройств и механизмов с целью выявления любых дефектов или неисправностей, гарантируя, что оборудование функционирует должным образом и готово к использованию.</span>
                </div>
                <div className={s.services_span}>
                  <div></div>
                  <span>Услуга производится с помощью запросов через тикеты</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
