import { render, screen } from "@testing-library/react";
import MovieList from "./MovieList";

test("MovieList renders movie-list element", () => {
  render(<MovieList />);
  const movieListElement = screen.getByTestId("movie-list");
  expect(movieListElement).toBeInTheDocument();
});
