import React from 'react';
import { BottomNavigation, Box, Typography, Divider, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <>
      <BottomNavigation id="footer">
        <footer>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', padding: 2 }}>
            <Typography>&copy; 2025 College Club Portal&nbsp;</Typography>
            <Divider id='hordiv' orientation="vertical" flexItem />
            <Typography>&nbsp;
              <Link id="link" onClick={() => navigate('/ContactUs')} sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                Contact Us
              </Link>
            </Typography>
          </Box>
        </footer>
      </BottomNavigation>
    </>
  );
};
export default Footer;
