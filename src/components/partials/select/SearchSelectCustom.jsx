import React, { useState, useEffect, useRef } from "react";
import s from "@/styles/components/partials/select/SearchSelectCustom.module.scss";
import useLocalStorage from "./useLocalStorage";
import { options, inputComponents } from "./inputComponents";

const storageKeys = {
  textInput: "textInput",
  numberInput: "numberInput",
  selectedChoice: "selectedChoice",
  nameInput: "nameInput",
  statusInput: "statusInput",
  countryInput: "countryInput",
};

const CustomSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [displayText, setDisplayText] = useState("Поиск");

  const [textInput, setTextInput] = useLocalStorage(storageKeys.textInput, "");
  const [numberInput, setNumberInput] = useLocalStorage(
    storageKeys.numberInput,
    ""
  );
  const [selectedChoice, setSelectedChoice] = useLocalStorage(
    storageKeys.selectedChoice,
    ""
  );
  const [nameInput, setNameInput] = useLocalStorage(storageKeys.nameInput, "");
  const [statusInput, setStatusInput] = useLocalStorage(
    storageKeys.statusInput,
    ""
  );
  const [countryInput, setCountryInput] = useLocalStorage(
    storageKeys.countryInput,
    ""
  );

  const dropdownRef = useRef(null);

  const inputs = {
    textInput,
    numberInput,
    selectedChoice,
    nameInput,
    statusInput,
    countryInput,
    setTextInput,
    setNumberInput,
    setSelectedChoice,
    setNameInput,
    setStatusInput,
    setCountryInput,
  };

  const toggleDropdown = (e) => {
    setIsOpen((prev) => {
      const newState = !prev;
      if (!newState) {
        setSelectedComponent(null);
        setDisplayText("Поиск");
      }
      return newState;
    });
    e.stopPropagation();
  };

  const closeDropdown = (e) => {
    setIsOpen(false);
    setSelectedComponent(null);
    setDisplayText("Поиск");
    e.stopPropagation();
  };

  const resetAllData = (e) => {
    setTextInput("");
    setNumberInput("");
    setSelectedChoice("");
    setNameInput("");
    setStatusInput("");
    setCountryInput("");
    setSelectedComponent(null);
    setDisplayText("Поиск");
    e.stopPropagation();
  };

  const handleSearch = (searchText, type) => {
    const setter = inputs[`set${type.charAt(0).toUpperCase() + type.slice(1)}`];
    if (setter) {
      setter(searchText);
      setDisplayText(`по: ${searchText}`);
    }
  };

  const renderOptions = (optionsToRender, type) => (
    <div className={s.option}>
      {optionsToRender.map((option, index) => (
        <div key={index} onClick={() => handleSearch(option, type)}>
          {option}
        </div>
      ))}
    </div>
  );

  const renderComponentOptions = () => {
    if (!selectedComponent) return null;

    const { title } = selectedComponent.props;

    switch (title) {
      case "Выберите статус":
        return renderOptions(options.status, "statusInput");
      case "Выберите страну принятия":
        return renderOptions(options.country, "countryInput");
      case "Выберите страну":
        return renderOptions(options.default, "selectedChoice");
      default:
        return null;
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
      setSelectedComponent(null);
      setDisplayText("Поиск");
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      className={s.selectContainer}
      onClick={toggleDropdown}
      ref={dropdownRef}
    >
      <div className={s.selectedOption}>
        {selectedComponent ? selectedComponent : displayText}
      </div>
      {isOpen && (
        <div
          className={s.optionsContainer}
          onClick={(e) => e.stopPropagation()}
        >
          {renderComponentOptions()}
          {inputComponents(handleSearch, inputs).map(
            ({ component, displayText }, index) => (
              <div
                key={index}
                className={s.option}
                onClick={() => setSelectedComponent(component)}
              >
                {displayText}
              </div>
            )
          )}
          <div className={s.buttonContainer}>
            <button className={s.closeButton} onClick={closeDropdown}>
              Закрыть
            </button>
            <button className={s.resetButton} onClick={resetAllData}>
              Сбросить
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
