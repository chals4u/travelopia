import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [booking, setBooking] = useState({
    name: "",
    email: "",
    destination: "",
    qty: null,
    net_amt: "",
  });
  const [error, setError] = useState("")

  const navigate = useNavigate();

  const handleChange = (e) => {

    setBooking((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const tripBooking = async (e) => {
    e.preventDefault();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var qty = document.getElementById("qty").value;
    var net_amt = document.getElementById("net_amt").value;
    if (name == '' && email == '' && qty=='' && net_amt=='')
      setError("Please fill all the fields! ")
    else {
      try {
        let result = await axios.post("http://localhost:8800/booking", booking);
        navigate("/");
      } catch (err) {
        console.log(err);
        setError(err)
      }
    }

  };

  return (
    <div className="form">
      <h1>Trip Booking</h1>
      <span style={{color:"red"}}>{error!='' && error}</span>
      <input
        id="name"
        className="form-control"
        type="text"
        placeholder="User Name"
        name="name"
        onChange={handleChange}
      />
      <input
        id="email"
        className="form-control"
        type="text"
        placeholder="Email"
        name="email"
        onChange={handleChange}
      />
      <select name="destination" onChange={handleChange}>
        <option value="0">--Select Trip--</option>
        <option value="1">India</option>
        <option value="2">Africa</option>
        <option value="3">Europe</option>
      </select>
      <input
        id="qty"
        type="number"
        placeholder="No of Persons"
        name="qty"
        onChange={handleChange}
      />
      <input
        id="net_amt"
        type="text"
        placeholder="Ticket Price"
        name="net_amt"
        onChange={handleChange}
      />
      <button onClick={tripBooking}>Add</button>
      
      <Link to="/">See all bookings</Link>
    </div>
  );
};

export default Add;
