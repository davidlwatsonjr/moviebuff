import { useCallback, useEffect, useRef, useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";
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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
import Footer from "./components/Footer/Footer";
import MovieList from "./components/MovieList/MovieList";
import FilterDialog from "./components/FilterDialog/FilterDialog";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3391ff",
    },
  },
});

const MOVIES_API_URL = "https://movies.davidlwatsonjr.com/movies";
// const MOVIES_API_URL = "http://localhost:8080/movies";

const MINIMUM_RATING_OPTIONS = new Array(10)
  .fill()
  .map((_, i) => ({ value: i, text: `⭐ ${i}.0+` }));

const GENRE_OPTIONS = [
  { value: "DEFAULT", text: "All" },
  { value: "Action", text: "Action" },
  { value: "Adventure", text: "Adventure" },
  { value: "Animation", text: "Animation" },
  { value: "Biography", text: "Biography" },
  { value: "Comedy", text: "Comedy" },
  { value: "Crime", text: "Crime" },
  { value: "Documentary", text: "Documentary" },
  { value: "Drama", text: "Drama" },
  { value: "Family", text: "Family" },
  { value: "Fantasy", text: "Fantasy" },
  { value: "Film-Noir", text: "Film Noir" },
  { value: "Game-Show", text: "Game Show" },
  { value: "History", text: "History" },
  { value: "Horror", text: "Horror" },
  { value: "Music", text: "Music" },
  { value: "Musical", text: "Musical" },
  { value: "Mystery", text: "Mystery" },
  { value: "News", text: "News" },
  { value: "Reality-TV", text: "Reality TV" },
  { value: "Romance", text: "Romance" },
  { value: "Sci-Fi", text: "Sci-Fi" },
  { value: "Short", text: "Short" },
  { value: "Sport", text: "Sport" },
  { value: "Talk-Show", text: "Talk Show" },
  { value: "Thriller", text: "Thriller" },
  { value: "War", text: "War" },
  { value: "Western", text: "Western" },
];

const LANGUAGE_OPTIONS = [
  { value: "DEFAULT", text: "All" },
  { value: "ab", text: "Abkhazian" },
  { value: "aa", text: "Afar" },
  { value: "af", text: "Afrikaans" },
  { value: "ak", text: "Akan" },
  { value: "sq", text: "Albanian" },
  { value: "am", text: "Amharic" },
  { value: "ar", text: "Arabic" },
  { value: "an", text: "Aragonese" },
  { value: "hy", text: "Armenian" },
  { value: "as", text: "Assamese" },
  { value: "av", text: "Avar" },
  { value: "ae", text: "Avestan" },
  { value: "ay", text: "Aymara" },
  { value: "az", text: "Azerbaijani" },
  { value: "bm", text: "Bambara" },
  { value: "ba", text: "Bashkir" },
  { value: "eu", text: "Basque" },
  { value: "be", text: "Belarusian" },
  { value: "bn", text: "Bengali" },
  { value: "bi", text: "Bislama" },
  { value: "nb", text: "Bokmål" },
  { value: "bs", text: "Bosnian" },
  { value: "br", text: "Breton" },
  { value: "bg", text: "Bulgarian" },
  { value: "my", text: "Burmese" },
  { value: "ca", text: "Catalan" },
  { value: "km", text: "Central Khmer" },
  { value: "ch", text: "Chamorro" },
  { value: "ce", text: "Chechen" },
  { value: "ny", text: "Chichewa" },
  { value: "zh", text: "Chinese" },
  { value: "cv", text: "Chuvash" },
  { value: "kw", text: "Cornish" },
  { value: "co", text: "Corsican" },
  { value: "cr", text: "Cree" },
  { value: "hr", text: "Croatian" },
  { value: "cs", text: "Czech" },
  { value: "da", text: "Danish" },
  { value: "dv", text: "Dhivehi" },
  { value: "dz", text: "Dzongkha" },
  { value: "en", text: "English" },
  { value: "eo", text: "Esperanto" },
  { value: "et", text: "Estonian" },
  { value: "ee", text: "Ewe" },
  { value: "fo", text: "Faroese" },
  { value: "fj", text: "Fijian" },
  { value: "fi", text: "Finnish" },
  { value: "nl", text: "Flemish dialects" },
  { value: "fr", text: "French" },
  { value: "ff", text: "Fulah" },
  { value: "gl", text: "Galician" },
  { value: "lg", text: "Ganda" },
  { value: "ka", text: "Georgian" },
  { value: "de", text: "German" },
  { value: "ki", text: "Gikuyu" },
  { value: "el", text: "Greek" },
  { value: "kl", text: "Greenlandic" },
  { value: "gn", text: "Guarani" },
  { value: "gu", text: "Gujarati" },
  { value: "ht", text: "Haitian Creole" },
  { value: "ha", text: "Hausa" },
  { value: "he", text: "Hebrew" },
  { value: "hz", text: "Herero" },
  { value: "hi", text: "Hindi" },
  { value: "ho", text: "Hiri Motu" },
  { value: "hu", text: "Hungarian" },
  { value: "is", text: "Icelandic" },
  { value: "io", text: "Ido (language)" },
  { value: "ig", text: "Igbo" },
  { value: "id", text: "Indonesian" },
  { value: "ia", text: "Interlingua" },
  { value: "ie", text: "Interlingue" },
  { value: "iu", text: "Inuktitut" },
  { value: "ik", text: "Inupiaq" },
  { value: "ga", text: "Irish" },
  { value: "it", text: "Italian" },
  { value: "ja", text: "Japanese" },
  { value: "jv", text: "Javanese" },
  { value: "kn", text: "Kannada" },
  { value: "kr", text: "Kanuri" },
  { value: "ks", text: "Kashmiri" },
  { value: "kk", text: "Kazakh" },
  { value: "rw", text: "Kinyarwanda" },
  { value: "ky", text: "Kirghiz" },
  { value: "kv", text: "Komi" },
  { value: "kg", text: "Kongo" },
  { value: "ko", text: "Korean" },
  { value: "kj", text: "Kuanyama" },
  { value: "ku", text: "Kurdish" },
  { value: "lo", text: "Lao" },
  { value: "la", text: "Latin" },
  { value: "lv", text: "Latvian" },
  { value: "li", text: "Limburgan" },
  { value: "ln", text: "Lingala" },
  { value: "lt", text: "Lithuanian" },
  { value: "lu", text: "Luba-Katanga" },
  { value: "lb", text: "Luxembourgish" },
  { value: "mk", text: "Macedonian" },
  { value: "mg", text: "Malagasy" },
  { value: "ms", text: "Malay" },
  { value: "ml", text: "Malayalam" },
  { value: "mt", text: "Maltese" },
  { value: "gv", text: "Manx" },
  { value: "mi", text: "Māori" },
  { value: "mr", text: "Marathi" },
  { value: "mh", text: "Marshallese" },
  { value: "ro", text: "Moldovan" },
  { value: "mn", text: "Mongolian" },
  { value: "na", text: "Nauru" },
  { value: "nv", text: "Navajo" },
  { value: "ng", text: "Ndonga" },
  { value: "ne", text: "Nepali" },
  { value: "nd", text: "North Ndebele" },
  { value: "se", text: "Northern Sami" },
  { value: "no", text: "Norwegian" },
  { value: "nn", text: "Nynorsk" },
  { value: "oc", text: "Occitan" },
  { value: "oj", text: "Ojibwa" },
  { value: "cu", text: "Old Church Slavonic" },
  { value: "or", text: "Oriya" },
  { value: "om", text: "Oromo" },
  { value: "os", text: "Ossetian" },
  { value: "pi", text: "Pali" },
  { value: "ps", text: "Pashto" },
  { value: "fa", text: "Persian" },
  { value: "pl", text: "Polish" },
  { value: "pt", text: "Portuguese" },
  { value: "pa", text: "Punjabi" },
  { value: "qu", text: "Quechua" },
  { value: "rm", text: "Romansh" },
  { value: "rn", text: "Rundi" },
  { value: "ru", text: "Russian" },
  { value: "sm", text: "Samoan" },
  { value: "sg", text: "Sango" },
  { value: "sa", text: "Sanskrit" },
  { value: "sc", text: "Sardinian" },
  { value: "gd", text: "Scottish Gaelic" },
  { value: "sr", text: "Serbian" },
  { value: "sn", text: "Shona" },
  { value: "ii", text: "Sichuan Yi" },
  { value: "sd", text: "Sindhi" },
  { value: "si", text: "Sinhala" },
  { value: "sk", text: "Slovak" },
  { value: "sl", text: "Slovene" },
  { value: "so", text: "Somali" },
  { value: "st", text: "Sotho" },
  { value: "nr", text: "South Ndebele" },
  { value: "es", text: "Spanish" },
  { value: "bo", text: "Standard Tibetan" },
  { value: "su", text: "Sundanese" },
  { value: "sw", text: "Swahili" },
  { value: "ss", text: "Swazi" },
  { value: "sv", text: "Swedish" },
  { value: "tl", text: "Tagalog" },
  { value: "ty", text: "Tahitian" },
  { value: "tg", text: "Tajik" },
  { value: "ta", text: "Tamil" },
  { value: "tt", text: "Tatar" },
  { value: "te", text: "Telugu" },
  { value: "th", text: "Thai" },
  { value: "ti", text: "Tigrinya" },
  { value: "to", text: "Tongan" },
  { value: "ts", text: "Tsonga" },
  { value: "tn", text: "Tswana" },
  { value: "tr", text: "Turkish" },
  { value: "tk", text: "Turkmen" },
  { value: "tw", text: "Twi" },
  { value: "ug", text: "Uighur" },
  { value: "uk", text: "Ukrainian" },
  { value: "ur", text: "Urdu" },
  { value: "uz", text: "Uzbek" },
  { value: "ve", text: "Venda" },
  { value: "vi", text: "Vietnamese" },
  { value: "vo", text: "Volapük" },
  { value: "wa", text: "Walloon" },
  { value: "cy", text: "Welsh" },
  { value: "fy", text: "West Frisian" },
  { value: "wo", text: "Wolof" },
  { value: "xh", text: "Xhosa" },
  { value: "yi", text: "Yiddish" },
  { value: "yo", text: "Yoruba" },
  { value: "za", text: "Zhuang" },
  { value: "zu", text: "Zulu" },
];

const SORT_BY_OPTIONS = [
  { value: "title", text: "Title", defaultOrderBy: "asc" },
  { value: "year", text: "Year", defaultOrderBy: "desc" },
  { value: "rating", text: "Rating", defaultOrderBy: "desc" },
  { value: "like_count", text: "Like Count", defaultOrderBy: "desc" },
  { value: "date_added", text: "Date Added", defaultOrderBy: "desc" },
];

const defaultFilters = {
  minimumRating: 0,
  genre: "DEFAULT",
  language: "DEFAULT",
  sortBy: "date_added",
  orderBy: "desc",
};

const persistedMovies = JSON.parse(localStorage.getItem("movieBuffMovies"));
const persistMovies = (movies) =>
  localStorage.setItem("movieBuffMovies", JSON.stringify(movies));

// --- URL ↔ state helpers ---

// Map: URL param key → state field name
// q, min_rating, genre, lang, sort, order
const readUrlState = (search = window.location.search) => {
  const params = new URLSearchParams(search);
  return {
    q: params.get("q") ?? "",
    minimumRating: params.has("min_rating")
      ? Number(params.get("min_rating"))
      : null,
    genre: params.get("genre"),
    language: params.get("lang"),
    sortBy: params.get("sort"),
    orderBy: params.get("order"),
  };
};

const buildUrlSearch = ({ q, minimumRating, genre, language, sortBy, orderBy }) => {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (minimumRating !== defaultFilters.minimumRating)
    params.set("min_rating", minimumRating);
  if (genre !== defaultFilters.genre) params.set("genre", genre);
  if (language !== defaultFilters.language) params.set("lang", language);
  if (sortBy !== defaultFilters.sortBy) params.set("sort", sortBy);
  if (orderBy !== defaultFilters.orderBy) params.set("order", orderBy);
  const str = params.toString();
  return str ? `?${str}` : "";
};

// --- Last-session restoration ---
// Runs at module load time, before React renders anything.
// If the user lands on the base URL (no params), check localStorage for a
// previously saved search string and redirect to it.  replace() is used so
// the bare URL is not pushed onto the history stack — pressing Back skips
// straight past it to wherever the user came from.
if (!window.location.search) {
  const lastSearch = localStorage.getItem("movieBuffLastSearch");
  if (lastSearch) {
    window.location.replace(window.location.pathname + lastSearch);
  }
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  // Priority for initial values: URL params > defaultFilters
  const [queryTerm, setQueryTerm] = useState(() => readUrlState().q);
  const [searchedQueryTerm, setSearchedQueryTerm] = useState(
    () => readUrlState().q,
  );
  const [minimumRating, setMinimumRating] = useState(
    () => readUrlState().minimumRating ?? defaultFilters.minimumRating,
  );
  const [genre, setGenre] = useState(
    () => readUrlState().genre ?? defaultFilters.genre,
  );
  const [language, setLanguage] = useState(
    () => readUrlState().language ?? defaultFilters.language,
  );
  const [sortBy, setSortBy] = useState(
    () => readUrlState().sortBy ?? defaultFilters.sortBy,
  );
  const [orderBy, setOrderBy] = useState(
    () => readUrlState().orderBy ?? defaultFilters.orderBy,
  );
  const [movies, setMovies] = useState(persistedMovies);
  const [plexMovies, setPlexMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const isLoadingRef = useRef(false);

  const loadMovieList = useCallback(
    async (pageNum) => {
      if (isLoadingRef.current) return;
      isLoadingRef.current = true;
      setIsLoading(true);

      const searchParams = new URLSearchParams({
        query_term: searchedQueryTerm,
        minimum_rating: minimumRating,
        genre: genre === defaultFilters.genre ? "" : genre,
        language: language === defaultFilters.language ? "" : language,
        sort_by: sortBy,
        order_by: orderBy,
        page: pageNum,
      });
      const url = `${MOVIES_API_URL}?${searchParams}`;

      let moviesResponse;
      try {
        moviesResponse = await fetch(url);
      } catch (error) {
        console.error(error);
        setAlertMessage("An error occurred while loading the movie list.");
        setAlertSeverity("error");
        isLoadingRef.current = false;
        setIsLoading(false);
        return;
      }

      const { movies: newMovies, plexMovies: newPlexMovies } =
        await moviesResponse.json();

      if (pageNum === 1) {
        setMovies(newMovies);
        setPlexMovies(newPlexMovies);
        persistMovies(newMovies);
      } else {
        setMovies((prev) => [...prev, ...newMovies]);
      }

      setHasMore(newMovies.length > 0);

      isLoadingRef.current = false;
      setIsLoading(false);
    },
    [searchedQueryTerm, minimumRating, genre, language, sortBy, orderBy],
  );

  // Fresh load whenever filters/search change.
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    loadMovieList(1);
  }, [loadMovieList]);

  // Append the next page when `page` increments past 1.
  useEffect(() => {
    if (page > 1) {
      loadMovieList(page);
    }
    // Intentionally omitting loadMovieList: this effect is only for
    // pagination triggers. Filter changes are handled by the effect above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadNextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  // Keep localStorage in sync with the active search/filter state.
  // The module-level redirect reads this key when the user next visits the
  // base URL, restoring their last session transparently.
  // When all values match defaultFilters, buildUrlSearch returns "" and the
  // key is removed — preventing a redirect for a fully-reset state.
  useEffect(() => {
    const search = buildUrlSearch({
      q: searchedQueryTerm,
      minimumRating,
      genre,
      language,
      sortBy,
      orderBy,
    });
    if (search) {
      localStorage.setItem("movieBuffLastSearch", search);
    } else {
      localStorage.removeItem("movieBuffLastSearch");
    }
  }, [searchedQueryTerm, minimumRating, genre, language, sortBy, orderBy]);

  useEffect(() => {
    if (alertMessage) {
      setTimeout(() => {
        setAlertMessage("");
      }, 5000);
    }
  }, [alertMessage]);

  // Sync all state back from the URL when the user navigates with Back/Forward.
  useEffect(() => {
    const handlePopState = () => {
      const {
        q,
        minimumRating: minR,
        genre: g,
        language: lang,
        sortBy: sort,
        orderBy: ord,
      } = readUrlState();
      setQueryTerm(q);
      setSearchedQueryTerm(q);
      setMinimumRating(minR ?? defaultFilters.minimumRating);
      setGenre(g ?? defaultFilters.genre);
      setLanguage(lang ?? defaultFilters.language);
      setSortBy(sort ?? defaultFilters.sortBy);
      setOrderBy(ord ?? defaultFilters.orderBy);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleQueryTermChange = (event) => {
    setQueryTerm(event.target.value);
  };

  const handleSearch = () => {
    setSearchedQueryTerm(queryTerm);
    // Search submissions create a new history entry so Back returns to the
    // previous search.
    const search = buildUrlSearch({
      q: queryTerm,
      minimumRating,
      genre,
      language,
      sortBy,
      orderBy,
    });
    window.history.pushState(null, "", search || window.location.pathname);
  };

  const handleSortByChange = (sortByOption) => {
    const newOrderBy =
      sortByOption.value === sortBy
        ? orderBy === "asc"
          ? "desc"
          : "asc"
        : sortByOption.defaultOrderBy;
    const newSortBy = sortByOption.value;
    setOrderBy(newOrderBy);
    setSortBy(newSortBy);
    // Filter/sort tweaks replace the current entry; no new Back-button stop.
    const search = buildUrlSearch({
      q: searchedQueryTerm,
      minimumRating,
      genre,
      language,
      sortBy: newSortBy,
      orderBy: newOrderBy,
    });
    window.history.replaceState(null, "", search || window.location.pathname);
  };

  const handleGenreChange = (newGenre) => {
    setGenre(newGenre);
    const search = buildUrlSearch({
      q: searchedQueryTerm,
      minimumRating,
      genre: newGenre,
      language,
      sortBy,
      orderBy,
    });
    window.history.replaceState(null, "", search || window.location.pathname);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    const search = buildUrlSearch({
      q: searchedQueryTerm,
      minimumRating,
      genre,
      language: newLanguage,
      sortBy,
      orderBy,
    });
    window.history.replaceState(null, "", search || window.location.pathname);
  };

  const handleMinimumRatingChange = (newMinimumRating) => {
    setMinimumRating(newMinimumRating);
    const search = buildUrlSearch({
      q: searchedQueryTerm,
      minimumRating: newMinimumRating,
      genre,
      language,
      sortBy,
      orderBy,
    });
    window.history.replaceState(null, "", search || window.location.pathname);
  };

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
            autoFocus
            placeholder="Search movies..."
            value={queryTerm}
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
        <Stack spacing={2} direction="row" justifyContent="end" marginTop={2}>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={() => setIsFilterDialogOpen(true)}
          >
            Filters
          </Button>
          <FilterDialog
            open={isFilterDialogOpen}
            onClose={() => setIsFilterDialogOpen(false)}
            genres={GENRE_OPTIONS}
            selectedGenre={genre}
            onGenreChange={handleGenreChange}
            languages={LANGUAGE_OPTIONS}
            selectedLanguage={language}
            onLanguageChange={handleLanguageChange}
            ratings={MINIMUM_RATING_OPTIONS}
            minimumRating={minimumRating}
            onMinimumRatingChange={handleMinimumRatingChange}
          />
          <Select value={sortBy}>
            {SORT_BY_OPTIONS.map((option) => {
              const DirectionIcon =
                orderBy === "asc" ? ArrowUpwardIcon : ArrowDownwardIcon;

              return (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  onClick={() => handleSortByChange(option)}
                >
                  {option.text}{" "}
                  {option.value === sortBy ? (
                    <DirectionIcon fontSize="inherit" />
                  ) : null}
                </MenuItem>
              );
            })}
          </Select>
        </Stack>
        <MovieList
          movies={movies}
          isLoading={isLoading}
          hasMore={hasMore}
          onLoadMore={loadNextPage}
        />
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
