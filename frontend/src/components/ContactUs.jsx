import React, { useState } from 'react';
import { Divider, Typography, Box, TextField, Button, Grid, Card, CardContent, Rating, Paper, Container } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import './ContactUs.css';

const teamMembers = [
  { name: 'Acsah R.', profession: '(Future) Backend Developer', phone: '12345 67890', email: 'acsah@example.com' },
  { name: 'Rehan K.', profession: '(Future) Project Manager', phone: '23456 78901', email: 'rehan@example.com' },
  { name: 'Alphonse J.', profession: '(Future) Designer', phone: '34567 89012', email: 'alphonse@example.com' },
  { name: 'Joyal J.', profession: '(Future) QA Engineer', phone: '45678 90123', email: 'joyal@example.com' },
  { name: 'Anu E. K.', profession: '(Future) Frontend Developer', phone: '56789 01234', email: 'anu@example.com' }
];

const labels = {
  0.5: 'Terrible',
  1: 'Terrible+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const ContactUs = () => {
  const [feedback, setFeedback] = useState({ name: '', email: '', rating: '', badFeedback: '' });

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedback);
    alert('Feedback submitted', feedback);
  };

  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  return (
    <>
    <h1 id="lh01">MARIAN COLLEGE</h1>
    <h1 id="lh02">Club Portal</h1>

    <Divider id="d" sx={{ width: '35%', height: 1, mt: 3.5 }} />

    <div style={{ padding: '20px', marginBottom: 50 }}>
      {/* Team Section */}
      <Typography 
      id="title1" 
      variant="h4" 
      sx={{ fontFamily: 'Montserrat, san-serif', color: '#0c2d55', mb: 4 }} 
      gutterBottom>
        Behind The Scene
        <br/>
        <small>
          We are a small, rookie team of student developers with a passion for software development.
        </small>
        </Typography>
      <Grid container spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ padding: 2, textAlign: 'center', borderRadius: 5 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontFamily: 'Montserrat, san-serif' }}>{member.name}</Typography>
                <Typography variant="body2" color="textSecondary">{member.profession}</Typography>
                <Typography variant="body2">📞 {member.phone}</Typography>
                <Typography variant="body2">✉️ {member.email}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider id="d" sx={{ width: '60%', height: 1, mt: 6 }} />

      {/* Feedback Section */}
      <Container 
      maxWidth="xs" sx={{
      height: "100vh",
      justifyContent: "center",
      alignItems: "center",
      }}>
      <Paper elevation={3} sx={{ p: 4, mt: 6, mb: 4 }} id="logcont">
      <Box id='feedbackbox' sx={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
        <Typography id="title2" 
          variant="h4" 
          sx={{ fontFamily: 'Montserrat, san-serif', color: '#0c2d55', mb: 1 }}
          gutterBottom>
            Feedback
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField id='cname' label="Name" name="name" fullWidth margin="normal" onChange={handleChange} />
          <TextField id='cemail' label="Email" name="email" fullWidth margin="normal" onChange={handleChange} />
          <Box 
          id='rating'
          sx={{ 
            width: '100', 
            display: 'flex', 
            alignItems: 'center', 
             }}>
            <Rating
              name="hover-feedback"
              value={value}
              precision={0.5}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {value !== null && (
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
          </Box>
          <TextField 
          label="Have any suggestions or complaints?" 
          placeholder='Let us know'
          name="badFeedback" 
          fullWidth margin="normal" 
          multiline rows={4} 
          onChange={handleChange} />
          <Button id='feedbackbutton' variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>Submit</Button>
        </form>
      </Box>
      </Paper>
      </Container>
    </div>
    </>
  );
};

export default ContactUs;
