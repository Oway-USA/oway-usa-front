import React from "react";
import TextInputSelect from "./all/TextInputSelect";
import NumberInputSelect from "./all/NumberInputSelect";
import ChoiceInputSelect from "./all/ChoiceInputSelect";

const options = {
  status: [
    { id: 8, name: "Доставлено," },
    { id: 3, name: "Готов к выдаче," },
    { id: 6, name: "Получен на складе," },
    { id: 4, name: "Получен в ПВЗ," },
    { id: 7, name: "Отправлено курьерской службой," },
    { id: 5, name: "Отправлен," },
  ],
  country_of_origin: [
    { id: 3, name: "США" },
    { id: 4, name: "Турция" },
    { id: 8, name: "Кыргызстан" },
    { id: 9, name: "Россия" },
  ],
};

const inputComponents = (handleSearch, inputs) => [
  {
    component: (
      <TextInputSelect
        placeholder="Впишите трек-номер"
        onSearch={(input) => handleSearch(input, "trackNumberInput")}
      />
    ),
    displayText: `по: ${inputs.trackNumberInput || "трек-номеру"}`,
  },
  // {
  //   component: (
  //     <NumberInputSelect
  //       placeholder="по: цена"
  //       onSearch={(input) => handleSearch(input, "priceInput")}
  //     />
  //   ),
  //   displayText: `по: ${inputs.priceInput || "цена"}`,
  // },
  {
    component: (
      <NumberInputSelect
        placeholder="по: дата"
        onSearch={(input) => handleSearch(input, "dateSentInput")}
      />
    ),
    displayText: `по: ${inputs.dateSentInput || "дате"}`,
  },
  // {
  //   component: (
  //     <NumberInputSelect
  //       placeholder="по: вес"
  //       onSearch={(input) => handleSearch(input, "weightInput")}
  //     />
  //   ),
  //   displayText: `по: ${inputs.weightInput || "весу"}`,
  // },
  // {
  //   component: (
  //     <TextInputSelect
  //       placeholder="Введите название"
  //       onSearch={(input) => handleSearch(input, "nameInput")}
  //     />
  //   ),
  //   displayText: `по: ${inputs.nameInput || "названию"}`,
  // },
  {
    component: (
      <ChoiceInputSelect
        title="Выберите статус"
        options={options.status}
        onChoiceSelect={(choice) => handleSearch(choice.id, "statusInput")}
      />
    ),
    displayText: `по: ${inputs.statusInput.name || "статусу"}`,
  },

  // {
  //   component: (
  //     <ChoiceInputSelect
  //       title="Выберите страну отправления"
  //       options={options.country_of_origin}
  //       onChoiceSelect={(choice) =>
  //         handleSearch(choice.id, "countryOfOriginInput")
  //       }
  //     />
  //   ),
  //   displayText: `по: ${inputs.countryOfOriginInput.name || "стране принятия"}`,
  // },
  // {
  //   component: (
  //     <ChoiceInputSelect
  //       title="Выберите страну назначения"
  //       options={options.country_of_origin}
  //       onChoiceSelect={(choice) =>
  //         handleSearch(choice.id, "countryOfDestinationInput")
  //       }
  //     />
  //   ),
  //   displayText: `по: ${
  //     inputs.countryOfDestinationInput.name || "Выберите страну"
  //   }`,
  // },
];
export { options, inputComponents };
