import React, { useState, useEffect } from 'react';
import {
    Box, Button, TextField, Typography, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Paper,
    Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { getPatients, createPatient, updatePatient, deletePatient } from '../api';

function Patients() {
    const [patients, setPatients] = useState([]);
    const [open, setOpen] = useState(false);
    const [editingPatient, setEditingPatient] = useState(null);
    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '',
        phone: '', dateOfBirth: '', gender: '',
        address: '', bloodGroup: ''
    });

    useEffect(() => { fetchPatients(); }, []);

    const fetchPatients = async () => {
        const res = await getPatients();
        setPatients(res.data);
    };

    const handleOpen = (patient = null) => {
        setEditingPatient(patient);
        setForm(patient || {
            firstName: '', lastName: '', email: '',
            phone: '', dateOfBirth: '', gender: '',
            address: '', bloodGroup: ''
        });
        setOpen(true);
    };

    const handleSave = async () => {
        if (editingPatient) {
            await updatePatient(editingPatient.id, form);
        } else {
            await createPatient(form);
        }
        setOpen(false);
        fetchPatients();
    };

    const handleDelete = async (id) => {
        await deletePatient(id);
        fetchPatients();
    };

    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold">Patients</Typography>
                <Button variant="contained" onClick={() => handleOpen()}>Add Patient</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ bgcolor: '#1976d2' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'white' }}>Name</TableCell>
                            <TableCell sx={{ color: 'white' }}>Email</TableCell>
                            <TableCell sx={{ color: 'white' }}>Phone</TableCell>
                            <TableCell sx={{ color: 'white' }}>Gender</TableCell>
                            <TableCell sx={{ color: 'white' }}>Blood Group</TableCell>
                            <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patients.map(p => (
                            <TableRow key={p.id}>
                                <TableCell>{p.firstName} {p.lastName}</TableCell>
                                <TableCell>{p.email}</TableCell>
                                <TableCell>{p.phone}</TableCell>
                                <TableCell>{p.gender}</TableCell>
                                <TableCell>{p.bloodGroup}</TableCell>
                                <TableCell>
                                    <Button size="small" onClick={() => handleOpen(p)}>Edit</Button>
                                    <Button size="small" color="error" onClick={() => handleDelete(p.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <DialogTitle>{editingPatient ? 'Edit Patient' : 'Add Patient'}</DialogTitle>
                <DialogContent>
                    {['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'gender', 'address', 'bloodGroup'].map(field => (
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
                    <Button variant="contained" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Patients;