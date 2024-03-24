import { useCallback, useEffect, useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import LinearProgress from "@mui/material/LinearProgress";
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
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [queryTerm, setQueryTerm] = useState("");
  const [movies, setMovies] = useState(
    JSON.parse(localStorage.getItem("movies")) || [],
  );
  const [plexMovies, setPlexMovies] = useState([]);

  const loadMovieList = useCallback(async (queryTerm = "") => {
    setIsLoading(true);

    const searchParams = new URLSearchParams({
      query_term: queryTerm,
      sort_by: "date_added",
      order_by: "desc",
    });
    const url = `${MOVIES_API_URL}?${searchParams}`;

    let moviesResponse;
    try {
      moviesResponse = await fetch(url);
    } catch (error) {
      console.error(error);
      setAlertMessage("An error occurred while loading the movie list.");
      setAlertSeverity("error");
      setIsLoading(false);
      return;
    }

    const { movies, plexMovies } = await moviesResponse.json();
    setMovies(movies);
    setPlexMovies(plexMovies);

    if (!queryTerm) {
      localStorage.setItem("movies", JSON.stringify(movies));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (alertMessage) {
      setTimeout(() => {
        setAlertMessage("");
      }, 500000);
    }
  }, [alertMessage]);

  const handleQueryTermChange = (event) => {
    setQueryTerm(event.target.value);
  };

  const handleSearch = async () => {
    loadMovieList(queryTerm);
  };

  useEffect(() => {
    loadMovieList();
  }, [loadMovieList]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme />
      {isLoading && (
        <Box position="fixed" top={0} left={0} right={0}>
          <LinearProgress />
        </Box>
      )}
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
        <MovieList movies={movies} />
        {plexMovies.length > 0 && (
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Plex Movies
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {plexMovies.map((movie) => (
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
        {alertMessage && (
          <Box
            padding={2}
            maxWidth="md"
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              margin: "auto",
            }}
          >
            <Alert
              severity={alertSeverity}
              variant="filled"
              onClose={() => setAlertMessage("")}
            >
              {alertMessage}
            </Alert>
          </Box>
        )}
        <Footer />
      </Container>
    </ThemeProvider>
  );
}

export default App;
