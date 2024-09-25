import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, subDays } from "date-fns";
import "./DatePicker.scss";
const DatePickers = ({ handleCallDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysToDisplay, setDaysToDisplay] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [customDateRange, setCustomDateRange] = useState([null, null]);
  const [customStartDate, customEndDate] = customDateRange;
  const [manualInput, setManualInput] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleManualInputChange = (e) => {
    setManualInput(e.target.value);
    const dates = e.target.value.split(" - ");
    if (dates.length === 2) {
      const start = new Date(dates[0].split(".").reverse().join("-"));
      const end = new Date(dates[1].split(".").reverse().join("-"));
      if (!isNaN(start) && !isNaN(end)) {
        setCustomDateRange([start, end]);
      }
    }
  };

  const handleDatePickerChange = (dates) => {
    setCustomDateRange(dates);
    if (dates[0] && dates[1]) {
      const start = format(dates[0], "dd.MM.yyyy");
      const end = format(dates[1], "dd.MM.yyyy");
      setManualInput(`${start} - ${end}`);
    }
  };
  const handleApplyDates = () => {
    if (customStartDate && customEndDate) {
      handleCallDate(
        format(customStartDate, "yyyy-MM-dd"),
        format(customEndDate, "yyyy-MM-dd")
      );
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleApplyDates();
    }
  };
  const handleFetchCalls = (days = daysToDisplay) => {
    let start = format(subDays(currentDate, days - 1), "yyyy-MM-dd");
    let end = format(currentDate, "yyyy-MM-dd");

    handleCallDate(start, end);
  };

  const handleIncrement = () => {
    setDaysToDisplay((prevDays) => {
      const newDays = prevDays + 1;
      handleFetchCalls(newDays);
      return newDays;
    });
  };

  const handleDecrement = () => {
    setDaysToDisplay((prevDays) => {
      if (prevDays > 1) {
        const newDays = prevDays - 1;
        handleFetchCalls(newDays);
        return newDays;
      }
      return prevDays;
    });
  };

  const handleSelectionChange = (selection) => {
    setShowDropdown(false);

    switch (selection) {
      case "week":
        setDaysToDisplay(7);
        handleFetchCalls(7);
        break;
      case "month":
        setDaysToDisplay(30);
        handleFetchCalls(30);
        break;
      case "year":
        setDaysToDisplay(365);
        handleFetchCalls(365);
        break;
      case "custom":
        if (customStartDate && customEndDate) {
          handleCallDate(
            format(customStartDate, "yyyy-MM-dd"),
            format(customEndDate, "yyyy-MM-dd")
          );
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="date-picker">
      <div className="date-controls">
        <button onClick={handleDecrement}>
          <i className="arrow left"></i>
        </button>
        <span
          className="date-picker__display"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="calendar"></div>
          {daysToDisplay}{" "}
          {daysToDisplay === 1
            ? "день"
            : daysToDisplay >= 2 && daysToDisplay <= 4
            ? "дня"
            : "дней"}
        </span>
        <button onClick={handleIncrement}>
          <i className="arrow right"></i>
        </button>
      </div>

      {showDropdown && (
        <div className="dropdown__date">
          <ul className="dropdown__menu">
            <li
              className="dropdown__header "
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {daysToDisplay}{" "}
              {daysToDisplay === 1
                ? "день"
                : daysToDisplay >= 2 && daysToDisplay <= 4
                ? "дня"
                : "дней"}
            </li>
            <li
              className="dropdown__select"
              onClick={() => handleSelectionChange("week")}
            >
              За неделю
            </li>
            <li
              className="dropdown__select"
              onClick={() => handleSelectionChange("month")}
            >
              За месяц
            </li>
            <li
              className="dropdown__select"
              onClick={() => handleSelectionChange("year")}
            >
              За год
            </li>
            <li className="custom-date">
              <span className="custom-date__text">Указать даты</span>
              <div className="custom-date__range">
                <input
                  type="text"
                  value={manualInput}
                  onChange={handleManualInputChange}
                  placeholder="__.__.___ - __.__.____"
                  className="custom-date__input"
                  onKeyDown={handleKeyDown}
                />

                <button
                  className="custom-date__calendar"
                  onClick={() => setShowDatePicker(!showDatePicker)}
                ></button>

                {showDatePicker && (
                  <DatePicker
                    selected={customStartDate}
                    onChange={handleDatePickerChange}
                    startDate={customStartDate}
                    endDate={customEndDate}
                    selectsRange
                    dateFormat="dd.MM.yyyy"
                    isClearable
                    inline
                  />
                )}
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DatePickers;
