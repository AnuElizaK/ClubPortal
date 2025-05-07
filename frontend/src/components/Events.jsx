import React, { useState,useEffect } from "react";
import './Events.css'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import axios from "axios";
import { useForm } from 'react-hook-form';

// EventCard component

const EventCard = ({ event }) => {
  const user = {
    name: localStorage.getItem('userName'),
    email: localStorage.getItem('userEmail'),
    regno: localStorage.getItem('userRegno'),
    contact: localStorage.getItem('userContact'),
  };
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/eventsreg", data);
      alert(`${response.data.message}`);
      setOpen(false);
      reset();
    } catch (error) {
      const errorMessage = 'Submission failed. Please try again.';
      alert(errorMessage);
    }
  };

  return (
    <div className="event-card">
      <img src={event.event_image ? `http://localhost:3000/${event.event_image}` : 'https://img.freepik.com/free-vector/mobile-testing-concept-illustration_114360-1564.jpg?t=st=1746562692~exp=1746566292~hmac=b3a34e8843ebe8b5db16b58da7ad01a4535b4393cb08d5543058e68026115638&w=1380'} 
      alt={event.event_title} className="event-image" />
      <h2>{event.event_title}</h2>
      <p><strong>Club:</strong> {event.event_club}</p>
      <p><strong>Date:</strong> {new Date(event.event_date).toLocaleDateString('en-US')}</p>
      <p><strong>Time:</strong> {event.event_time}</p>
      <p><strong>Venue:</strong> {event.event_venue}</p>
      <p><strong>Description: </strong>{event.event_description}</p>
      <Button variant="contained" onClick={() => setOpen(true)}>Register</Button>

    
      <Dialog open={open} onClose={() => setOpen(false)} className="dialogbox" > 
            
        <DialogContent className="dialogcontent">
        <Typography style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '30px', fontWeight: 500 }}>
         Register for {event.event_title}
        </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className="eventform">
            <TextField
              label="Name"
              value={user.name}
              {...register("name", { required: true })}
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name ? "Name is required" : ""}
              className="eventinput"
              />
            <TextField
              label="Email"
              value={user.email}
              type="email"
              {...register("email", { required: true })}
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email ? "Email is required" : ""}
              className="eventinput"
            />
            <TextField
              label="Phone"
              type="tel"
              value={user.contact}
              {...register("phone", { required: true })}
              fullWidth
              margin="normal"
              error={!!errors.phone}
              helperText={errors.phone ? "Phone number is required" : ""}
             className="eventinput"
            />
             <TextField
              label="Roll No"
              value={user.regno}
              type="text"
              {...register("reg", { required: true })}
              fullWidth
              margin="normal"
              error={!!errors.phone}
              helperText={errors.phone ? "Register number is required" : ""}
             className="eventinput"
            />
            <TextField
              label="Club"
              defaultValue={event.event_club}
              {...register("club", { required: true })}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}              
             className="eventinput"
            />
             <TextField
              label="Event Name"
              defaultValue={event.event_title}
              {...register("title", { required: true })}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}              
             className="eventinput"
            />
            <DialogActions>
              <Button onClick={() => setOpen(false)} id="eventcancelbutton">Cancel</Button>
              <Button type="submit" id="eventsubmitbutton">Submit</Button>
            </DialogActions>
          </form>
        </DialogContent>
          
      </Dialog>
    </div>
  );
};
const Events = () => {
  
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/eventsinfo");
        setEvents(response.data);
        console.log("Fetched Events:", response.data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.event_club.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.event_title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <>
    <div>
      
      <h1 className="gg">Explore All Club Events</h1>

      <div style={{ margin: "15px", textAlign: "center" }}>
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
      </div>
      
    </div>
  </>  
  );
};

export default Events;