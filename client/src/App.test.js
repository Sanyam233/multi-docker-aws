import { render, screen } from "@testing-library/react";
import OtherPage from "./Pages/OtherPage";

test("renders learn react link", () => {
  render(<OtherPage />);
  const linkElement = screen.getByText(/other page/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders learn react link", () => {
  render(<OtherPage />);
  const linkElement = screen.getByText(/other page/i);
  expect(linkElement).toBeInTheDocument();
});
