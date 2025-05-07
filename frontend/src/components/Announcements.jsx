import React, { useState, useEffect } from "react";
import "./Announcements.css";
import { TextField, Paper, Divider } from "@mui/material";
import { CalendarToday, AccessTime, Email, Phone } from "@mui/icons-material"
import axios from "axios";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/announcementinfo") 
      .then((response) => {
        setAnnouncements(response.data);
      })
      .catch((error) => {
        console.error("Error fetching announcements:", error);
      });
  }, []);

  const filteredAnnouncements = announcements.filter((item) => {
    return selectedDate === "" || item.date === selectedDate;
  });

  return (
    <div className="announcement-container">
      <h1 id="announcement-title">Announcements</h1>

      <div style={{ marginBottom: "40px", textAlign: "right" }}>
        <TextField
          id="annosearch"
          type="date"
          variant="filled"
          label="Filter by date:"
          slotProps={{ inputLabel: {shrink: true} }}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <div className="announcement-list">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((item, index) => (
            <div className="announcement-card" key={index}>
              <div className="announcement-header">
                <div>
                  <h2 className="club-name">{item.club}</h2>
                  <span className="announcement-category">{item.category}</span>
                </div>
              </div>
              
              <p className="announcement-message">{item.message}</p>
              <Divider id="d" sx={{ width: '100%', height: 1, mt: 1, mb: 1 }}/>
              
              <p className="announcement-date">
                <CalendarToday sx={{ width: 15, height: 15, verticalAlign: 'middle' }}/> {item.date}
              </p>
              
              <p className="announcement-time">
                <AccessTime sx={{ width: 15, height: 15, verticalAlign: 'middle' }}/> {item.time}
              </p>
              
              <p className="announcement-email">
                <Email sx={{ width: 15, height: 15, verticalAlign: 'middle' }}/> {item.email}
              </p>
              
              <p className="announcement-phone">
                <Phone sx={{ width: 15, height: 15, verticalAlign: 'middle' }}/> {item.phone}
              </p>

            </div>
          ))
        ) : (
          
          <p style={{ textAlign: "center",  }}>No announcements found for selected date.</p>
        
        )}
      </div>
    </div>
  );
};

export default Announcement;