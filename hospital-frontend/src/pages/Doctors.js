import React, { useState, useEffect } from 'react';
import {
    Box, Button, TextField, Typography, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Paper,
    Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { getDoctors, createDoctor, updateDoctor, deleteDoctor } from '../api';

function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [open, setOpen] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState(null);
    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '',
        phone: '', specialization: '', qualification: '',
        department: '', available: true
    });

    useEffect(() => { fetchDoctors(); }, []);

    const fetchDoctors = async () => {
        const res = await getDoctors();
        setDoctors(res.data);
    };

    const handleOpen = (doctor = null) => {
        setEditingDoctor(doctor);
        setForm(doctor || {
            firstName: '', lastName: '', email: '',
            phone: '', specialization: '', qualification: '',
            department: '', available: true
        });
        setOpen(true);
    };

    const handleSave = async () => {
        if (editingDoctor) {
            await updateDoctor(editingDoctor.id, form);
        } else {
            await createDoctor(form);
        }
        setOpen(false);
        fetchDoctors();
    };

    const handleDelete = async (id) => {
        await deleteDoctor(id);
        fetchDoctors();
    };

    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold">Doctors</Typography>
                <Button variant="contained" color="success" onClick={() => handleOpen()}>Add Doctor</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ bgcolor: '#388e3c' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'white' }}>Name</TableCell>
                            <TableCell sx={{ color: 'white' }}>Email</TableCell>
                            <TableCell sx={{ color: 'white' }}>Specialization</TableCell>
                            <TableCell sx={{ color: 'white' }}>Department</TableCell>
                            <TableCell sx={{ color: 'white' }}>Available</TableCell>
                            <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {doctors.map(d => (
                            <TableRow key={d.id}>
                                <TableCell>{d.firstName} {d.lastName}</TableCell>
                                <TableCell>{d.email}</TableCell>
                                <TableCell>{d.specialization}</TableCell>
                                <TableCell>{d.department}</TableCell>
                                <TableCell>{d.available ? 'Yes' : 'No'}</TableCell>
                                <TableCell>
                                    <Button size="small" onClick={() => handleOpen(d)}>Edit</Button>
                                    <Button size="small" color="error" onClick={() => handleDelete(d.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <DialogTitle>{editingDoctor ? 'Edit Doctor' : 'Add Doctor'}</DialogTitle>
                <DialogContent>
                    {['firstName', 'lastName', 'email', 'phone', 'specialization', 'qualification', 'department'].map(field => (
                        <TextField
                            key={field} fullWidth margin="normal"
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={form[field] || ''}
                            onChange={e => setForm({ ...form, [field]: e.target.value })}
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" color="success" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Doctors;