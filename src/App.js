import { useCallback, useEffect, useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
import Footer from "./components/Footer/Footer";
import MovieList from "./components/MovieList/MovieList";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3391ff",
    },
  },
});

const MOVIES_API_URL = "https://movies.davidlwatsonjr.com/movies";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [queryTerm, setQueryTerm] = useState("");
  const [movies, setMovies] = useState({});

  const loadMovieList = useCallback(async (queryTerm) => {
    setIsLoading(true);
    const searchParams = new URLSearchParams({
      query_term: queryTerm,
      sort_by: "date_added",
      order_by: "desc",
    });
    const url = `${MOVIES_API_URL}?${searchParams}`;
    const moviesResponse = await fetch(url);
    setMovies(await moviesResponse.json());
    setIsLoading(false);
  }, []);

  const handleQueryTermChange = (event) => {
    setQueryTerm(event.target.value);
  };

  const handleSearch = async () => {
    setMovies({});
    loadMovieList(queryTerm);
  };

  useEffect(() => {
    loadMovieList("");
  }, [loadMovieList]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme />
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Typography component="h1" variant="h4" padding={2}>
          Movie List
        </Typography>
        <Stack spacing={2} direction="row">
          <TextField
            size="small"
            fullWidth
            placeholder="Search movies..."
            onChange={handleQueryTermChange}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                handleSearch();
                event.target.select();
              }
            }}
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Stack>
        {isLoading && <CircularProgress sx={{ marginTop: 2 }} />}
        {Array.isArray(movies?.plexMovies) && movies.plexMovies.length > 0 && (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Plex Movies
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {movies?.plexMovies?.map((movie) => (
                  <ListItem key={movie.url} disableGutters>
                    <ListItemText
                      primary={
                        <>
                          {movie.title} ({movie.year}){" - "}
                          {movie.audienceRating}/10
                        </>
                      }
                    ></ListItemText>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        )}
        <MovieList movies={movies} />
        <Footer />
      </Container>
    </ThemeProvider>
  );
}

export default App;
