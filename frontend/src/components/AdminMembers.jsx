import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  TableContainer,
} from '@mui/material';
import axios from 'axios';

const AdminMembers = ({ isSidebarExpanded }) => {
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const club = localStorage.getItem('userClub');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
       
        const response = await axios.get('http://localhost:3000/users');
        const clubMembers = response.data.filter(
          (member) => member.clubName === club
        );
        setMembers(clubMembers);
      } catch (error) {
        console.error('Failed to fetch members:', error);
      }
    };
    fetchMembers();
  }, []);

  const filteredMembers = members.filter(
    (member) =>
      (member.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (member.dept.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        await axios.delete(`http://localhost:3000/users/${id}`);
        // Refresh the members list
        setMembers((prev) => prev.filter((m) => m._id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };
  
 

  return (
    <Box
      sx={{
        minHeight: '100vh',
        transition: 'margin-left 0.3s ease',
        marginLeft: isSidebarExpanded ? 0 : 10,
        padding: 5,
        
      }}
    >
      {/* Header */}
      <Typography variant="h4" sx={{ mb: 4, fontFamily: 'Montserrat', fontWeight: '500' }}>
        Club Members
      </Typography>

      {/* Card + Search Field Row */}
      <Grid container spacing={3} alignItems="center" sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{ 
              textAlign: 'center', 
              borderRadius: 2, 
              backgroundColor: '#b9d9ff85', 
              minWidth: 150 
            }}
          >
            <CardContent>
              <Typography variant="subtitle2" color="inherit">
                Total Members
              </Typography>
              <Typography variant="h3" fontFamily={'Montserrat'} fontWeight={500}>
                {members.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <TextField
            label="Search members by name or department"
            value={searchQuery}
            type="search"
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            sx={{
              width: '150%',
              backgroundColor: '#b9d9ff85',
              border: 'none',
              borderRadius: '5px',
            }}
          />
        </Grid>
      </Grid>

      {/* Members Table */}
      
        <TableContainer  component={Paper} sx={{ borderRadius: 5, backgroundColor: 'rgb(201, 241, 216)' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: 'rgb(159, 244, 190)' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Montserrat' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Montserrat' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Montserrat' }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Montserrat' }}>Department</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Montserrat' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMembers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography textAlign="center" sx={{ p: 2 }}>
                    No members found!
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredMembers.map((member, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontFamily: 'Montserrat', fontWeight: 500 }}>{member.name}</TableCell>
                  <TableCell sx={{ fontFamily: 'Montserrat', fontWeight: 500 }}>{member.email}</TableCell>
                  <TableCell sx={{ fontFamily: 'Montserrat', fontWeight: 500 }}>{member.contactNumber}</TableCell>
                  <TableCell sx={{ fontFamily: 'Montserrat', fontWeight: 500 }}>{member.dept}</TableCell>
                  <TableCell sx={{ fontFamily: 'Montserrat', fontWeight: 500 }}>
                    <Button variant='contained' color='error' onClick={() => handleDelete(member._id)} >Remove</Button>
                  </TableCell>
                </TableRow>
                
              ))
            )}
            
          </TableBody>
          </Table>
        </TableContainer>
     
    </Box>
  );
};

export default AdminMembers;
