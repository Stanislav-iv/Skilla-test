import { useGetRecordQuery } from "../../redux/callApi";
import React, { useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./CallItem.scss";
const CallItem = ({ item }) => {
  const audioPlayerRef = useRef(null);
  const handleStopAudio = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.audio.current.pause();
      audioPlayerRef.current.audio.current.currentTime = 0;
    }
  };
  const time = item.date.slice(11, 16);
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  const shouldFetchRecord = !!item.record;
  const { data: audioUrl, isLoading } = useGetRecordQuery(
    {
      recordId: item.record,
      partnershipId: item.partnership_id,
    },
    {
      skip: !shouldFetchRecord,
    }
  );

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="item">
      <div className="item__line"></div>
      <div className="item__info">
        <div className="item__status">
          {((item.in_out === 1) & (item.status === "Не дозвонился") && (
            <img src="/failCall.svg" alt="in" />
          )) ||
            null}
          {((item.in_out === 0) & (item.status === "Не дозвонился") && (
            <img src="/src/assets/notCall.svg" alt="not" />
          )) ||
            null}
          {((item.in_out === 1) & (item.status === "Дозвонился") && (
            <img src="src\assets\incomingCall.svg" alt="in" />
          )) ||
            null}
          {((item.in_out === 0) & (item.status === "Дозвонился") && (
            <img src="src\assets\outgoingCall.svg" alt="out" />
          )) ||
            null}
        </div>

        <div className="item__time"> {time}</div>

        <img className="item__ava" src={item.person_avatar} alt="ava" />
        <div className="item__number">{item.from_number}</div>
        <div className="item__source"> {item.source}</div>

        {shouldFetchRecord ? (
          isLoading ? (
            <p>Загрузка записи...</p>
          ) : (
            <div className="item__record">
              <div className="custom-audio-player">
                <div className="audio-duration">{formatTime(item.time)}</div>

                <AudioPlayer
                  ref={audioPlayerRef}
                  src={audioUrl}
                  showJumpControls={false}
                  customAdditionalControls={[]}
                  customVolumeControls={[]}
                  layout="horizontal-reverse"
                  showDownloadProgress={false}
                  customIcons={{
                    play: <img src="src\assets\play.svg" alt="Play" />,
                    pause: <img src="src\assets\play.svg" alt="Pause" />,
                  }}
                />

                <a href={audioUrl} download className="download-btn">
                  <img src="src\assets\download.svg" alt="Download" />
                </a>

                <button className="close-btn" onClick={handleStopAudio}>
                  <img src="src\assets\close.svg" alt="Close" />
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="item__duration">{formatTime(item.time)}</div>
        )}
      </div>
    </div>
  );
};
export default CallItem;
