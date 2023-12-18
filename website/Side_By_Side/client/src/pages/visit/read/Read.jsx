import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaArrowLeft } from "react-icons/fa";
import "./read.css";
import Sidebar from "../../../components/sidebar/Sidebar";
import Topbar from "../../../components/topbar/Topbar";
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import DialpadIcon from '@mui/icons-material/Dialpad';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity';
import EventIcon from '@mui/icons-material/Event';
import DateRangeIcon from '@mui/icons-material/DateRange';
import moment from 'moment';

function Read(props) {
  const { id } = props;
  const [visit, setvisit] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/visit/read/${id}`)
      .then((res) => {
        console.log(res);
        setvisit(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);


  const styles = {
    borderRadius: "10px",
    padding: "20px",
    width: "100%",
    height: "600px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: '5px'  

    
  }

  return (<>
    <Topbar />
    <div className="homeContainer">
      <Sidebar />

      <div className="vcontainer">
      <form  style={styles}>
      <h2 style={{ marginBottom: '0px' }}>Visit Detail</h2>
      <div className="filde" style={{ marginTop: '0px' }}>
              <label className="fildelable" htmlFor="">ID</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <DialpadIcon /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{visit.ID}</span>
          </div>
          <label className="fildelable" htmlFor="">Visit Date</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <CalendarMonthIcon /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{moment(visit.VisitDate).format('YYYY-MM-DD')}</span>
        </div> </div> 
          
        <div className="filde" style={{ marginTop: '0px' }}>
        <label className="fildelable" htmlFor="">AvailableDate:</label>
        <div className="input-field">
                <i className="fas fa-envelope"> <DateRangeIcon /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{moment(visit.AvailableDate).format('YYYY-MM-DD')}</span>
          </div>


          <label className="fildelable" htmlFor="">Day:</label>
          <div className="input-field">
                <i className="fas fa-envelope"> <EventIcon /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{visit.Day}</span>
          </div>          </div>



          <div className="filde" style={{ marginTop: '0px' }}>
          <label className="fildelable" htmlFor="">Reserve Number:</label>
          <div className="input-field">
                <i className="fas fa-envelope"> <ReduceCapacityIcon /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{visit.ReserveNumber}</span>
          </div>
          <label className="fildelable" htmlFor="">Prison</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <CalendarViewWeekIcon /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{visit.Prison}</span>
          </div>          </div>





          <div className="button-row" >
        <Link style={{ textDecoration: "none",marginRight: '80px' }} to={'/visit'} className="editbutton">
            <div style={{display:"flex",alignItems: "center",marginLeft:'90px',marginTop:'10px'}}>
            <FaArrowLeft className="button-icon" />
            <span style={{  fontWeight:'100'}}>Back</span>
            </div>
           
          </Link>
          <Link style={{ textDecoration: "none",marginRight: '0px' }} to={`/visit/edit/${visit.ID}`} className="editbutton">
            <div style={{display:"flex",alignItems: "center",marginLeft:'90px',marginTop:'10px'}}>
            <FaEdit className="button-icon" />
            <span style={{  fontWeight:'100'}}>Edit</span>
            </div>
           
          </Link>
        </div>  



        </form>
      </div>
    </div>
  </>
  );
}

export default Read;
