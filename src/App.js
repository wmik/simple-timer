import React from "react";

export default function App() {
  const [seconds, setSeconds] = React.useState(0);
  const renderSeconds = (seconds % 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
  const renderMinutes = Math.floor(seconds / 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
  const renderHours = Math.floor(seconds / (60 * 60)).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
  React.useEffect(() => {
    let timer = setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });
  return (
    <section
      style={{
        textAlign: "center",
        fontFamily: "monospace",
        color: "#333",
        border: "1px solid #333",
        borderRadius: "50%",
        height: 320,
        width: 320,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <header>
        <h1 style={{ fontSize: "4em" }}>
          {renderHours}:{renderMinutes}:{renderSeconds}
        </h1>
      </header>
      <footer>
        <p style={{ fontSize: "2em", margin: 0 }}>HH:MM:SS</p>
      </footer>
    </section>
  );
}
