import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const FilterDialog = ({
  open,
  onClose,
  genres,
  selectedGenre,
  onGenreChange,
  ratings,
  minimumRating,
  onMinimumRatingChange,
}) => (
  <Dialog fullScreen open={open} onClose={onClose}>
    <DialogTitle>Filters</DialogTitle>
    <IconButton
      aria-label="close"
      onClick={onClose}
      sx={{
        position: "absolute",
        right: 8,
        top: 8,
        color: (theme) => theme.palette.grey[500],
      }}
    >
      <CloseIcon />
    </IconButton>
    <DialogContent>
      <List>
        {genres && onGenreChange && (
          <ListItem>
            <FormControl fullWidth>
              <InputLabel id="genre-select-label">Genre</InputLabel>
              <Select
                value={selectedGenre}
                label="Genre"
                labelId="genre-select-label"
              >
                {genres.map((option) => {
                  return (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      onClick={() => onGenreChange(option.value)}
                    >
                      {option.text}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </ListItem>
        )}
        {ratings && onMinimumRatingChange && (
          <ListItem>
            <FormControl fullWidth>
              <InputLabel id="minimum_rating-select-label">
                Minimum Rating
              </InputLabel>
              <Select
                value={minimumRating}
                fullWidth
                label="Minimum Rating"
                labelId="minimum_rating-select-label"
              >
                {ratings.map((option) => {
                  return (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      onClick={() => onMinimumRatingChange(option.value)}
                    >
                      {option.text}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </ListItem>
        )}
      </List>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
  </Dialog>
);

FilterDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  genres: PropTypes.arrayOf(Object),
  selectedGenre: PropTypes.string,
  onGenreChange: PropTypes.func,
  ratings: PropTypes.arrayOf(Object),
  minimumRating: PropTypes.number,
  onMinimumRatingChange: PropTypes.func,
};

export default FilterDialog;
