import { useGetCallQuery } from "../../redux/callApi";
import CallItem from "../CallItem/CallItem";
import { useState } from "react";
import "./CallList.scss";
import DatePickers from "../Date/DatePicker";
import { format } from "date-fns";
import Dropdown from "../DropDown/DropDown";

const CallList = () => {
  const [callStatus, setCallStatus] = useState("all");
  const [start, setStart] = useState(format(new Date(), "yyyy-MM-dd"));
  const [end, setEnd] = useState(format(new Date(), "yyyy-MM-dd"));
  const [sortBy, setSortBy] = useState("date");

  const handleCallStatus = (st) => {
    setCallStatus(st);
  };

  const handleSortDate = () => {
    setSortBy("date");
  };
  const handleSortDuration = () => {
    setSortBy("duration");
  };

  const handleCallDate = (start, end) => {
    setStart(start);
    setEnd(end);
  };
  let arg = {
    dateStart: start,
    dateEnd: end,
    inOut: callStatus,
    sort: sortBy,
  };
  const { data, isLoading } = useGetCallQuery(arg);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="callList">
      <div className="filter">
        <Dropdown handleCallStatus={handleCallStatus} />
        <DatePickers handleCallDate={handleCallDate} />
      </div>
      <div className="list">
        <div className="list__header">
          <p className="list__type">Тип</p>
          <div className="list__time" onClick={handleSortDate}>
            <div>Время</div>
            <i className="arrow down"></i>
          </div>
          <p className="list__employee">Сотрудник</p>
          <p className="list__call">Звонок</p>
          <p className="list__source">Источник</p>
          <p className="list__grade">Оценка</p>
          <div className="list__time" onClick={handleSortDuration}>
            <div>Длительность</div>
            <i className="arrow down"></i>
          </div>
        </div>
        <div className="list__item">
          {data.results.map((item) => (
            <CallItem key={item.id} item={item} callStatus={callStatus} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default CallList;
