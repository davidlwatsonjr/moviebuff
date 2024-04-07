import PropTypes from "prop-types";
import CheckIcon from "@mui/icons-material/Check";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DownloadLinks from "../DownloadLinks/DownloadLinks";

function MovieList({ movies, showDownloaded }) {
  return (
    <List>
      {movies?.map?.((movie) => {
        if (!showDownloaded && movie.plexEquivalent) {
          return null;
        }

        return (
          <ListItem key={movie.url} disableGutters>
            <ListItemAvatar>
              <Link
                href={movie.url}
                underline="hover"
                target="_blank"
                rel="noreferrer"
                title={movie.title}
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
                  >
                    {movie.title}
                  </Link>{" "}
                  ({movie.year}-{movie.language}) ⭐ {movie.rating}
                </>
              }
              secondary={<DownloadLinks links={movie.torrents} />}
            ></ListItemText>
            {movie.plexEquivalent && <CheckIcon color="success" />}
          </ListItem>
        );
      })}
    </List>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(Object),
  showDownloaded: PropTypes.bool,
};

export default MovieList;
