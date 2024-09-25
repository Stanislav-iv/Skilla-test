import React, { useState } from "react";
import "./DropDown.scss";

const Dropdown = ({ handleCallStatus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Все типы");

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <div className="dropdown__trigger" onClick={toggleDropdown}>
        <div>{selectedOption}</div>
        <i className={isOpen ? "arrow up" : "arrow down"}></i>
      </div>
      {isOpen && (
        <ul className="dropdown__options">
          <li
            style={{
              color: selectedOption === "Все типы" ? "#015EF5" : "#2B2D33",
            }}
            onClick={() => {
              handleOptionClick("Все типы"), handleCallStatus("all");
            }}
          >
            Все типы
          </li>
          <li
            style={{
              color: selectedOption === "Входящие" ? "#015EF5" : "#2B2D33",
            }}
            onClick={() => {
              handleOptionClick("Входящие"), handleCallStatus("1");
            }}
          >
            Входящие
          </li>
          <li
            style={{
              color: selectedOption === "Исходящие" ? "#015EF5" : "#2B2D33",
            }}
            onClick={() => {
              handleOptionClick("Исходящие"), handleCallStatus("0");
            }}
          >
            Исходящие
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
