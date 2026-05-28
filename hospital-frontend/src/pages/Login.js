import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { loginUser } from '../api';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const res = await loginUser({ email, password });
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data));
                onLogin(res.data);
            } else {
                setError(res.data.message || 'Login failed');
            }
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f0f2f5">
            <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
                <Typography variant="h5" fontWeight="bold" textAlign="center" mb={1} color="primary">
                    🏥 Hospital Management System
                </Typography>
                <Typography variant="subtitle2" textAlign="center" mb={3} color="text.secondary">
                    Microservices Edition
                </Typography>
                <TextField
                    fullWidth label="Email" margin="normal"
                    value={email} onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    fullWidth label="Password" type="password" margin="normal"
                    value={password} onChange={e => setPassword(e.target.value)}
                />
                {error && <Typography color="error" mt={1}>{error}</Typography>}
                <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleLogin}>
                    Login
                </Button>
            </Paper>
        </Box>
    );
}

export default Login;