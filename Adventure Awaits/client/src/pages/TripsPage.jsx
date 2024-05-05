// import HeaderPages from '../components/HeaderPages';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import Auth from '../utils/auth';
// import { ADD_TRIP } from "../utils/mutations";
// import { useMutation, useQuery } from "@apollo/client";
// import EditTripPage from './EditTripPage';
// import { QUERY_ME } from '../utils/queries';

// const TripsBox = styled.div`
// justify-content: space-between;
// width: 90%;
// max-width: 430px;
// padding: 10px;
// background-color: white;
// border-radius: 10px;
// align-items: center;
// border: 3px solid black;
// margin-bottom: 250px;
// margin-top: 200px;
// `

// const Section = styled.div`
//   width: 50%;
//   height: 100%;
//   background-color: #ffad73;
//   border: 1px solid black;
// `;
// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;
// const Button = styled.button`
//   width: 100px;
//   display: block;
//   border: 1px solid black;
//   padding: 5px;
//   margin-top: 10px;
// `;
// const Input = styled.input`
//   padding: 5px;
//   margin: 5px;
// `;

// const Edittrip = styled.div`
// margin-right: 200px,
// `;

// const TripsPage = () => {

//   const [startDate, setStartDate] = useState();
//   const [endDate, setEndDate] = useState();
//   const [formState, setFormState] = useState({
//     title: "",
//     destination: "",
//     notes: "",
//     startDate: null,
//     endDate: null,
//   });

//   const [addTrip] = useMutation(ADD_TRIP);

//   const { data, loading } = useQuery(QUERY_ME);
//   //posibly needed for a trips list
//   const trips = data?.me.trips || [];
//   console.log(trips);
//   console.log(data);

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;

//         //const updatedName = name === 'name' ? 'title' : title;

//         setFormState({ ...formState, [name]: value });
//       };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         console.log(formState)

//         try {
//             const { data } = await addTrip({
//               variables: { ...formState, startDate, endDate },
//             });

//             setFormState({
//                 title: '',
//                 destination: '',
//                 startDate: null,
//                 endDate: null,
//                 notes: '',
//               });
//             setStartDate(null);
//             setEndDate(null);
//             //possible function needed to match Ids with API

//         } catch (err) {
//             console.error(err);
//         }

//     }

//     return (
//       <>
//         <TripsBox>
//         <HeaderPages title="Let's Travel" color="#ADD8E6" font="Arial" fontSize="24px" marginTop= '15px' imgSrc="/images/globe.jpg" />
//             <Section>
//                 <h2>Add Trips</h2>
//             </Section>
//             <Form onSubmit={handleSubmit}>
//             <Section>
//                 <label htmlFor="name">Trip Name</label>

//                 <Input
//                     type="text"
//                     className="form-control"
//                     name="title"
//                     placeholder="Trip Name"
//                     value={formState.title}
//                     onChange={handleInputChange}
//                 />

//             </Section>
//             <Section>
//                 <label htmlFor="location">Destination</label>
//                 <Input
//                     type="text"
//                     className="form-control"
//                     name="destination"
//                     placeholder="Destination"
//                     value={formState.destination}
//                     onChange={handleInputChange}
//                 />

//             </Section>
//             <Section>
//                 <label htmlFor="start-date">Start Date</label>
//                 <DatePicker
//                         selectsStart
//                         selected = {startDate}
//                         onChange = {(date) => setStartDate(date)}
//                         startDate = {startDate}
//                     />
//                     </Section>
//                     <Section>
//                     <label htmlFor="start-date">End Date</label>
//                 <DatePicker
//                         selectsStart
//                         selected = {endDate}
//                         onChange = {(date) => setEndDate(date)}
//                         endDate = {endDate}
//                         startDate={startDate}
//                         minDate = {startDate}
//                 />
//             </Section>
//             <Section>
//             <label className="" htmlFor="message">Notes...</label>
//                 <textarea
//                     className=""
//                     name="notes"
//                     placeholder="notes"
//                     value={formState.notes}
//                     onChange={handleInputChange}
//                 ></textarea>

//             </Section>
//             <div>

//                  <Button type='submit'>Add trip</Button>
//             </div>
//             </Form>
//         </TripsBox>

//         <h2>My Trips</h2>
//         {loading ? (
//           <div>Loading...</div>
//         ) : (
//           <Edittrip>
//           <ul>
//             {trips.map((trip) => (
//             <div key={trip._id}>
//               <li>
//                 <h3>{trip.title}</h3>
//                 <p>Destination: {trip.destination}</p>
//                 <p>Start Date: {trip.startDate}</p>
//                 <p>End Date: {trip.endDate}</p>
//                 <p>Notes: {trip.notes}</p>
//               </li>

//               <Link
//               key={trip._id + 'link'}
//               to={`/trip/${trip._id}`}>Edit Trip</Link>
//               </div>
//             ))}

//           </ul>
//           </Edittrip>

//         )}

//       </>

// )};

// export default TripsPage;

import HeaderPages from "../components/HeaderPages";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Auth from "../utils/auth";
import { ADD_TRIP } from "../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";
import EditTripPage from "./EditTripPage";
import { QUERY_ME } from "../utils/queries";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const TripsPage = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [formState, setFormState] = useState({
    title: "",
    destination: "",
    notes: "",
    startDate: null,
    endDate: null,
  });

  const [addTrip] = useMutation(ADD_TRIP);

  const { data, loading } = useQuery(QUERY_ME);
  const trips = data?.me.trips || [];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addTrip({
        variables: { ...formState, startDate, endDate },
      });

      setFormState({
        title: "",
        destination: "",
        startDate: null,
        endDate: null,
        notes: "",
      });
      setStartDate(null);
      setEndDate(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container" style={{ marginTop: "100px", paddingTop: "5px" }}>
  <div className="row justify-content-start">
    <div className="col-12 col-sm-8 col-md-6 col-lg-4">
      <div
        className="card"
        style={{
          border: "3px solid black",
          position: "fixed", 
          top: "150px", // adjust this value to match your header's height
          maxHeight: "calc(90vh - 100px)", // limit the height to the viewport height minus the header height
          width: "100%", // full width on small screens
          maxWidth: "300px" // limit width on larger screens
        }}
      >
            <div className="card-body text-center" style={{ marginTop: "2px" , overflowY: "auto" }}>
              <HeaderPages
                title="Let's Travel"
                color="#ADD8E6"
                font="Arial"
                fontSize="24px"
                marginTop="2px"
                imgSrc="/images/globe.jpg"
              />
              <h2
                className="text-center  font-weight-bold"
                style={{ marginTop: '-50px' }}
              >
                Add Trips
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label
                    htmlFor="name"
                    className="label-color"
                    style={{ fontWeight: "bold", color: "black" }}
                  >
                    Trip Name
                  </label>
                  <input
                    type="text"
                    className="form-control input-blue-border"
                    name="title"
                    placeholder="Trip Name"
                    value={formState.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="location"
                    className="label-color"

                    style={{ fontWeight: "bold", color: "black" }}
                  >
                    Destination
                  </label>
                  <input
                    type="text"
                    className="form-control input-blue-border"
                    name="destination"
                    placeholder="Destination"
                    value={formState.destination}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="start-date"
                    style={{ fontWeight: "bold", color: "black" }}
                  >
                    Start Date
                  </label>
                  <DatePicker
                    selectsStart
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    startDate={startDate}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="end-date"
                    style={{ fontWeight: "bold", color: "black" }}
                  >
                    End Date
                  </label>
                  <DatePicker
                    selectsStart
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    endDate={endDate}
                    startDate={startDate}
                    minDate={startDate}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="message"
                    style={{ fontWeight: "bold", color: "black" }}
                  >
                    Notes...
                  </label>
                  <textarea
                    className="form-control"
                    name="notes"
                    placeholder="notes"
                    value={formState.notes}
                    onChange={handleInputChange}
                    style={{ borderColor: "blue" }}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Add trip
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <h2>My Trips</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <ul>
            {trips.map((trip) => (
              <div key={trip._id}>
                <li>
                  <h3>{trip.title}</h3>
                  <p>Destination: {trip.destination}</p>
                  <p>Start Date: {trip.startDate}</p>
                  <p>End Date: {trip.endDate}</p>
                  <p>Notes: {trip.notes}</p>
                </li>
                <Link
                  key={trip._id + "link"}
                  to={`/trip/${trip._id}`}
                  className="btn btn-secondary"
                >
                  Edit Trip
                </Link>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TripsPage;
