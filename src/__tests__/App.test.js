import { act, render, screen, fireEvent } from '@testing-library/react';
import App from 'src/App';

async function renderApp() {
  await act(async () => {
    render(<App />);
    await vi.dynamicImportSettled();
  });
}

test('There is an app bar with the title', async () => {
  await renderApp();
  const heading = await screen.findByRole('heading', { name: /Watermarble Witchcraft/i });
  expect(heading).toBeInTheDocument();
});
