import PropTypes from "prop-types";
import CheckIcon from "@mui/icons-material/Check";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import DownloadLinks from "../DownloadLinks/DownloadLinks";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";

function MovieList({ movies }) {
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
    </List>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(Object),
};

export default MovieList;
