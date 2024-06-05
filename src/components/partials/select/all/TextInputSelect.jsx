import React, { useState } from "react";
import s from "@/styles/components/partials/select/TextInputSelect.module.scss";

export default function TextInputSelect({ placeholder, onSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputClick = (e) => {
    e.stopPropagation();
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = (e) => {
    e.stopPropagation();
    onSearch(inputValue);
  };

  return (
    <div className={s.container} onClick={handleInputClick}>
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
      />
      <img
        src="/assets/icons/search.svg"
        alt="search"
        onClick={handleSearchClick}
      />
    </div>
  );
}
