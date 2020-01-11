import React from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

const MINUTES = 60;
const HOURS = MINUTES * 60;

const darkTheme = {
  color: "hsl(210, 50%, 20%)",
  bgColor: "hsl(210, 20%, 45%)"
};

const lightTheme = {
  color: "hsl(210, 30%, 40%)",
  bgColor: "hsl(210, 20%, 95%)"
};

const GlobalStyle = createGlobalStyle`
body {
   background-color: ${props => props.theme.bgColor};
   transition: all 0.3s ease-in-out;
}
`;

const TimerDisplay = styled.section`
  text-align: center;
  font-family: monospace;
  color: ${props => props.theme.color};
  border: 4px solid ${props => props.theme.color};
  border-radius: 50%;
  height: 320px;
  width: 320px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function TimerApp({ lightMode, setLightMode }) {
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
      <TimerDisplay>
        <header>
          <h1 style={{ fontSize: "4em" }}>
            {renderHours}:{renderMinutes}:{renderSeconds}
          </h1>
        </header>
        <footer>
          <p style={{ fontSize: "2em", margin: 0 }}>HH:MM:SS</p>
        </footer>
      </TimerDisplay>
      <button type="button" onClick={() => setActive(!active)}>
        {active ? "pause" : "start"}
      </button>
      <button type="reset" onClick={() => setSeconds(0)}>
        reset
      </button>
      <button type="button" onClick={() => setLightMode(!lightMode)}>
        {lightMode ? "dark" : "light"} theme
      </button>
    </article>
  );
}

export default function App() {
  const [lightMode, setLightMode] = React.useState(true);
  return (
    <ThemeProvider theme={lightMode ? lightTheme : darkTheme}>
      <GlobalStyle />
      <TimerApp setLightMode={setLightMode} lightMode={lightMode} />
    </ThemeProvider>
  );
}
