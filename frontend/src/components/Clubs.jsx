import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  CircularProgress, Box, ImageList, ImageListItem,
  Button, Dialog, DialogTitle, DialogContent, TextField
} from '@mui/material';
import './ClubStyle.css';

const ClubPage = () => {
  const user = {
    name: localStorage.getItem('userName'),
    email: localStorage.getItem('userEmail'),
    regno: localStorage.getItem('userRegno'),
    contact: localStorage.getItem('userContact'),
  };
  const { clubId } = useParams();
  const [clubData, setClubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    clubName: '',
    rollNo: user.regno,
    dept: '',
    contactNumber: user.contact,
    logo: '',
  });

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/clubinfos/${clubId}`);
        setClubData(res.data);
        setFormData(prev => ({ ...prev, clubName: res.data.name }));
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch club data:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchClubData();
    
  }, [clubId,user.email]);

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/enrolls', formData);
      alert('Enrollment successful!');
      setOpenDialog(false);
    } catch (err) {
      alert('Enrollment failed.');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !clubData) {
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <h2 className="error-text">Club not found or an error occurred.</h2>
      </Box>
    );
  }

  return (
    <div className="club-container">
      <div className="club-card">
        {/* {clubData.logo && ( */}
          <div className="club-logo">
            <img src={clubData.logo ? `http://localhost:3000/${clubData.logo}` : '/default-logo.png'} alt="Club Logo" />
          </div>
        {/* )} */}

        <h1 className="club-title">{clubData.name}</h1>
      

        <Dialog open={openDialog} onClose={handleDialogClose} fullWidth className='custom-dialog'>
          <DialogTitle sx={{ fontFamily: 'Montserrat, sans-serif', fontSize: '30px' }}>
            Enroll in {clubData.name}
          </DialogTitle>
          <DialogContent>
        
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }} >
              <TextField label="Name" name="name" value={formData.name} />
              <TextField label="Roll Number" name="rollNo" value={formData.rollNo} />
              <TextField label="Department" name="dept" value={formData.dept} onChange={handleChange} required />
              <TextField label="Email" name="email" value={formData.email}  type="email" />
              <TextField label="Phone" name="contactNumber" value={formData.contactNumber}  />
              <TextField label="Club" name="clubName" value={formData.clubName}  />
              <Button type="submit" variant="contained" id="enrollsubmit">submit</Button>
            </Box>
          
          </DialogContent>
        </Dialog>
        
          
        
        <div className="enroll-btn-container">
          <Button
            id="enroll-btn"
            onClick={handleDialogOpen}
            variant='outlined'
          >
          Enroll
          </Button>
        </div>
       

        <div className="club-section">
          <h3 className="club-section-title">Description</h3>
          <p className="club-section-content">{clubData.description || "No description available."}</p>
        </div>

        <div className="club-section">
          <h3 className="club-section-title">Mission</h3>
          <p className="club-section-content">{clubData.mission || "No mission statement available."}</p>
        </div>

        <div className="club-section">
          <h3 className="club-section-title">Vision</h3>
          <p className="club-section-content">{clubData.vision || "No vision statement available."}</p>
        </div>

        {clubData.leaders && clubData.leaders.length > 0 && (
          <div className="club-section">
            <h2 className="club-section-title">Leaders</h2>
            <div className="leader-list">
              {clubData.leaders.map((leader, idx) => (
                <div key={idx} className="leader-card">
                  <strong>{leader.name}</strong>
                  <p>{leader.position}</p>
                </div>
              ))}
            </div>
          </div>
        )}

          <div className="club-section">
            <h2 className="club-section-title">Contact Details</h2>
              <div className="contact-list">
                <div className="contact-card">
                  <strong>Phone:</strong> <p>{clubData.phone}</p> 
                </div>
                <div className="contact-card">              
                  <strong>Email:</strong> <p>{clubData.email}</p>  
                </div>              
              </div>
          </div>
        
        {/*{clubData.socials && clubData.socials.length > 0 && (
          <div className="club-section">
            <h2 className="club-section-title">Social Media</h2>
            <div className="social-list">
              {clubData.socials.map((social, idx) => (
                <div key={idx} className="social-card">
                  <strong>{social.platform}</strong>
                  <p>{social.handle}</p>
                </div>
              ))}
            </div>
          </div>
        )} */}

        {clubData.gallery && clubData.gallery.length > 0 && (
          <div className="club-section">
            <h2 className="club-section-title">Gallery</h2>
            <ImageList sx={{ width: '100%', height: 450 }} cols={3} rowHeight={164}>
              {clubData.gallery.map((imgUrl, index) => (
                <ImageListItem key={index}>
                  <img
                    src={`${imgUrl}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${imgUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={`Gallery ${index + 1}`}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        )}

      </div>
    </div>
  );
};

export default ClubPage;