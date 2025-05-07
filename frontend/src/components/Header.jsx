import React  from 'react'
import { Link } from 'react-router-dom' 
import {Box, Typography, Button} from '@mui/material'
import {AppBar, Toolbar, IconButton, Menu, Container, Avatar, Tooltip, MenuItem} from '@mui/material'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import './Header.css'

const pages = ['Dashboard', 'Events', 'Announcements'];

const Header = () => {
  
  const name = localStorage.getItem("userName");
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  
  const handleOpenNavMenu = (event) => { 
    setAnchorElNav(event.currentTarget); }; 
  
  const handleOpenUserMenu = (event) => { 
    setAnchorElUser(event.currentTarget); }; 
  
  const handleCloseNavMenu = () => { 
    setAnchorElNav(null); };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
};

return (
  <AppBar position="static" id="t">
    <Container maxWidth="xl">
      <Toolbar disableGutters>
       <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Montserrat, sans-serif',
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MARIAN COLLEGE
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 500,
              fontSize: '25px',
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
              
            | Club Portal |
          </Typography>
          
          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button component={Link} to="/memberdashboard" id="headlink">Dashboard</Button>
            <Button component={Link} to="/events" id="headlink">Events</Button>
            <Button component={Link} to="/announcements" id="headlink">Announcements</Button>
          </Box>

          {/* Mobile Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu} // Open the menu when clicked
              color="inherit"
            >
              <MenuRoundedIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu} // Close the menu when clicking outside
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link 
                    to={page === 'Dashboard' ? '/' : `/${page.toLowerCase()}`} 
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {page}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Club search bar */}
          {/*<div style={{ margin: "15px", textAlign: "center" }}>
                  <TextField
                    id="evsearch"
                    label="Search by club or event name"
                    variant="outlined"
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ width: '70%' }}
                  />
                </div>
          
                <div className="events-container">
                  {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                      <EventCard key={event._id} event={event} />
                    ))
                  ) : (
                    <p style={{ textAlign: "center" }}>No result</p>
                  )}
                </div>*/}
          
          
          <h4 style={{ fontWeight: '500'}} >Welcome, {name}</h4>
          {/* User Settings */}
          <Box sx={{ flexGrow: 0 }}>            
            <Tooltip title="Open profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ml: 1}} alt="profile-img" />
              </IconButton>
            </Tooltip>
           
  
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
              <MenuItem  >
                <Link to={`/profile`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  Profile
                </Link>
              </MenuItem>
              
              <MenuItem 
              style={{ fontFamily: 'Montserrat' }} 
              onClick={() => {
                localStorage.removeItem("userRole");
                window.location.href = "/"; 
                }}>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;