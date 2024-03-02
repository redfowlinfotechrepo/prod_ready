import * as React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const drawerWidth = 240;
const navItems = [
  { name: "Dashboard", link: "/admin/dashboard" },
  { name: "Center", link: "/admin/center" },
  { name: "Logout" },
];

const AdminNavbar = ({ window }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate(); // Get the navigate function

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleDrawerItem = (item) => {
    setMobileOpen(false); // Close the drawer after clicking an item

    if (item === "Logout") {
      // Handle logout by clearing localStorage and navigating to "/login"
      localStorage.clear();
      navigate("/login"); // Use navigate to go to the "/login" route
    }
  };

  const drawer = (
    <Box sx={{ display: { xs: "none", sm: "block" } }}>
      {navItems.map((item) => (
        <React.Fragment key={item.name}>
          {item.name === "Logout" ? (
            <Button
              sx={{ color: "#fff" }}
              onClick={() => handleDrawerItem(item.name)}
            >
              {item.name}
            </Button>
          ) : (
            <Link
              to={item.link}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button
                sx={{ color: "#fff" }}
                onClick={() => handleDrawerItem(item.name)}
              >
                {item.name}
              </Button>
            </Link>
          )}
        </React.Fragment>
      ))}
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "#5F8D4E" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            LenderApp
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                sx={{ color: "#fff" }}
                onClick={() => handleDrawerItem(item.name)}
              >
                <Link
                  to={item.link}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {item.name}
                </Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

AdminNavbar.propTypes = {
  window: PropTypes.func,
};

export default AdminNavbar;
