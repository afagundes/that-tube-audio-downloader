import { render, screen } from '@testing-library/react';
import { Provider } from "react-redux";
import store from "./app/store";
import App from './App';

test('renders screen', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const title = screen.getByText("That Tube Downloader");
  expect(title).toBeInTheDocument();

  const description = screen.getByText("Copy the URL from that famous video stream platform and paste it below to download the Mp3.");
  expect(description).toBeInTheDocument();

  const input = screen.getByRole("textbox");
  expect(input).toBeInTheDocument();

  const playButton = screen.getByText("Play");
  expect(playButton).toBeInTheDocument();

  const downloadButton = screen.getByText("Download");
  expect(downloadButton).toBeInTheDocument();
});
