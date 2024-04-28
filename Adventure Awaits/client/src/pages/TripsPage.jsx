import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Auth from '../utils/auth';

const Trip = () => {
    const [title, setTitle] = useState('');
    const [destination, setDestination] = useState('');
    const [notes, setNotes] = useState('');










    return (
        <div>
            <div>
                <h2>Add Trips</h2>
            </div>
            <div>Loading...</div>
            <div>
                <h3>Trip Name</h3>
                {/* Title use state*/}   
            </div>
            <div>
                <h3>Destination</h3>
                {/* Destination use state*/}   
            </div>
            <div>
                <h3>Notes</h3>
                {/* Note use state*/}   
            </div>
        </div>


    )


}
