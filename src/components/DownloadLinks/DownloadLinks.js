import PropTypes from "prop-types";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

function DownloadLinks({ links }) {
  const handleLinkClick = (link) => {
    navigator.clipboard.writeText(link.url);
  };

  return (
    <Stack direction="row" spacing={1}>
      {links.slice(0, 2).map((link) => (
        <Chip
          key={link.url}
          label={`${link.quality}.${link.type.toUpperCase()}`}
          size="small"
          onClick={() => handleLinkClick(link)}
        />
      ))}
    </Stack>
  );
}

DownloadLinks.propTypes = {
  links: PropTypes.arrayOf(Object),
};

export default DownloadLinks;
