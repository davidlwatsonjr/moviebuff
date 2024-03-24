import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

function Footer() {
  return (
    <Box component="footer">
      A{" "}
      <Link
        underline="hover"
        href="https://davidlwatsonjr.com"
        target="_blank"
        rel="noreferrer"
      >
        davidlwatsonjr
      </Link>{" "}
      production.
    </Box>
  );
}

export default Footer;
