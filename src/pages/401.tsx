// ** React Imports
import { ReactNode } from "react";

// ** Next Import
import Link from "next/link";

// ** MUI Components
import Box, { BoxProps } from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

// ** Layout Import
// import BlankLayout from "src/@core/layouts/BlankLayout";

// ** Demo Imports
// import FooterIllustrations from "src/views/pages/misc/FooterIllustrations";

// ** Styled Components
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "90vw",
  },
}));

const Img = styled("img")(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    height: 450,
    marginTop: theme.spacing(10),
  },
  [theme.breakpoints.down("md")]: {
    height: 400,
  },
  [theme.breakpoints.up("lg")]: {
    marginTop: theme.spacing(20),
  },
}));

const Error401 = () => {
  return (
    <Box className="content-center">
      <Box
        sx={{
          p: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <BoxWrapper sx={{ mb: -8 }}>
          <Typography variant="h2" sx={{ mb: 1 }}>
            You are not authorized!
          </Typography>
          <Typography variant="h6">
            You do not have permission to view this page using the credentials
            that you have provided while login.
          </Typography>
          <Typography sx={{ mb: 6 }} variant="h6">
            Please contact your site administrator.
          </Typography>
          <Button href="/dashboard" component={Link} variant="contained">
            Back to Home
          </Button>
        </BoxWrapper>
        <Img height="700" alt="error-illustration" src="/assets/img/401.png" />
      </Box>
    </Box>
  );
};
Error401.guestGuard = false;
export default Error401;
