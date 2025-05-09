import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  TextField, Card, CardContent, CardMedia, CardActionArea, Grid, Typography } from "@mui/material";
import axios from 'axios';


const ClubCard = ({ club }) => {
  const navigate = useNavigate();
  
  const handleCardClick = (clubId) => {
    navigate(`/clubinfos/${clubId}`);
  };

  return (
    <Grid xs={6} sx={{ mr: 'auto', ml: 'auto' }} key={club._id}>
      <Card 
        sx={{ 
          maxWidth: 450, 
          mb: 5, 
          padding: 2, 
          borderRadius: '16px', 
          cursor: 'pointer', 
          transition: 'all 0.3s ease-in-out',
          '&:hover': { transform: 'scale(1.03)', boxShadow: '0 6px 20px rgba(0,0,0,0.2)' } 
        }} 
        onClick={() => handleCardClick(club._id)}>
        <CardActionArea id="clubs">
          <CardMedia
            component="img"
            height="140"
            image={club.imageUrl || "https://img.freepik.com/free-vector/people-studying-online-flat-set-isolated-white_107791-15519.jpg"}
            alt={club.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" sx={{ fontFamily: 'Montserrat, sans-serif', fontSize: '35px', textAlign: 'center' }}>
              {club.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
              {club.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};


const Memberdashboard = () => {
  const [clubs, setClubs] = React.useState([]);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  React.useEffect(() => {
    const fetchClubs = async () => {
      try {
        const res = await axios.get('http://localhost:3000/clubinfos'); // <-- your backend API endpoint
        setClubs(res.data); // set the fetched club list
      } catch (error) {
        console.error('Failed to fetch clubs:', error);
      }
    };
    fetchClubs();
  }, []);

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    club.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (clubId) => {
    navigate(`/clubinfos/${clubId}`); // navigate to the dynamic route
  };

  return (
    <>
    <div>
      {/* Dashboard Welcome */}
      <Typography
        gutterBottom
        sx={{ textAlign: 'center', fontWeight: '500', mt: 5, fontFamily: 'Montserrat', fontSize: 25 }}
      >
        <small>Your all-in-one destination for everything club-related. For the students, by the students. 
          Your club journey starts here.</small>
      </Typography>
      
      <h1 id="dashtitle" >Explore All Clubs</h1>

      <div style={{ margin: "15px", textAlign: "center" }}>
        <TextField
          id="evsearch"
          label="Search by club name or anything related"
          variant="outlined"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '70%', mb: '40px' }}
        />
      </div>

      <Grid container spacing={2} justifyContent="center">
        {filteredClubs.length > 0 ? (
          filteredClubs.map((club) => (
            <ClubCard club={club} key={club._id} />
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No result</p>
        )}
      </Grid>
    </div>
    </>
  );
}

export default Memberdashboard;