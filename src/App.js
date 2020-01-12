import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

const MINUTES = 60;
const HOURS = MINUTES * 60;

export const darkTheme = {
  color: 'hsl(210, 50%, 20%)',
  bgColor: 'hsl(210, 20%, 45%)'
};

export const lightTheme = {
  color: 'hsl(210, 30%, 40%)',
  bgColor: 'hsl(210, 20%, 95%)'
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
  border: 4px dotted ${props => props.theme.color};
  border-radius: 50%;
  height: 320px;
  width: 320px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TimerControls = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 120px;
  margin: 0 auto;
  width: 320px;
`;

const Button = styled.button`
  width: 80px;
  height: 40px;
  border: 0;
  outline: 0;
  border-radius: 80px;
  background-color: ${props => props.theme.color};
  color: ${props => props.theme.bgColor};
  cursor: pointer;
  letter-spacing: 1.2px;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  text-transform: capitalize;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.96);
  }
`;

export function TimerApp({ lightMode, setLightMode }) {
  const [active, setActive] = React.useState(false);
  const [seconds, setSeconds] = React.useState(0);
  const renderSeconds = (seconds % MINUTES).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
  const renderMinutes = Math.floor((seconds % HOURS) / MINUTES).toLocaleString(
    'en-US',
    {
      minimumIntegerDigits: 2,
      useGrouping: false
    }
  );
  const renderHours = Math.floor(seconds / HOURS).toLocaleString('en-US', {
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
      <button type="button" onClick={() => setLightMode(!lightMode)}>
        {lightMode ? 'dark' : 'light'} theme
      </button>
      <GlobalStyle />
      <TimerDisplay>
        <header>
          <h1 style={{ fontSize: '4em' }}>
            {renderHours}:{renderMinutes}:{renderSeconds}
          </h1>
        </header>
        <footer>
          <p style={{ fontSize: '2em', margin: 0 }}>HH:MM:SS</p>
        </footer>
      </TimerDisplay>
      <TimerControls>
        <Button type="button">lap</Button>
        <Button type="button" onClick={() => setActive(!active)}>
          {active ? 'pause' : 'start'}
        </Button>
        <Button type="reset" onClick={() => setSeconds(0)}>
          reset
        </Button>
      </TimerControls>
    </article>
  );
}

export default function App() {
  const [lightMode, setLightMode] = React.useState(true);
  return (
    <ThemeProvider theme={lightMode ? lightTheme : darkTheme}>
      <TimerApp setLightMode={setLightMode} lightMode={lightMode} />
    </ThemeProvider>
  );
}
