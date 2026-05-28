import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';

function Sidebar({ currentPage, setCurrentPage, onLogout }) {
    const menuItems = [
        { label: 'Dashboard', icon: <DashboardIcon />, page: 'dashboard' },
        { label: 'Patients', icon: <PeopleIcon />, page: 'patients' },
        { label: 'Doctors', icon: <LocalHospitalIcon />, page: 'doctors' },
        { label: 'Appointments', icon: <CalendarMonthIcon />, page: 'appointments' },
    ];

    return (
        <Box sx={{
            width: 240, minHeight: '100vh', bgcolor: '#1a237e',
            color: 'white', display: 'flex', flexDirection: 'column'
        }}>
            <Box p={3}>
                <Typography variant="h6" fontWeight="bold">🏥 HMS Micro</Typography>
                <Typography variant="caption">Microservices Edition</Typography>
            </Box>
            <List>
                {menuItems.map(item => (
                    <ListItem
                        button key={item.page}
                        onClick={() => setCurrentPage(item.page)}
                        sx={{
                            bgcolor: currentPage === item.page ? '#283593' : 'transparent',
                            '&:hover': { bgcolor: '#283593' },
                            borderRadius: 1, mx: 1, mb: 0.5
                        }}
                    >
                        <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                    </ListItem>
                ))}
            </List>
            <Box mt="auto" p={2}>
                <Button
                    fullWidth variant="outlined"
                    startIcon={<LogoutIcon />}
                    onClick={onLogout}
                    sx={{ color: 'white', borderColor: 'white' }}
                >
                    Logout
                </Button>
            </Box>
        </Box>
    );
}

export default Sidebar;