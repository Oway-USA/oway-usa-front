import React, { useState } from "react";
import s from "@/styles/partials/Faq.module.scss";
import { useRouter } from "next/router";

export default function Faq() {
  const faqItems = [
    {
      question: "Откуда и куда вы доставляете груз?",
      answer:
        "Мы осуществляем доставку ваших заказов из США и Турции в Россию и Кыргызстан..",
    },
    {
      question: "Какой минимальный вес для отправки?",
      answer:
        "Мы исключили минимальный вес по отправки для клиентов. Это значит вы можете отправлять посылки не зависимо от веса и платить только за вес посылки. ",
    },
    {
      question: "Как выбирать товары  ? ",
      answer:
        "При отборе товаров, просим вас учесть перечень товаров, запрещенных к перевозке. Информацию о запрещенных товарах вы можете найти в ответах ниже. ",
    },
    {
      question: "Запрещенные товары для отправки.",
      answer:
        "Роллеры, санитайзеры и любые другие товары с пометкой огнеопасно, Металлодетекторы,",
    },
    {
      question: "В какие сроки вы доставляете?",
      answer:
        "Кроме случаев непредвиденных обстоятельств, связанных с авиаперевозками, мы осуществляем доставку в течение 7-18 дней с момента отправления вашего товара с наших складов в США до вашей страны.",
    },
    {
      question: "В каких штатах вы принимаете посылки для отправки?",
      answer:
        " Наши склады расположены в штате Делавэре и штате Иллинойс, город Чикаго. График работы нашего Чикагского офиса -  с пн по сб, с 9am - 6pm , а Делавэрского - с 9am - 6pm . Просим учесть  это при оформление заказов.",
    },
    {
      question: "Как произвести оплату моих онлайн-покупок и доставки?",
      answer:
        "Оплата покупок из американских интернет-магазинов осуществляется международными картами Visa и MasterCard. В случае отсутствия карты или её непринятия магазином, вы можете воспользоваться услугой выкупа (тут сделать ссылку на выкуп ) . Оплатить стоимость доставки можно через личный кабинет с использованием международных карт. Также, при получении посылки в наших ПВЗ, возможна оплата через наши местные банковские счета.",
    },
    {
      question: "Как осуществить отслеживание моих отправлений?",
      answer:
        "Для этого у нас предусмотрена вкладка 'Отслеживание' на нашем веб-сайте. Для авторизации вам потребуется указать свой номер телефона, а затем свой идентификационный номер. К вам придет уведомления на каждом этапе заказа, ",
    },
    {
      question: "Доставляете ли посылку до дома?",
      answer:
        "Вы можете решить, забрать груз самостоятельно из наших пунктов выдачи в Москве и Бишкеке, либо уточнить в личном кабинете условия доставки до вашего дома. Доставка по городу и регионам осуществляется местными курьерскими службами, такими как СДЭК, Яндекс, почта и другие сервисы.",
    },
    {
      question: "По какому курсу происходит конвертация  валюты? ",
      answer:
        "Это наш внутренний курс, он складывается из текущего курса ЦБ РФ  КР и процента на издержки по последующему международному переводу. Внутренний курс может меняться в зависимости от ситуации.  Дополнительно есть комиссия банка за осуществление транзакции – от 3%. Этот процент фиксированный.  Исходя из всех вышеуказанных пересчетов Внутренний курс получается выше банковского курса. ",
    },
    {
      question: "Сколько стоит доставка из США?",
      answer:
        "Для расчета стоимости доставки груза из США в вашу страну вы можете воспользоваться калькулятором, предоставленным по следующей ссылке на нашем веб-сайте.",
    },
    {
      question:
        "Можно ли через вас отправить посылку от частного лица, а не из магазина?",
      answer:
        "Конечно, вы можете направить посылку на наш склад от частного лица. Процесс пересылки схож с доставкой товаров из интернет-магазинов. Необходимо зарегистрироваться на нашем сайте, получить персональный адрес, на который вы отправите товары. После поступления посылки на склад “OWAY USA”, она будет доступна в вашем личном кабинете. Теперь у вас есть возможность оформить доставку по нужному адресу. ",
    },
    {
      question: "Можно ли отправлять автозапчасти? ",
      answer:
        "Да, мы отправляем почти все части автомобилей. Так же есть запрещенные детали где содержется жидкость или взрывоопасные вещи запрещены для отправки. Для вас подобрали лучшие и выгодные сайты для заказа из США. ( здесь сделать ссылку страницку с авто товарами.",
    },
    {
      question:
        "Зачем нужен OWAY USA , если можно заказать доставку напрямую из магазина?",
      answer:
        "Почти все интернет-магазины осуществляют доставку только внутри страны.OWAY USA  доставляет товары в Россию из США и Турции. Теперь границы — больше не препятствие для вас.",
    },
    {
      question:
        "Что делать, если российская банковская карта не поддерживается для оплаты в зарубежных магазинах, а у меня нет другой карты? ",
      answer:
        "В настоящее время карты, выпущенные в России, не могут быть использованы для оплаты покупок в зарубежных магазинах, особенно в США и Турции. В такой ситуации предлагается воспользоваться услугой 'Помощь при покупке': просто оформите заказ через удобную форму в вашем аккаунте, и мы выкупим необходимый товар в интернет-магазине за вас.",
    },
    {
      question:
        "Какие примущества есть при выборе американских и турецких интернет-магазинов?",
      answer:
        "Главные плюсы магазинов США и Турции заключаются в выдающемся качестве товаров, доступных по выгодным ценам, и разнообразии ассортимента. В Турции также представлены популярные американские и европейские бренды. Здесь легко найти необходимые предметы, а сэкономить можно в 2–3 раза, приобретая все от рубашек и игрушек до передовых смартфонов и ноутбуков.",
    },
    {
      question: "Как мне проверить состояние товара до отправки?",
      answer:
        "Мы всегда советуем проверять состояние/комплектацию покупок с помощью услуги « Проверка товара». Он позволяет выявить все несоответствия заказа с пришедшими покупками и оперативно решить с магазином все вопросы. Создать спецзапрос можно в личном кабинете.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const router = useRouter();

  const toggleQuestion = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const faqStyle = {};
  if (router.pathname === "/") {
    faqStyle.background = "var(--bue_light_2, #fff)";
  } else if (router.pathname === "/faq") {
    faqStyle.background = "var(--bue_light_2, #f7f9fc)";
  }

  return (
    <section style={faqStyle}>
      <div
        className={`${s.faq_container} container`}
        data-aos="fade-up-left"
        data-aos-offset="500"
        data-aos-easing="ease-in-sine"
      >
        <div className={s.faq_block}>
          <div className={s.faq_header}>
            <span>FAQ</span>
            <h2>Часто задаваемые вопросы</h2>
          </div>
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={s.question}
              style={{
                backgroundColor: openIndex === index ? "#027DDB" : "#fff",
              }}
              onClick={() => toggleQuestion(index)}
            >
              <div className={s.close_block}>
                <p style={{ color: openIndex === index ? "#fff" : "#000" }}>
                  {item.question}
                </p>
                <button>
                  <img
                    src={
                      openIndex === index
                        ? "/assets/icons/minus.svg"
                        : "/assets/icons/plus.svg"
                    }
                    alt={openIndex === index ? "close" : "open"}
                    className={s.toggle_btn}
                  />
                </button>
              </div>

              {openIndex === index && <p className={s.answer}>{item.answer}</p>}
            </div>
          ))}
        </div>
        <div className={s.door_img} data-aos="zoom-in-up">
          <img src="assets/icons/faq_door.png" alt="" />
        </div>
      </div>
    </section>
  );
}
