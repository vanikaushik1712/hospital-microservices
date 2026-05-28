import React, { useState, useEffect } from 'react';
import {
    Box, Button, TextField, Typography, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Paper,
    Dialog, DialogTitle, DialogContent, DialogActions, MenuItem
} from '@mui/material';
import { getAppointments, createAppointment, updateAppointmentStatus, deleteAppointment, getPatients, getDoctors } from '../api';

function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        patientId: '',
        doctorId: '',
        appointmentDate: '',
        appointmentTime: '',
        notes: ''
    });

    useEffect(() => {
        fetchAppointments();
        fetchPatients();
        fetchDoctors();
    }, []);

    const fetchAppointments = async () => {
        const res = await getAppointments();
        setAppointments(res.data);
    };

    const fetchPatients = async () => {
        const res = await getPatients();
        setPatients(res.data);
    };

    const fetchDoctors = async () => {
        const res = await getDoctors();
        setDoctors(res.data);
    };

    const handleSave = async () => {
        await createAppointment(form);
        setOpen(false);
        fetchAppointments();
    };

    const handleStatusChange = async (id, status) => {
        await updateAppointmentStatus(id, status);
        fetchAppointments();
    };

    const handleDelete = async (id) => {
        await deleteAppointment(id);
        fetchAppointments();
    };

    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold">Appointments</Typography>
                <Button variant="contained" color="warning" onClick={() => setOpen(true)}>Add Appointment</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ bgcolor: '#f57c00' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'white' }}>Patient ID</TableCell>
                            <TableCell sx={{ color: 'white' }}>Doctor ID</TableCell>
                            <TableCell sx={{ color: 'white' }}>Date</TableCell>
                            <TableCell sx={{ color: 'white' }}>Time</TableCell>
                            <TableCell sx={{ color: 'white' }}>Status</TableCell>
                            <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointments.map(a => (
                            <TableRow key={a.id}>
                                <TableCell>{a.patientId}</TableCell>
                                <TableCell>{a.doctorId}</TableCell>
                                <TableCell>{a.appointmentDate}</TableCell>
                                <TableCell>{a.appointmentTime}</TableCell>
                                <TableCell>{a.status}</TableCell>
                                <TableCell>
                                    <Button size="small" color="success" onClick={() => handleStatusChange(a.id, 'COMPLETED')}>Complete</Button>
                                    <Button size="small" color="error" onClick={() => handleDelete(a.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <DialogTitle>Add Appointment</DialogTitle>
                <DialogContent>
                    <TextField
                        select fullWidth margin="normal" label="Patient"
                        value={form.patientId}
                        onChange={e => setForm({ ...form, patientId: e.target.value })}
                    >
                        {patients.map(p => (
                            <MenuItem key={p.id} value={p.id}>{p.firstName} {p.lastName}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select fullWidth margin="normal" label="Doctor"
                        value={form.doctorId}
                        onChange={e => setForm({ ...form, doctorId: e.target.value })}
                    >
                        {doctors.map(d => (
                            <MenuItem key={d.id} value={d.id}>{d.firstName} {d.lastName}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        fullWidth margin="normal" label="Date" type="date"
                        InputLabelProps={{ shrink: true }}
                        value={form.appointmentDate}
                        onChange={e => setForm({ ...form, appointmentDate: e.target.value })}
                    />
                    <TextField
                        fullWidth margin="normal" label="Time" type="time"
                        InputLabelProps={{ shrink: true }}
                        value={form.appointmentTime}
                        onChange={e => setForm({ ...form, appointmentTime: e.target.value })}
                    />
                    <TextField
                        fullWidth margin="normal" label="Notes"
                        value={form.notes}
                        onChange={e => setForm({ ...form, notes: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" color="warning" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Appointments;