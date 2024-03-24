import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import "./MovieList.css";
import DownloadLinks from "../DownloadLinks/DownloadLinks";

function MovieList({ movies }) {
  return (
    <List>
      {movies?.undownloadedAvailableMovies?.map((movie) => (
        <ListItem key={movie.url} disableGutters>
          <ListItemAvatar>
            <Avatar
              alt={movie.title}
              src={movie.medium_cover_image}
              sx={{ marginRight: 2, width: 64, height: 64 }}
            />
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
                ({movie.year}-{movie.language}){" - "}
                {movie.rating}/10
              </>
            }
            secondary={<DownloadLinks links={movie.torrents} />}
          ></ListItemText>
        </ListItem>
      ))}
    </List>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(Object),
};

export default MovieList;
