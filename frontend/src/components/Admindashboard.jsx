import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, Grid, Divider, IconButton, Tooltip,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Card, CardContent, Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Groups, Event, Campaign, Edit,ExpandMore,InfoOutline,Phone,Email,EmojiObjectsOutlined,Visibility } from '@mui/icons-material';
import axios from 'axios';

const AdminDashboard = ({ isSidebarExpanded }) => {
  const navigate = useNavigate();
  const [clubName, setClubName] = useState(localStorage.getItem('userClub'));
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    mission: '',
    vision: '',
    phone:'',
    leaders: [],
    email: '',
    socials: [],
    photos: [],
  });
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/clubinfos');
        const matchedClub = response.data.filter((clb) => clb.name === clubName);

        setClubs(matchedClub);
      } catch (error) {
        console.error('Error fetching clubs:', error);
      }
    };

    fetchClubs();
  }, [clubName]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, photos: [...prev.photos, ...files] }));
  };

  const handleCardClick = (path) => {
    navigate(path);
  };

  const handleEditClick = (club) => {
    setFormData({
      id: club._id,
      name: club.name,
      description: club.description,
      mission: club.mission,
      vision: club.vision,
      phone: club.phone,
      email: club.email,
      socials: club.socials,
      photos: [],
    });
    setOpenDialog(true);
  };

  const handleSubmit = async () => {
    try {

      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'photos') {
          formData.photos.forEach((photo) => formDataToSend.append('photos', photo));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });
  
      const prevClubName = localStorage.getItem('userClub');
  
      const response = await axios.patch('http://localhost:3000/clubinfos', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      const updatedClub = response.data.club;
  
      //  Update localStorage if name changed
      if (formData.name !== clubName) {
        localStorage.setItem('userClub', formData.name);
        setClubName(formData.name); //  Update state so useEffect runs again
      }
      
  
      alert('Club info updated successfully!');
      setOpenDialog(false);
  
      //  Fetch updated club data
      const updatedResponse = await axios.get('http://localhost:3000/clubinfos');
      const matchedClub = updatedResponse.data.filter((clb) => clb.name === formData.name);
      setClubs(matchedClub);
  
    } catch (error) {
      console.error('Error updating club info:', error);
      alert('Failed to update club info.');
    }
  };
  

  return (
    
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        transition: 'margin-left 0.3s ease',
        marginLeft: isSidebarExpanded ? 0 : 9,
        padding: 5,
      }}
    >
      
      <Box sx={{ flex: 1 }}>
        {clubs.map((club) => (
          <div key={club._id} >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  }}>
            <img
              src={club.logo ? `http://localhost:3000/${club.logo}` : '/default-logo.png'}
              alt="Club Logo"
               style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "100px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                justifyContent: "center",
              }}/>
            </div>
          
          <Divider sx={{ mt: 3, mb: 3 }} >
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography variant="h3" sx={{ fontFamily: 'Montserrat, sans-serif', textAlign: 'center', mr: 1 }}>
                {club.name}
              </Typography>           
            </Box>
          </Divider>
          
          <Accordion
           sx={{
            backgroundColor: "#fff",
            boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
            my: 5
            }}>
              
            <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6" sx={{ fontFamily: "Montserrat", fontWeight: "600" }}>
                    Club Info
                  <Tooltip title="Edit Club Info">
                    <IconButton onClick={() => handleEditClick(club)}>
                      <Edit sx={{ color: '#0c2d55'}} />
                    </IconButton>
                  </Tooltip>
                </Typography>
            </AccordionSummary>

            <AccordionDetails>
              
              <Box sx={{ mb: 2 }}>
                <Typography sx={{ mb: 2, alignItems: "center", fontFamily: 'Montserrat, sans-serif' }}>
                  <InfoOutline sx={{ verticalAlign: 'middle', width: 20, height: 20, mr: 1, color: "#0c2d55" }} />
                  <strong>Description:</strong>&nbsp; {club.description}
                </Typography>

                <Typography sx={{ mb: 2, alignItems: "center", fontFamily: 'Montserrat, sans-serif' }}>
                  <EmojiObjectsOutlined sx={{ verticalAlign: 'middle', width: 20, height: 20, mr: 1, color: "#0c2d55" }} />
                  <strong>Mission:</strong>&nbsp; {club.mission}
                </Typography>

                <Typography sx={{ mb: 2, alignItems: "center", fontFamily: 'Montserrat, sans-serif' }}>
                  <Visibility sx={{ verticalAlign: 'middle', width: 20, height: 20, mr: 1, color: "#0c2d55" }} />
                  <strong>Vision:</strong>&nbsp; {club.vision}
                </Typography>

                <Typography sx={{ mb: 2, display: "flex", alignItems: "center", fontFamily: 'Montserrat, sans-serif' }}>
                  <Phone sx={{ width: 20, height: 20, mr: 1, color: "#0c2d55" }} />
                  <strong>Phone:</strong>&nbsp; {club.phone}
                </Typography>

                <Typography sx={{ display: "flex", alignItems: "center", fontFamily: 'Montserrat, sans-serif' }}>
                  <Email sx={{ width: 20, height: 20, mr: 1, color: "#0c2d55" }} />
                  <strong>Email:</strong>&nbsp; {club.email}
                </Typography>
                  
                <Typography sx={{ display: "flex", alignItems: "center", fontFamily: 'Montserrat, sans-serif' }}  >
                  <Groups sx={{ width: 20, height: 20, mr: 1, color: "#0c2d55" }} />
                  <strong>Leaders:</strong> &nbsp;
                  {club.leaders.map((leader, index) => (
                  <Box key={index} component="section" sx={{ p: 1, border: '1px solid grey', borderRadius: '5px', mr: 2, mt: 1.5}}>
                    <strong>{leader.position}: </strong> {leader.name}</Box>
                ))}
                </Typography>

                {/*<Typography sx={{ display: "flex", alignItems: "center", fontFamily: 'Montserrat, sans-serif' }}  >
                  <Groups sx={{ width: 20, height: 20, mr: 1, color: "#0c2d55" }} />
                  <strong>Social Media:</strong> &nbsp;
                  {club.socials.map((social, index) => (
                  <Box key={index} component="section" sx={{ p: 1, border: '1px solid grey', borderRadius: '5px', mr: 2, mt: 1.5}}>
                    <strong>{social.platform}: </strong> {social.handle}</Box>
                ))}
                </Typography>*/}
                
              </Box>

            </AccordionDetails>
            
          </Accordion>

          </div>
          
        ))}

        {/* Edit Club Info Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
          <DialogTitle sx={{ fontFamily: 'Montserrat, sans-serif', fontSize: '30px' }}>Edit Club Info</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Club Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={3}
            />
            <TextField
              fullWidth
              label="Mission"
              name="mission"
              value={formData.mission}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Vision"
              name="vision"
              value={formData.vision}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              margin="normal"
              type="email"
            />
            {/*<Box component={'fieldset'}>
            <legend>Social Media</legend>
            <TextField
              fullWidth
              label="Platform"
              name="socials"
              value={formData.socials}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Handle"
              name="socials"
              value={formData.socials}
              onChange={handleInputChange}
              margin="normal"
            />
            </Box>*/}
            Change Logo:&nbsp;
            <Button
              variant="outlined"
              component="label"
              startIcon={<AddPhotoAlternateIcon />}
              sx={{ color: '#0c2d55', mt: 2 }}
            >            
              <input
                type="file"
                // hidden
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
              />
            </Button>
            
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} id="club-admin-edit-cancel">Cancel</Button>
            <Button onClick={handleSubmit} id="club-admin-edit-submit">Submit</Button>
          </DialogActions>
        </Dialog>

        {/* Dashboard Welcome */}
        <Typography
          variant="h5"
          gutterBottom
          sx={{ textAlign: 'center', fontWeight: 'thin', mt: 8, mb: 4, fontFamily: 'Montserrat', fontSize: 30 }}
        >
          Welcome club leader!
          <br />
          <small>This is your all-in-one space to manage everything about your club.</small>
        </Typography>

        {/* Dashboard Cards */}
        <Grid container spacing={3} justifyContent="center">
          {[
            {
              title: 'Manage Members',
              description: 'View and manage club members, enrollments and more.',
              icon: <Groups sx={{ fontSize: 40, color: '#3f51b5' }} />,
              path: '/AdminMembers',
            },
            {
              title: 'Manage Events',
              description: 'Add, edit, cancel or manage club events.',
              icon: <Event sx={{ fontSize: 40, color: '#4caf50' }} />,
              path: '/AdminEvents',
            },
            {
              title: 'Announcements',
              description: 'Create, post and view announcements.',
              icon: <Campaign sx={{ fontSize: 40, color: '#f44336' }} />,
              path: '/AdminAnno',
            },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card id="admindashcards"
                sx={{
                  p: 5,
                  textAlign: 'center',
                  borderRadius: 3,
                  boxShadow: 3,
                  maxHeight: 200,
                  maxWidth: 250,
                }}
              >
                <CardContent>
                  {item.icon}
                  <Typography variant="h6" gutterBottom>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {item.description}
                  </Typography>
                  <Button id="adb" variant="outlined" fullWidth onClick={() => handleCardClick(item.path)}>
                    {item.title.includes('Announcements') ? 'Post' : 'Manage'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
