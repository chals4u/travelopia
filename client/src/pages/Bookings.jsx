import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import  "./style.css";
const Books = () => {
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/booking");
        setBooking(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);
  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:8800/books/${id}`);
  //     window.location.reload()
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  let i =0
  return (
    <div>
      <h1>Trip List Report</h1>
      <div id="resp-table">
    <div id="resp-table-body">
        <div class="resp-table-row"> 
        <div class="table-body-cell">
                S.No 
            </div>
            <div class="table-body-cell">
                Name 
            </div>
            <div class="table-body-cell">
                Email
            </div>
            <div class="table-body-cell">
                Destination 
            </div>
            <div class="table-body-cell">
                No Of Tickets 
            </div>
            <div class="table-body-cell">
                Amount 
            </div>
        </div>
        {
        booking.map((book,index) => (
        <div class="resp-table-row"> 
            <div class="table-body-cell">
                {index+1}
            </div>
            <div class="table-body-cell">
            {book.name}
            </div>
            <div class="table-body-cell">
            {book.email} 
            </div>
            <div class="table-body-cell">
            {book.destination=='1'?"India":book.destination=="2"?"Africa":"Europe"} 
            </div>
            <div class="table-body-cell">
            {book.qty} 
            </div>
            <div class="table-body-cell">
            {book.net_amt+'$'} 
            </div>
        </div>
        ))}
    </div>
</div>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new booking
        </Link>
      </button>
    </div>
  );
};

export default Books;
