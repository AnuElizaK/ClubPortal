import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminAnno.css";
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Tabs, Tab, Box, Typography } from "@mui/material";
import { CalendarToday, AccessTime, Email, Phone } from "@mui/icons-material"


const AdminAnno = ({ isSidebarExpanded }) => {
  const club = localStorage.getItem("userClub");
  const clubId = localStorage.getItem("userClubId");

  const [announcements, setAnnouncements] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    club: "",
    message: "",
    date: "",
    time: "",
    category: "",
    email: "",
    phone: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [tabIndex, setTabIndex] = useState(0); // State to track the active tab

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = () => {
    axios
      .get(`http://localhost:3000/announcementinfo`)
      .then((response) => setAnnouncements(response.data))
      .catch((error) => console.error("Error fetching announcements:", error));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      axios
        .patch(`http://localhost:3000/announcementinfo/${editingId}`, formData)
        .then(() => {
          fetchAnnouncements();
          handleCloseDialog();
        })
        .catch((error) => console.error("Error editing announcement:", error));
    } else {
      axios
        .post("http://localhost:3000/announcementinfo", formData)
        .then(() => {
          fetchAnnouncements();
          handleCloseDialog();
        })
        .catch((error) => console.error("Error adding announcement:", error));
    }
  };

  const handleOpenDialog = (announcement = null) => {
    if (announcement) {
      setFormData(announcement);
      setEditingId(announcement._id);
    } else {
      setFormData({
        club: club,
        message: "",
        date: "",
        time: "",
        category: "",
        email: "",
        phone: "",
      });
      setEditingId(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      club: "",
      message: "",
      date: "",
      time: "",
      category: "",
      email: "",
      phone: "",
    });
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      axios
        .delete(`http://localhost:3000/announcementinfo/${id}`)
        .then(() => fetchAnnouncements())
        .catch((error) => console.error("Error deleting announcement:", error));
    }
  };

  // Separate announcements into current club and other clubs
  const currentClubAnnouncements = announcements.filter((item) => item.club === club);
  const otherClubsAnnouncements = announcements.filter((item) => item.club !== club);

  return (
    <div className="admin-anno-container" >
      <Box sx={{ padding: 5, marginLeft: isSidebarExpanded ? 0 : 10 }}>
      <Typography variant="h4" sx={{ mb: 4, fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }} gutterBottom>
          Manage Announcements
        </Typography>

      <Button
        variant="contained"
        id="admin-add-event"
        onClick={() => handleOpenDialog()}
        style={{ marginBottom: "20px" }}
      >
        Add Announcement
      </Button>

      {/* Tabs for sectioning */}
      <Tabs
        value={tabIndex}
        onChange={(e, newValue) => setTabIndex(newValue)}
        indicatorColor="#9b0302"
        textColor="#0c2d55"
        style={{ marginBottom: "20px" }}
      >
        <Tab id="admin-event-tabs" sx={{fontFamily: 'Montserrat, sans-serif'}} label="Your Club Announcements" />
        <Tab id="admin-event-tabs" sx={{fontFamily: 'Montserrat, sans-serif'}} label="Other Clubs Announcements" />
      </Tabs>

      {/* Tab Content */}
      <Box hidden={tabIndex !== 0}>
      <Typography variant="h5" sx={{fontFamily: 'Montserrat, sans-serif'}} gutterBottom>
        Your Club Announcements
      </Typography>
        <div className="admin-anno-list">
          {currentClubAnnouncements.map((item) => (
            <div className="admin-anno-card" key={item._id}>
              <div className="admin-anno-header">
                <div>
                  <h2 className="club-name">{item.club}</h2>
                  <span className="admin-anno-category">{item.category}</span>
                </div>
              </div>
              <p className="admin-anno-message">{item.message}</p>
              <p className="admin-anno-date"><CalendarToday sx={{ width: 15, height: 15, verticalAlign: 'middle' }}/> {new Date(item.date).toLocaleDateString("en-US")}</p>
              <p className="admin-anno-time">
                <AccessTime sx={{ width: 15, height: 15, verticalAlign: 'middle' }}/>{" "}
                {new Date(`1970-01-01T${item.time}`).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
              <p className="admin-anno-email"><Email sx={{ width: 15, height: 15, verticalAlign: 'middle' }}/> {item.email}</p>
              <p className="admin-anno-phone"><Phone sx={{ width: 15, height: 15, verticalAlign: 'middle' }}/> {item.phone}</p>

              {/* Edit and Delete buttons for current club */}
              <div style={{ marginTop: "10px" }}>
                <Button
                  variant="outlined"
                  id="admin-event-edit"
                  size="small"
                  onClick={() => handleOpenDialog(item)}
                  style={{ marginRight: "10px" }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  id="admin-event-delete"
                  size="small"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Box>

      <Box hidden={tabIndex !== 1}>
      <Typography variant="h5" sx={{fontFamily: 'Montserrat, sans-serif'}} gutterBottom>
        Other Club Announcements
      </Typography>
        <div className="admin-anno-list">
          {otherClubsAnnouncements.map((item) => (
            <div className="admin-anno-card" key={item._id}>
              <div className="admin-anno-header">
                <div>
                  <h2 className="club-name">{item.club}</h2>
                  <span className="admin-anno-category">{item.category}</span>
                </div>
              </div>
              <p className="admin-anno-message">{item.message}</p>
              <p className="admin-anno-date"><CalendarToday sx={{ width: 15, height: 15, verticalAlign: 'middle' }}/> {new Date(item.date).toLocaleDateString("en-US")}</p>
              <p className="admin-anno-time">
              <AccessTime sx={{ width: 15, height: 15, verticalAlign: 'middle' }}/>{" "}
                {new Date(`1970-01-01T${item.time}`).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
              <p className="admin-anno-email"><Email sx={{ width: 15, height: 15, verticalAlign: 'middle' }}/> {item.email}</p>
              <p className="admin-anno-phone"><Phone sx={{ width: 15, height: 15, verticalAlign: 'middle' }}/> {item.phone}</p>
              </div>
          ))}
        </div>
      </Box>

      {/* Dialog for Add/Edit Form */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontFamily: 'Montserrat, sans-serif', fontSize: '30px' }}>
          {editingId ? "Edit Announcement" : "Add Announcement"}
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="category"
              label="Category"
              value={formData.category}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              name="message"
              label="Description"
              value={formData.message}
              onChange={handleInputChange}
              fullWidth
              required
              multiline
              rows={4}
              margin="normal"
            />
            <TextField
              name="date"
              label="Date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
              margin="normal"
            />
            <TextField
              name="time"
              label="Time"
              type="time"
              value={formData.time}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
              margin="normal"
            />
            <TextField
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              name="phone"
              label="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} id='admin-event-edit-cancel'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" id='admin-event-edit-update-create'>
            {editingId ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
      </Box>
    </div>
  );
};

export default AdminAnno;