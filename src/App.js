import React from "react";

const MINUTES = 60;
const HOURS = MINUTES * 60;

export default function App() {
  const [active, setActive] = React.useState(false);
  const [seconds, setSeconds] = React.useState(0);
  const renderSeconds = (seconds % MINUTES).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
  const renderMinutes = Math.floor(seconds / MINUTES).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
  const renderHours = Math.floor(seconds / HOURS).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
  React.useEffect(() => {
    if (!active) return;
    let timer = setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });
  return (
    <article>
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
      <button type="button" onClick={() => setActive(!active)}>
        {active ? "pause" : "start"}
      </button>
      <button type="reset" onClick={() => setSeconds(0)}>
        reset
      </button>
    </article>
  );
}
