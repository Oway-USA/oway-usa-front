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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick(e);
    }
  };

  return (
    <div className={s.container} onClick={handleInputClick}>
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <img
        className={s.borderimg}
        src="/assets/icons/searchfff.svg"
        alt="search"
        onClick={handleSearchClick}
      />
    </div>
  );
}
