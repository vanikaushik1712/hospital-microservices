import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { getPatients, getDoctors, getAppointments } from '../api';

function Dashboard() {
    const [patientCount, setPatientCount] = useState(0);
    const [doctorCount, setDoctorCount] = useState(0);
    const [appointmentCount, setAppointmentCount] = useState(0);

    useEffect(() => {
        getPatients().then(res => setPatientCount(res.data.length)).catch(() => {});
        getDoctors().then(res => setDoctorCount(res.data.length)).catch(() => {});
        getAppointments().then(res => setAppointmentCount(res.data.length)).catch(() => {});
    }, []);

    return (
        <Box p={3}>
            <Typography variant="h4" fontWeight="bold" mb={1}>
                Dashboard
            </Typography>
            <Typography variant="subtitle1" mb={4} color="text.secondary">
                Microservices Architecture — All services running via API Gateway
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <Paper elevation={3} sx={{ p: 3, textAlign: 'center', bgcolor: '#1976d2', color: 'white' }}>
                        <PeopleIcon sx={{ fontSize: 50 }} />
                        <Typography variant="h4" mt={1}>{patientCount}</Typography>
                        <Typography variant="h6">Patients</Typography>
                        <Typography variant="caption">via Patient Service :8082</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper elevation={3} sx={{ p: 3, textAlign: 'center', bgcolor: '#388e3c', color: 'white' }}>
                        <LocalHospitalIcon sx={{ fontSize: 50 }} />
                        <Typography variant="h4" mt={1}>{doctorCount}</Typography>
                        <Typography variant="h6">Doctors</Typography>
                        <Typography variant="caption">via Doctor Service :8083</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper elevation={3} sx={{ p: 3, textAlign: 'center', bgcolor: '#f57c00', color: 'white' }}>
                        <CalendarMonthIcon sx={{ fontSize: 50 }} />
                        <Typography variant="h4" mt={1}>{appointmentCount}</Typography>
                        <Typography variant="h6">Appointments</Typography>
                        <Typography variant="caption">via Appointment Service :8084</Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Box mt={4} p={3} bgcolor="white" borderRadius={2} boxShadow={1}>
                <Typography variant="h6" fontWeight="bold" mb={2}>🏗️ Running Services</Typography>
                <Grid container spacing={2}>
                    {[
                        { name: 'Eureka Server', port: '8761', color: '#9c27b0' },
                        { name: 'API Gateway', port: '8080', color: '#1976d2' },
                        { name: 'Auth Service', port: '8081', color: '#d32f2f' },
                        { name: 'Patient Service', port: '8082', color: '#1976d2' },
                        { name: 'Doctor Service', port: '8083', color: '#388e3c' },
                        { name: 'Appointment Service', port: '8084', color: '#f57c00' },
                    ].map(service => (
                        <Grid item xs={6} sm={4} key={service.name}>
                            <Box p={2} borderRadius={1} bgcolor={service.color} color="white" textAlign="center">
                                <Typography variant="body2" fontWeight="bold">{service.name}</Typography>
                                <Typography variant="caption">Port: {service.port}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

export default Dashboard;