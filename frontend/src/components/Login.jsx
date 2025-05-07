import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {
    Button,
    TextField,
    Box,
    Typography,
    Divider,
    Link,
    Container,
    Paper,
    BottomNavigation,
    CircularProgress
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';

const Login = () => {
    

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const navigate = useNavigate();
    

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            
            const response = await axios.post('http://localhost:3000/users/login', data);
            const { role, name, email, regno, contact, club ,clubid} = response.data;

            localStorage.setItem('userRole', role);
            localStorage.setItem('userName', name);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userRegno', regno);
            localStorage.setItem('userContact', contact);
            localStorage.setItem('userClub',club);
            localStorage.setItem('userClubId',clubid);

            if (role === 'Admin') {
                navigate('/admindashboard');
                window.dispatchEvent(new Event('storage'));           
            }
            else if (role === 'Super Admin') {
                navigate('/superadmin');
                window.dispatchEvent(new Event('storage'));
            }  
            else {
                navigate('/memberdashboard');
                window.dispatchEvent(new Event('storage'));
            }
        } catch (error) {
           
                console.error(error);
                alert('Invalid credentials');
            
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <h1 id="lh01">MARIAN COLLEGE</h1>
            <h1 id="lh02">Club Portal</h1>

            <Divider id="d" sx={{ width: '35%', height: 1, mt: 1 }} />

            <Container maxWidth="xs" sx={{
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }} id="logcont">
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
                        <Typography sx={{ fontFamily: 'Montserrat, sans-serif' }} component="h1" variant="h5" gutterBottom>
                            Log In
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                            <TextField
                                sx={{ mb: 3 }}
                                type="email"
                                fullWidth
                                id="lemail"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                {...register('email', {
                                    required: "Email is required"
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                            <TextField
                                required
                                fullWidth
                                type="password"
                                id="lpassword"
                                label="Password"
                                name="password"
                                autoComplete="current-password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters'
                                    }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        

                            {loading && (
                                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, mt: 2 }}>
                                    <CircularProgress />
                                </Box>
                            )}

                            <Button
                                id="b"
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={loading}>
                                {loading ? 'Logging in...' : 'Log In'}
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
            </>
    );
};

export default Login;