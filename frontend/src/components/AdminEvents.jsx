import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";

const AdminEvents = ({ isSidebarExpanded }) => {
  const club = localStorage.getItem("userClub");
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [tabIndex, setTabIndex] = useState(0); // State to track the active tab

  const [formData, setFormData] = useState({
    event_image:"",
    event_title: "",
    event_club: "",
    event_date: "",
    event_time: "",
    event_venue: "",
    event_description: "",
    
  });

  const fetchEvents = async () => {
    const response = await axios.get("http://localhost:3000/eventsinfo");
    setEvents(response.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpen = (event = null) => {
    setEditingEvent(event);
    if (event) {
      setFormData(event);
    } else {
      setFormData({
        event_image:"",
        event_title: "",
        event_club: club,
        event_date: "",
        event_time: "",
        event_venue: "",
        event_description: "",
       
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingEvent(null);
    setFormData({
      event_image:"",
      event_title: "",
      event_club: "",
      event_date: "",
      event_time: "",
      event_venue: "",
      event_description: "",
     
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    if (e.target.type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // Store the actual file
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  const handleSubmit = async () => {
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
      })
  
      if (editingEvent) {
        await axios.patch(
          `http://localhost:3000/events/${editingEvent._id}`,form,{
            headers: { "Content-Type": "multipart/form-data" }
          }
        );
      } else {
        await axios.post("http://localhost:3000/events", form, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }
  
      fetchEvents();
      handleClose();
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };
  

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await axios.delete(`http://localhost:3000/events/${id}`);
      fetchEvents();
    }
  };

  // const getParticipantsByClub = (clubName) => {
  //   return users.filter((user) => user.event_club.toLowerCase() === clubName.toLowerCase());
  // };

  // Separate events into current club and all events
  const currentClubEvents = events.filter((event) => event.event_club === club);
  const allOtherEvents = events.filter((event) => event.event_club !== club);
  
  
  return (
   <div>
    <Box sx={{ padding: 2.5, marginLeft: isSidebarExpanded ? 0 : 10 }}>
      <div style={{ padding: "20px" }}>
        <Typography variant="h4" sx={{ mb: 4, fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }} gutterBottom>
          Manage Events
        </Typography>
        <Button
          variant="contained"
          id="admin-add-event"
          onClick={() => handleOpen()}
          style={{ marginBottom: "20px" }}
        >
          Add New Event
        </Button>

        {/* Tabs for sectioning */}
        <Tabs        
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
          indicatorColor="#9b0302"
          textColor="#0c2d55"
          style={{ marginBottom: "20px" }}
        >
          <Tab id="admin-event-tabs" sx={{fontFamily: 'Montserrat, sans-serif'}} label="Your Club Events" />
          <Tab id="admin-event-tabs" sx={{fontFamily: 'Montserrat, sans-serif'}} label="All Other Events" />
        </Tabs>

        {/* Tab Content */}
        <Box sx={{fontFamily: 'Montserrat, sans-serif'}} hidden={tabIndex !== 0}>
          <Typography variant="h5" sx={{fontFamily: 'Montserrat, sans-serif'}} gutterBottom>
            Your Club Events
          </Typography>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: "20px" }}>
            {currentClubEvents.map((event) => (
              <Card 
              key={event._id} 
              variant="outlined" 
              sx={{ 
                borderRadius: '16px', 
                padding: 1, 
                transition: 'all 0.3s ease-in-out', 
                '&:hover': {backgroundColor: '#eef6ff'}}}>
                <CardContent sx={{}}>
                  <Typography sx={{fontFamily: 'Montserrat, sans-serif'}} variant="h6">{event.event_title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Club:</strong> {event.event_club}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Date:</strong>{" "}
                    {new Date(event.event_date).toLocaleDateString("en-US")}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Time:</strong>{" "}
                    {new Date(`1970-01-01T${event.event_time}`).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }
                    )}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Venue:</strong> {event.event_venue}
                  </Typography>
                  <Typography sx={{fontFamily: 'Montserrat, sans-serif', mb: 2}} variant="body2">{event.event_description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', flexDirection: 'column' }}>
                    <strong>Files added:</strong> 
                    <img
                      src={
                        event.event_image 
                          ? `http://localhost:3000/${event.event_image}`
                          : "https://png.pngtree.com/png-vector/20220621/ourmid/pngtree-3d-style-white-background-vector-illustration-of-a-blue-megaphone-banner-for-upcoming-events-vector-png-image_47185572.jpg"
                      }
                     alt={event.title}
                     style={{ width: "100px" }}
                     />
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="outlined"
                    id="admin-event-edit"
                    onClick={() => handleOpen(event)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    id="admin-event-delete"
                    onClick={() => handleDelete(event._id)}
                  >
                    Delete
                  </Button>
                </CardActions>
                
              </Card>
))}
          </div>
        </Box>

        <Box hidden={tabIndex !== 1}>
          <Typography variant="h5" sx={{fontFamily: 'Montserrat, sans-serif'}} gutterBottom>
            All Other Events
          </Typography>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
            {allOtherEvents.map((event) => (
              <Card key={event._id} variant="outlined" sx={{ borderRadius: '16px', padding: 1}}>
                <CardContent>
                  <Typography sx={{fontFamily: 'Montserrat, sans-serif'}} variant="h6">{event.event_title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Club:</strong> {event.event_club}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Date:</strong>{" "}
                    {new Date(event.event_date).toLocaleDateString("en-US")}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Time:</strong>{" "}
                    {new Date(`1970-01-01T${event.event_time}`).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }
                    )}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Venue:</strong> {event.event_venue}
                  </Typography>
                  <Typography variant="body2">{event.event_description}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Image:</strong> 
                    <img src={`http://localhost:3000/${event.event_image}` ||"https://png.pngtree.com/png-vector/20220621/ourmid/pngtree-3d-style-white-background-vector-illustration-of-a-blue-megaphone-banner-for-upcoming-events-vector-png-image_47185572.jpg"}  alt={event.title} style={{ width: "100px" }}/>
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </Box>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{ fontFamily: 'Montserrat, sans-serif', fontSize: '30px' }}>
            {editingEvent ? "Edit Event" : "Add New Event"}
          </DialogTitle>
          <DialogContent>
            {[
              { name: "event_title", label: "Event Title" },
              { name: "event_date", label: "Event Date", type: "date" },
              { name: "event_time", label: "Event Time", type: "time" },
              { name: "event_venue", label: "Event Venue" },
              { name: "event_description", label: "Event Description" },
              { name: "event_image", label: "Event Image", type: "file" },
            ].map((field) => {
              
              if (field.type === "file") {
                return (       
                  <input
                    key={field.name}
                    name={field.name}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      handleChange(e);
                      
                    }}
                    style={{ marginTop: "16px", marginBottom: "16px", width: "100%" }}
                  />
                );
              } else {
                return (
                  <TextField
                    required
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    value={formData[field.name]}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    type={field.type || "text"}
                    InputLabelProps={field.type ? { shrink: true } : undefined}
                  />
                );
              }
            })}
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} id='admin-event-edit-cancel'>
              Cancel
            </Button>
            <Button onClick={handleSubmit} id='admin-event-edit-update-create'>
              {editingEvent ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
    </div>
  );
};

export default AdminEvents;