import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TimerApp, lightTheme } from './App';

test('TimerApp renders without crashing', async () => {
  const setLightMode = jest.fn();
  const { findByText } = render(
    <ThemeProvider theme={lightTheme}>
      <TimerApp lightMode={true} setLightMode={setLightMode} />
    </ThemeProvider>
  );
  expect(await findByText(/00:00:00/, { selector: 'h1' })).toBeVisible();
  expect(await findByText(/HH:MM:SS/, { selector: 'p' })).toBeVisible();
  expect(await findByText(/lap/, { selector: 'button' })).toBeVisible();
  expect(await findByText(/start/, { selector: 'button' })).toBeVisible();
  expect(await findByText(/reset/, { selector: 'button' })).toBeVisible();
  expect(await findByText(/dark theme/, { selector: 'button' })).toBeVisible();
});
