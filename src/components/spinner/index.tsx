// ** MUI Imports
import Box, { BoxProps } from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";
// import Logo from "src/common/logo";

const FallbackSpinner = ({ sx }: { sx?: BoxProps["sx"] }) => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        ...sx,
      }}
    >
      <img src="http://138.68.129.51:3000/assets/img/brand/demo_logo.png" />
      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  );
};

export default FallbackSpinner;
