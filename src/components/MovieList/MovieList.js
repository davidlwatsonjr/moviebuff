import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import "./MovieList.css";

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
                <a
                  href={movie.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={movie.date_uploaded}
                >
                  {movie.title}
                </a>{" "}
                ({movie.year}-{movie.language}){" - "}
                {movie.rating}/10
              </>
            }
            secondary={`${
              movie.highestQualityTorrent?.quality
            }.${movie.highestQualityTorrent?.type?.toUpperCase()}`}
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
