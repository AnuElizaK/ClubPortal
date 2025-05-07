import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Avatar } from '@mui/material';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');
    const regno = localStorage.getItem('userRegno');
    const contact = localStorage.getItem('userContact');
    const role = localStorage.getItem('userRole');

    // Set user data to state
    setUser({name,email,regno,contact,role});
  }, []);

 //clubs joined by the login member
  const [clubs, setClubs] = useState([]);
  useEffect(() => {  
    const fetchClubs = async () => {
      try {
        const res = await axios.get('http://localhost:3000/prof'); // <-- your backend API endpoint
        setClubs(res.data); // set the fetched club list
      } catch (error) {
        console.error('Failed to fetch clubs:', error);
      }
    };
    fetchClubs();
  }, []);

  return (
    <>
    {user&&(
     <div className='profile-container'>
      <div className="profile-card">

        {/* Left Panel */}
        <div className="profile-top">
          <>
            <Avatar sx={{ width: 170, height: 170, mr: 'auto', ml: 'auto', mb: 1 }} alt="profile-img" />
          </>
          <h1>{user.name}</h1>
          <h3>{user.role}</h3>
        </div>

        {/* Right Panel */}
        <div className="profile-bottom">
          <div className="profile-section">
            <h3>Information</h3>
            <div>
              <Box style={{ textAlign: "left" }} sx={{ p: 2 }}>
                <strong style={{ color: "black" }}>Reg. No.:</strong>
                <span style={{ float: "right" }}>{user.regno}</span>
              </Box>
            </div>
            <div>
              <Box style={{ textAlign: "left" }} sx={{ p: 2 }}>
                <strong style={{ color: "black" }}>Email:</strong>
                <span style={{ float: "right" }}>{user.email}</span>
              </Box>
            </div>
            <div>
              <Box style={{ textAlign: "left" }} sx={{ p: 2 }}>
                <strong style={{ color: "black" }}>Phone:</strong>
                <span style={{ float: "right" }}>{user.contact}</span>
              </Box>
            </div>
          </div>

           {/*<div className="profile-section">
            <h3>Clubs Joined</h3>
            
              {clubs.map((club, index) => (
                <div key={index} >
                  <span>{club.name}</span>
                </div>
              ))}
            
             <ul>
              {clubs.map((club, index) => (
                <li key={index}>{club}</li>
              ))}
            </ul> 
          </div> */}

        </div>
      </div>
      </div>
      )}  
    </>
  );
};

export default Profile;