import React,{ useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm,useWatch,Controller } from 'react-hook-form';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Profile from './Profile';
import {
    AppBar,Tab,Tabs,
    Box,
    Toolbar,
    Container,
    Menu,
    MenuItem,
    Tooltip,
    Avatar,
    Typography,
    Button,
    Grid,
    Paper,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogContent,
    DialogActions,
    TextField,
    BottomNavigation
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import { 
    AdminPanelSettingsRounded, 
    Add, 
    Close, 
    Delete,
    Edit,
    ManageAccountsRounded, 
    KeyboardArrowDown, 
    KeyboardArrowUp, 
    QueryStatsRounded, 
    TuneRounded,
    AddCircleRounded
} from '@mui/icons-material';
import axios from 'axios';



const Row = ({ row }) => {
    const [open, setOpen] = React.useState(false);
  
    return (
      <>
        <TableRow>
          {/*<TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>*/}
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.members}</TableCell>
          <TableCell>{row.admins.length}</TableCell>
        </TableRow>
        {/*<TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={2}>
                <Typography variant="h6" gutterBottom>
                  Admin Details
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Admin Name</TableCell>
                      <TableCell>Email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.admins.map((admin, index) => (
                      <TableRow key={index}>
                        <TableCell>{admin.name}</TableCell>
                        <TableCell>{admin.email}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>*/}
      </>
    );
};

/*const RoleCard = () => {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
      try {
        const response = await axios.post("http://localhost:3000/superadmin", data);
        alert(`${response.data.message}`);
        reset();
      } catch (error) {
        const errorMessage = 'Failed to make any changes. Please try again.';
        alert(errorMessage);
      }
    };

    const roleClick = () => {alert('Are you sure about this? Proceed with caution.');};
  
    return (
      <div className="role-card">
        <Button id="adb" variant="outlined" fullWidth sx={{ mt: 2 }} onClick={() => setOpen(true)}>Manage</Button>
      
        <Dialog open={open} onClose={() => setOpen(false)} className="dialogbox" >     
          <DialogContent className="dialogcontent">
           <h2>Roles and Privileges</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="eventform">
              <TextField
                label="Name of Person"
                {...register("name")}
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={errors.name ? "Name must be correct" : ""}
                className="eventinput"
                />
              <TextField
                label="Current role"
                {...register("role")}
                fullWidth
                margin="normal"
                error={!!errors.role}
                className="eventinput"
              />
              <TextField
                label="New role"
                {...register("nrole")}
                fullWidth
                margin="normal"
                error={!!errors.nrole}
               className="eventinput"
              />
              <TextField
                label="Privilege to be revoked (if any)"
                {...register("rpriv")}
                fullWidth
                margin="normal"
                error={!!errors.rpriv}
                helperText={errors.rpriv ? "Does this exist" : ""}
               className="eventinput"
              />
              <TextField
                label="Privilege to be added (if any)"
                {...register("nrole")}
                fullWidth
                margin="normal"
                error={!!errors.nrole}
                helperText={errors.nrole ? "Does this exist" : ""}
               className="eventinput"
              />
              <TextField
                label="Club"
                {...register("club", { required: true })}
                fullWidth
                margin="normal"
                error={!!errors.club}
                helperText={errors.club ? "Club name is required" : ""}
               className="eventinput"
              />
              <DialogActions>
                <Button onClick={() => setOpen(false)} color="secondary" className="eventcancelbutton">Cancel</Button>
                <Button type="submit" color="primary" onClick={roleClick} className="eventsubmitbutton">Confirm Changes</Button>
              </DialogActions>
            </form>
          </DialogContent>   
        </Dialog>
      </div>
    );
};*/


const UserCard = ({ clubs, fetchClubs }) => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [users, setUsers] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { register, handleSubmit,watch, reset,control, setValue, formState: { errors } } = useForm();

  const selectedRole = useWatch({
    control,
    name: "role",
    defaultValue: ""
  });


  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3000/superadmin/users");
    setUsers(res.data);
  };

  useEffect(() => {
    if (open) 
      fetchClubs();
      fetchUsers();
  }, [open]);

  const handleCreateUser = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/superadmin/users", data);
      alert("user Created!!");
      reset();
      fetchUsers();
    } catch {
      alert("Creation failed.");
    }
  };

  const handleEditUser = async (data) => {
    try {
      const res = await axios.patch(`http://localhost:3000/superadmin/users/${data.id}`, data);
      alert("Data was updated for "+res.data.name);
      reset();
      fetchUsers();
    } catch {
      alert("Edit failed.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await axios.delete(`http://localhost:3000/superadmin/users/${id}`);
      fetchUsers();
    }
  };

  const populateForm = (user) => {
    setShowCreateForm(true);
    setTab(1);
    setValue("id", user._id);
    setValue("regno", user.regno);
    setValue("password", user.password);
    setValue("name", user.name);
    setValue("email", user.email);
    setValue("phone", user.phone);
    setValue("club", user.club);
    setValue("role", user.role);
  };
  
  const userClick = () => {alert('Are you sure about this? Proceed with caution.');};

  return (
    <>
      <Button id="adb" variant="outlined" fullWidth sx={{ mt: 2 }} onClick={() => setOpen(true)}>
        Manage
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogContent>
          <Tabs value={tab} indicatorColor="#9b0302" textColor="#0c2d55" onChange={(e, newValue) => setTab(newValue)} >
            <Tab id='admin-event-tabs' sx={{fontFamily: 'Montserrat, sans-serif'}} label="All Users" />
            <Tab id='admin-event-tabs' sx={{fontFamily: 'Montserrat, sans-serif'}} label="Create / Edit User" />
          </Tabs>

          {tab === 0 && (
            <Box mt={2}>
              <TableContainer component={Paper} sx={{ borderRadius: 5, backgroundColor: '#efebff' }}>
                <Table >
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#b7d1f1' }}>
                      <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Montserrat' }}>Reg no</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Montserrat' }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Montserrat' }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Montserrat' }}>Club</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Montserrat' }}>Role</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Montserrat' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map(user => (
                      <TableRow key={user._id}>
                        <TableCell sx={{ fontFamily: 'Montserrat', fontWeight: 500 }}>{user.regno}</TableCell>
                        <TableCell sx={{ fontFamily: 'Montserrat', fontWeight: 500 }}>{user.name}</TableCell>
                        <TableCell sx={{ fontFamily: 'Montserrat', fontWeight: 500 }}>{user.email}</TableCell>
                        <TableCell sx={{ fontFamily: 'Montserrat', fontWeight: 500 }}>{user.club}</TableCell>
                        <TableCell sx={{ fontFamily: 'Montserrat', fontWeight: 500 }}>{user.role}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => populateForm(user)}><Edit sx={{ color: '#0c2d55'}} /></IconButton>
                          <IconButton onClick={() => handleDelete(user._id)}><Delete sx={{ color: '#9b0302'}} /></IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {tab === 1 && (
            <Box mt={2}>
              <Button
                sx={{color: '#0c2d55', '&:hover': {backgroundColor: '#e5aaaa'}, fontFamily: 'Montserrat, sans-serif'}}
                onClick={() => {
                  reset();
                  setShowCreateForm(prev => !prev);
                }}
              >
                {showCreateForm ? <Close /> : <Add />}
                {showCreateForm ? 'Hide Form' : 'Add New User'}
              </Button>

              {showCreateForm && (
                <form onSubmit={handleSubmit((data) => data.id ? handleEditUser(data) : handleCreateUser(data))}>
                  <input type="hidden" {...register("id")} />
                  <TextField
                    label="Name"
                    fullWidth
                    margin="normal"
                    {...register("name", { required: true })}
                  />
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    {...register("email", { required: true })}
                  />
                   <TextField
                    label="Reg no"
                    type="text"
                    fullWidth
                    margin="normal"
                    {...register("regno", { required: true })}
                  />
                  <TextField
                    label="Phone"
                    fullWidth
                    margin="normal"
                    {...register("phone")}
                  />
                 {/* Role Dropdown */}
                  <TextField
                    select
                    label="Role"
                    fullWidth
                    margin="normal"
                    {...register("role", { required: true })}
                    defaultValue=""
                    error={!!errors.role}>
                    <MenuItem value="Member">Member</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Super Admin">Super Admin</MenuItem>
                  </TextField>

              {/* Show Club dropdown if role is Admin */}
                    {selectedRole === "Admin" && (
                      <TextField
                       select
                       defaultValue=""
                       label="Select Club"
                       {...register("club")}
                       fullWidth
                       margin="normal">
                       {clubs.map((club) => (
                         <MenuItem key={club._id} value={club.name}>
                            {club.name}
                        </MenuItem>
                       ))}
                     </TextField>
                   )}
                  <TextField
                    label="Password"
                    type="text"
                    fullWidth
                    margin="normal"
                    {...register("password")}
                  />
                  <DialogActions>
                    <Button onClick={() => setOpen(false)} id='admin-event-edit-cancel'>Cancel</Button>
                    <Button type="submit" id='admin-event-edit-update-create' onClick={userClick}>
                      {watch("id") ? "save changes" : "Create User"}
                    </Button>
                  </DialogActions>
                </form>
              )}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};



const ClubCard = ({ clubs, fetchClubs }) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [showForm, setShowForm] = useState(false);

  // Fetch all clubs when dialog opens
  useEffect(() => {
    if (open) {
      fetchClubs();
    }
  }, [open]);

  // Delete a club
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this club?")) {
      try {
        await axios.delete(`http://localhost:3000/clubinfos/${id}`);
        fetchClubs(); // Refresh the club list after deletion
        alert("Club deleted successfully.");
      } catch (error) {
        alert("Failed to delete club.");
        console.error(error);
      }
    }
  };

  // create a new club
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/clubinfos", data);
      reset();
      fetchClubs(); // Refresh the club list after creation
      alert("Club Created! Congratulations! Your brand new club is ready for you.")
    } catch (error) {
      alert("Failed to make any changes. Please try again.");
      console.error(error);
    }
  };

  return (
    <>
      <Button
        id="adb"
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => setOpen(true)}
      >
        Manage
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogContent sx={{ maxHeight: "70vh", overflowY: "auto" }}>
          <Typography 
          variant="h5" 
          sx={{ mb: 2, fontFamily: 'Montserrat, sans-serif', fontSize: '30px' }}>
            Club Settings
          </Typography>

          {/* Club List */}
          {clubs.map((club) => (
            <Box key={club._id} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 5, backgroundColor: '#c8e1ff' }}>
              <Typography sx={{ fontFamily: 'Montserrat, sans-serif' }}variant="h5">{club.name}</Typography>
              <Typography variant="body2"><strong>Email:</strong> {club.email}</Typography> 
              <Typography variant="body2"><strong>Members:</strong> {club.members}</Typography>           
              <Tooltip title='Delete'>
                <Delete 
                sx={{ width: 30, height: 30 }} 
                variant="outlined" 
                color="error" 
                onClick={() => handleDelete(club._id)}/>
              </Tooltip>
            </Box>          
          ))}
          <Typography sx={{ mt: 5, fontFamily: 'Montserrat, sans-serif', fontSize: '20px' }}>Create New Club</Typography>
          <IconButton onClick={() => { setOpen(true); setShowForm(true); }} sx={{ position:'sticky' }}>
            <Tooltip title='New Club'><AddCircleRounded sx={{ color: '#0c2d55'}} fontSize="large" /></Tooltip>
          </IconButton>
                    
          {/* Edit Form */}
          {showForm && (
          <form onSubmit={handleSubmit(onSubmit)} className="eventform">
            <TextField
              label="New Club Name"
              {...register("name")}
              fullWidth
              margin="normal"
              error={!!errors.name}
            />
            <TextField
              label="New club Email"
              type="email"
              {...register("email")}
              fullWidth
              margin="normal"
              error={!!errors.email}
            />
            
            <DialogActions>
            <Button onClick={() => setShowForm(false)} id='admin-event-edit-cancel'>Cancel</Button>
              <Button type="submit" id='admin-event-edit-update-create'>Create</Button>
            </DialogActions>
          </form>
          )}
        </DialogContent>
       
      </Dialog>
    </>
  );
};


const SuperAdmin = () => {

  const name = localStorage.getItem("userName");
  
  const [clubData, setClubData] = useState([]);
  const [clubs, setClubs] = useState([]);

  const navigate = useNavigate();
  const handleCardClick = (path) => {navigate(path);};

  const [open, setOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenDialog = () => {setOpen(true);};
  const handleCloseDialog = () => {setOpen(false);};

   const handleOpenNavMenu = (event) => { 
      setAnchorElNav(event.currentTarget); }; 
    
    const handleOpenUserMenu = (event) => { 
      setAnchorElUser(event.currentTarget); }; 
    
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
  
  
  const[totalUsers, setTotalUsers] = useState(0);
  const [totalClubs, setTotalClubs] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/stats`);
      setTotalUsers(res.data.totalUsers);
      setTotalClubs(res.data.totalClubs);
      setTotalAdmins(res.data.totalAdmins);
      setTotalMembers(res.data.totalMembers);
      
    } catch (error) {
      console.error("Failed to fetch dashboard stats", error);
    }
  };

  fetchData();
}, []);

useEffect(() => {
  const fetchClubs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/clubs-with-stats");
      setClubData(res.data);
    } catch (err) {
      console.error("Error fetching club stats", err);
    }
  };
  fetchClubs();
}, []);

const fetchClubs = async () => {
  try {
    const res = await axios.get("http://localhost:3000/clubinfos");
    setClubs(res.data);
  } catch (err) {
    console.error("Error fetching clubs", err);
  }
};

  
  return (
    
    <>
    <AppBar position="static" id="t">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Montserrat, sans-serif',
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MARIAN COLLEGE
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: '',
              fontWeight: 500,
              fontSize: '25px',
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            | Club Portal |
          </Typography>
          
          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}/>
            
          
          {/* Mobile Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu} // Open the menu when clicked
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <h4 style={{ fontWeight: '500'}} >Welcome, {name}</h4>
          {/* User Settings */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ml: 1}} alt="Profile Icon" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >            
            <MenuItem onClick={handleOpenDialog}>Profile</MenuItem>
            <Dialog open={open} 
              onClose={handleCloseDialog} 
              maxWidth="md" 
              fullWidth
              slotProps={{ paper: 
                {style: 
                  {backgroundColor: 'transparent',
                  boxShadow: 'none',
                  border: 'none',
                  },
                }
              }}
            >              
              <Profile />     
            </Dialog>
              
              <MenuItem onClick={() => {
                    localStorage.removeItem("userRole");
                    window.location.href = "/"; 
              }}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        transition: 'margin-left 0.3s ease',
        justifyContent: 'center',
        padding: 5,
      }}
    >
      <Box sx={{ flex: 1, ml: 2 }}> {/*Ensure the content takes full width*/}

        {/*Statistics*/}
        <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Montserrat, san-serif', fontWeight: 'thin', mb: 4, fontSize: 30 }}>
         Overall Stats<br />
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2, backgroundColor: 'rgb(207, 255, 202)', minWidth: 150 }}>
                <Typography variant="h3" sx={{ fontFamily: 'Montserrat, san-serif' }}>{totalClubs}</Typography>
                <Typography variant="h6" sx={{ fontFamily: 'Montserrat, san-serif' }}>Total Clubs</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2, backgroundColor: 'rgb(255, 255, 202)', minWidth: 150 }}>
                <Typography variant="h3" sx={{ fontFamily: 'Montserrat' }}>{totalAdmins}</Typography>
                <Typography variant="h6">Total Admins</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2, backgroundColor: 'rgb(255, 206, 206)', minWidth: 150 }}>
                <Typography variant="h3" sx={{ fontFamily: 'Montserrat' }}>{totalMembers}</Typography>
                <Typography variant="h6">Total Members</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2, backgroundColor: '#c8e1ff', minWidth: 150 }}>
                <Typography variant="h3" sx={{ fontFamily: 'Montserrat' }}>{totalUsers}</Typography>
                <Typography variant="h6">Total Users</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/*Stats Table*/}
        <TableContainer component={Paper} sx={{ mb: 6, width: 400, borderRadius: 2, backgroundColor: '#ffeaf4' }}>
            <Table aria-label="collapsible table">
                <TableHead sx={{ backgroundColor: '#f8bcda' }}>
                    <TableRow>
                    {/*<TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                      >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </IconButton>
                    </TableCell>*/}
                    <TableCell sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}>Club</TableCell>
                    <TableCell sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}>Members</TableCell>
                    <TableCell sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}>Admins</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  {clubData.map((club, index) => (
                    <TableRow key={index}>
                      {/*<TableCell />*/}
                      <TableCell sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>{club.name}</TableCell>
                      <TableCell sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>{club.members}</TableCell>
                      <TableCell sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>{club.admins}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
        </TableContainer>

        {/*Actions*/}
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontFamily: 'Montserrat, san-serif', fontWeight: 'thin', mb: 4, fontSize: 30 }}
        >
          Actions<br />
        </Typography>

        <Grid container spacing={3}>

          {/* <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 5, textAlign: 'center', borderRadius: 3, boxShadow: 3, maxHeight: 200, minWidth: 350 }}>
              <AdminPanelSettingsRounded sx={{ fontSize: 40, color: '#3f51b5' }} />
              <CardContent>
                <Typography variant="h6">Roles and Privileges</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Manage roles, access levels and privileges.
                </Typography>
                <RoleCard/>
              </CardContent>
            </Card>
          </Grid> */}

          <Grid item xs={12} sm={6} md={3}>
            <Card id='admindashcards'
            sx={{ p: 5, textAlign: 'center', borderRadius: 3, boxShadow: 3, maxHeight: 200, minWidth: 350 }}>
              <ManageAccountsRounded sx={{ fontSize: 40, color: '#4caf50' }} />
              <CardContent>
                <Typography variant="h6">User Settings</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Manage user information and security.
                </Typography>
                <UserCard clubs={clubs} fetchClubs={fetchClubs} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card id='admindashcards'
            sx={{ p: 5, textAlign: 'center', borderRadius: 3, boxShadow: 3, maxHeight: 200, minWidth: 350 }}>
              <TuneRounded sx={{ fontSize: 40, color: '#f44336' }} />
              <CardContent>
                <Typography variant="h6">Club Settings</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Manage club data. Create or delete clubs.
                </Typography>
                <ClubCard clubs={clubs} fetchClubs={fetchClubs}/>
               
              </CardContent>
            </Card>
          </Grid>

          {/* <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 5, textAlign: 'center', borderRadius: 3, boxShadow: 3, maxHeight: 200, minWidth: 350 }}>
              <QueryStatsRounded sx={{ fontSize: 40, color: '#ff9800' }} />
              <CardContent>
                <Typography variant="h6">Diagnostics</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Manage user diagnostics, bugs and more.
                </Typography>
        <Button id="adb" variant="outlined" fullWidth sx={{ mt: 2 }} onClick={() => handleCardClick('/AdminReports')}>
                  Manage
                </Button>
              </CardContent>
            </Card>
          </Grid> */}

        </Grid>
      </Box>
    </Box>
    </>
  );
};

export default SuperAdmin;