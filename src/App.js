import { useState } from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import createTheme from "@mui/material/styles/createTheme";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const MOVIES_API_URL = "https://movies.davidlwatsonjr.com/movies";

function App() {
  const [queryTerm, setQueryTerm] = useState("");
  const [movieList, setMovieList] = useState({});

  const handleQueryTermChange = (event) => {
    setQueryTerm(event.target.value);
  };

  const handleSearch = async () => {
    const url = `${MOVIES_API_URL}?query_term=${queryTerm}`;
    const moviesResponse = await fetch(url);
    const movies = await moviesResponse.json();
    setMovieList(movies);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme />
      <Container className="App">
        <h1>Movie List</h1>
        <TextField
          size="small"
          fullWidth
          placeholder="Search movies..."
          onChange={handleQueryTermChange}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
        <ul>
          {movieList?.undownloadedAvailableMovies?.map((movie) => (
            <li key={movie.url}>
              {movie.title} ({movie.year})
            </li>
          ))}
        </ul>
      </Container>
    </ThemeProvider>
  );
}

export default App;
