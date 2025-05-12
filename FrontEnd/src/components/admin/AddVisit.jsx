import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';

export default function AddVisit() {
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');
    const [phone, setPhone] = useState('');
    const [pet, setPet] = useState([]);
    const [user, setUser] = useState(null);
    const [service, setService] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [petId, setPetId] = useState(null);
    const [employee, setEmployee] = useState([]);
    const [emID, setEmID] = useState(null);
    const [message, setMessage] = useState('');

    // Function to handle finding customer and pet info
    const handleFindCus = async () => {
        try {
            const res = await axios.post("http://localhost:5000/Admin/employee/info-customer", { phone: phone });
            const customerData = res.data.customers.message[0];
            setUser(customerData);

            // After customer info is fetched, get the pet info
            const petRes = await axios.post("http://localhost:5000/Admin/employee/info-pet", { customer_id: customerData.id });
            setPet(petRes.data.customers.message);

            // Set the default pet and employee ID after fetching data
            if (petRes.data.customers.message.length > 0) {
                setPetId(petRes.data.customers.message[0].id); // Set the first pet as default
            }
            if (employee.length > 0) {
                setEmID(employee[0].id); // Set the first employee as default
            }
        } catch (error) {
            console.error("Error fetching customer or pet data", error);
        }
    };

    // Function to fetch services and employees on page load
    useEffect(() => {
        const fetchServiceData = async () => {
            const res = await axios.get("http://localhost:5000/Admin/employee/info-services");
            setService(res.data.services.message);
        };

        const fetchEmployeeData = async () => {
            const res = await axios.get("http://localhost:5000/Admin/employee-info");
            setEmployee(res.data.employee.message);
        };

        fetchServiceData();
        fetchEmployeeData();
    }, []);

    // Function to handle adding a selected service to the table
    const handleFindService = (serviceId) => {
        const selectedService = service.find(item => item.id === serviceId);
        if (selectedService) {
            setSelectedServices([...selectedServices, selectedService]);
        }
    };

    const getPetId = (e) => setPetId(e.target.value);
    const getEmID = (e) => setEmID(e.target.value);

    const formatDate = (date) => {
        const [day, month, year] = date.split('/');
        return `${day}`;
    };

    const handleAdd = async () => {
        try {
            const res = await axios.post("http://localhost:5000/Admin/employee/visit_form", {
                date: formatDate(date),
                notes: notes,
                customer_id: user.id,
                pet_id: petId,
                employee_id: emID,
                services: selectedServices.map(item => item.id),

            });
            setMessage("Thêm Thành Công")
            setTimeout(() => {
                setMessage('');
            }, 3000);

        } catch (error) {
            console.error("Error creating visit form", error);
        }
    };

    return (

        <div className="visit-form-container">
            {message && <div className="success-message">{message}</div>}

            <div className='visit-form'>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => { setDate(e.target.value) }}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="date">Notes</label>
                    <input
                        type="text"
                        id="notes"
                        value={notes} onChange={(e) => { setNotes(e.target.value) }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Customer Phone</label>
                    <span >
                        <input type="phone" value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                        <Button onClick={handleFindCus}>Tìm</Button>
                    </span>
                </div>

                {user && (
                    <>
                        <div className="form-group">
                            <label>Customer Info</label>
                            <div>
                                <input type="text" value={`${user.first_name} ${user.last_name}`} readOnly />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Pet Info</label>
                            <div>
                                <select name="pet" id="pet" value={petId} onChange={getPetId}>
                                    {pet.map((item) => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </>
                )}

                <div className="form-group">
                    <label htmlFor="phone">Employee info</label>
                    <span>
                        <select name="emp" id="emp" value={emID} onChange={getEmID}>
                            {employee.map((item) => (
                                item.role !== "quit" && (
                                    <option key={item.id} value={item.id}>{item.first_name} {item.last_name}</option>
                                )
                            ))}
                        </select>
                    </span>
                </div>

                <div className="form-group">
                    <label>Services</label>
                    <span>
                        <select name="ser" id="ser">
                            {service.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                        <Button onClick={(e) => {
                            e.preventDefault();
                            const selectedServiceId = parseInt(document.getElementById('ser').value);
                            handleFindService(selectedServiceId);
                        }}>Thêm</Button>
                    </span>
                </div>

                <Button onClick={handleAdd}>Tạo</Button>
            </div>

            {selectedServices.length > 0 && (
                <div className="selected-services">
                    <label>Selected Services</label>
                    <table>
                        <thead>
                            <tr>
                                <th>Service Name</th>
                                <th>Price</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedServices.map((service, index) => (
                                <tr key={index}>
                                    <td>{service.name}</td>
                                    <td>{service.price} VND</td>
                                    <td>{service.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
