import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Avatar,
  Tooltip,
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { HomeRounded, GroupsRounded, EventRounded, CampaignRounded, LogoutRounded } from '@mui/icons-material';

const Sidebar = () => {
  const [isSidebarExpanded, setSidebarExpanded] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': {
            width: isSidebarExpanded ? 300 : 73, // Dynamic width based on expansion
            boxSizing: 'border-box',
            background: 'linear-gradient(to bottom, #0c2d55, #9b0302 )',
            overflowX: 'hidden', // Prevent content overflow
            transition: 'width 0.3s ease', // Smooth transition for width
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px 16px' }}>
          <IconButton onClick={toggleSidebar} sx={{ color: 'white' }}>
            <MenuRoundedIcon />
          </IconButton>
          {isSidebarExpanded && (
            <Box sx={{ marginTop: 5.3 }}>
              <Typography
                variant="h6"
                component="a"
                href="#"
                sx={{
                  fontFamily: 'Montserrat, sans-serif',
                  letterSpacing: '.1rem',
                  color: 'white',
                  textDecoration: 'none',
                  marginTop: 1,
                }}
              >
                MARIAN COLLEGE
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  letterSpacing: '.05rem',
                  color: 'white',
                  marginTop: 1,
                }}
              >
                Club Portal
              </Typography>
            </Box>
          )}
        </Box>

        <List>
        
        <ListItem onClick={() => window.location.href = '/AdminDashboard'} button id="asbutton">  
            <Tooltip title="Dashboard" placement="right">
              <HomeRounded sx={{ color: 'white', marginLeft: 1  }} />
            </Tooltip>
            {isSidebarExpanded && (
              <ListItemText primary="Dashboard" sx={{ color: 'white', marginLeft: isSidebarExpanded ? 2 : 0 }} />
            )}
          </ListItem>

          <ListItem onClick={() => window.location.href = '/AdminMembers'} button id="asbutton">  
            <Tooltip title="Members" placement="right">
              <GroupsRounded sx={{ color: 'white', marginLeft: 1  }} />
            </Tooltip>
            {isSidebarExpanded && (
              <ListItemText primary="Manage Members" sx={{ color: 'white', marginLeft: isSidebarExpanded ? 2 : 0 }} />
            )}
          </ListItem>

          <ListItem onClick={() => window.location.href = '/AdminEvents'} button id="asbutton">  
            <Tooltip title="Events" placement="right">
              <EventRounded sx={{ color: 'white', marginLeft: 1  }} />
            </Tooltip>
            {isSidebarExpanded && (
              <ListItemText primary="Manage Events" sx={{ color: 'white', marginLeft: isSidebarExpanded ? 2 : 0 }} />
            )}
          </ListItem>

          <ListItem onClick={() => window.location.href = '/AdminAnno'} button id="asbutton">  
            <Tooltip title="Announcements" placement="right">
              <CampaignRounded sx={{ color: 'white', marginLeft: 1  }} />
            </Tooltip>
            {isSidebarExpanded && (
              <ListItemText primary="Manage Announcements" sx={{ color: 'white', marginLeft: isSidebarExpanded ? 2 : 0 }} />
            )}
          </ListItem>

          {/* <ListItem onClick={() => window.location.href = '/AdminReports'} button id="asbutton">  
            <Tooltip title="Reports" placement="right">
              <AssessmentRounded sx={{ color: 'white', marginLeft: 1  }} />
            </Tooltip>
            {isSidebarExpanded && (
              <ListItemText primary="Manage Reports" sx={{ color: 'white', marginLeft: isSidebarExpanded ? 2 : 0 }} />
            )}
          </ListItem> */}

          <ListItem onClick={() => window.location.href = '/Profile'} button id="asbutton">  
            <Tooltip title="Profile" placement="right">
              <Avatar sx={{ width: 22, height: 22, marginLeft: 1.1 }} alt="profile-img" />
            </Tooltip>
            {isSidebarExpanded && (
              <ListItemText primary="Profile" sx={{ color: 'white', marginLeft: isSidebarExpanded ? 2 : 0 }} />
            )}
          </ListItem>

          <ListItem
            button
            id="asbutton"
            onClick={() => {
              localStorage.removeItem('userRole');
              window.location.href = '/';
            }}
          >
            <Tooltip title="Logout" placement="right">
              <LogoutRounded sx={{ color: 'white', marginLeft: 1  }} />
            </Tooltip>
            {isSidebarExpanded && (
              <ListItemText
                primary="Logout"
                sx={{ color: isSidebarExpanded ? 'white' : 'inherit', marginLeft: isSidebarExpanded ? 2 : 0 }}
              />)}
          </ListItem>
        </List>

      </Drawer>
    </Box>
  );
};

export default Sidebar;