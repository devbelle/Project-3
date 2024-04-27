import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Auth from '../utils/auth';


//from Devin's React Portfolio
const Trip = () => {
    const [message, setMessage] = useState('');
    










    return (
        <div>
            <div>
                <h2>What should you bring?</h2>
            </div>
            <form id="contact-form" onSubmit={/* submit button */}>
        
                <div className="field">
                    <label className="label" htmlFor="message">Packing...</label>
                    <textarea className="textarea" name="message" id="text" rows="5" defaultValue={/* message function for user entry of packing*/} onBlur={/* handlefrom function*/} />
                </div>
                    {/* error message function*/ && (
                <div>
                    <p className="is-danger">{/* Error message function*/}</p>
                </div>
                )}
                    <button className="button is-medium is-primary is-fullwidth" data-testid="button" type="submit">Submit</button>
            </form>
        </div>

    )


}