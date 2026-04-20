import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import DownloadLinks from "../DownloadLinks/DownloadLinks";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";

function MovieList({ movies, onLoadMore, isLoading, hasMore }) {
  const sentinelRef = useRef(null);
  // Use refs so the observer callback always reads the latest values
  // without needing to be re-registered on every render.
  const isLoadingRef = useRef(isLoading);
  const hasMoreRef = useRef(hasMore);

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !onLoadMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          hasMoreRef.current &&
          !isLoadingRef.current
        ) {
          onLoadMore();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [onLoadMore]);

  return (
    <List sx={{ marginTop: 1 }}>
      {movies?.map?.((movie) => (
        <ListItem key={movie.url} disableGutters disablePadding>
          <Accordion
            disableGutters
            square
            sx={{
              opacity: movie.plexEquivalent ? 0.333 : 1,
              width: "100%",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <ListItemAvatar>
                <Link
                  href={movie.url}
                  underline="hover"
                  target="_blank"
                  rel="noreferrer"
                  title={movie.title}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Avatar
                    alt={movie.title}
                    src={movie.medium_cover_image}
                    sx={{ marginRight: 2, width: 64, height: 64 }}
                  />
                </Link>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <>
                    <Link
                      href={movie.url}
                      underline="hover"
                      target="_blank"
                      rel="noreferrer"
                      title={movie.date_uploaded}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {movie.title}
                    </Link>{" "}
                    ({movie.year}-{movie.language}) ⭐ {movie.rating}
                  </>
                }
                secondary={<DownloadLinks links={movie.torrents} />}
              ></ListItemText>
            </AccordionSummary>
            <AccordionDetails>
              <Box component="p">
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  {movie.genres?.map((genre) => (
                    <Chip key={genre} label={genre} size="small" />
                  ))}
                </Stack>
              </Box>
              <Box>{movie.summary}</Box>
              <Box>Runtime: {movie.runtime} minutes</Box>
            </AccordionDetails>
          </Accordion>
        </ListItem>
      ))}
      {/* Sentinel element observed to trigger the next page load */}
      <Box ref={sentinelRef} aria-hidden="true">
        {isLoading && <LinearProgress />}
      </Box>
    </List>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(Object),
  onLoadMore: PropTypes.func,
  isLoading: PropTypes.bool,
  hasMore: PropTypes.bool,
};

export default MovieList;
