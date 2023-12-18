import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaArrowLeft } from "react-icons/fa";
import "./read.css";
import Sidebar from "../../../components/sidebar/Sidebar";
import Topbar from "../../../components/topbar/Topbar";
import { FaLock,FaMapMarkerAlt,FaUserAlt ,FaCommentAlt} from "react-icons/fa";
import DialpadIcon from '@mui/icons-material/Dialpad';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import TableChartIcon from '@mui/icons-material/TableChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import moment from 'moment';

function Read(props) {
  const { id } = props;
  const [visiter, setVisiter] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/visiter/read/${id}`)
      .then((res) => {
        console.log(res);
        setVisiter(res.data[0]);
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

  return ( <>
    <Topbar/>
   <div className="homeContainer">
   <Sidebar/>

    <div className="vcontainer">
      <form  style={styles}>
      <h2 style={{ marginBottom: '0px' }}>Visiter Detail</h2>
        <div className="detail-row">
          {/* <span className="detail-label">Photo:</span> */}
          <span className="information" style={{marginTop:'20px'}}>{visiter.Photo ? (
                    <img src={ visiter.Photo} alt={visiter.Name} className="table-photo"style={{width:"80px",height:'80px'}} />
                  ) : (
                    ""
                  )}</span>
        </div>
        <div className="filde" style={{ marginTop: '0px' }}>
              <label className="fildelable" htmlFor="">ID</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <DialpadIcon /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{visiter.ID}</span>
        </div>       

              <label className="fildelable" htmlFor="">Name</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <FaUserAlt /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{visiter.Name}</span>
        </div> </div> 



        <div className="filde" style={{ marginTop: '0px' }}>
              <label className="fildelable" htmlFor="">Email</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <FaCommentAlt /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{visiter.Email}</span>
        </div>       

              <label className="fildelable" htmlFor="">Password</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <FaLock /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{visiter.Password}</span>
        </div> </div>



        <div className="filde" style={{ marginTop: '0px' }}>
              <label className="fildelable" htmlFor="">Location</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <FaMapMarkerAlt /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{visiter.Location}</span>
        </div>       

              <label className="fildelable" htmlFor="">Prisoner Name</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <DialpadIcon /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{visiter.PrisonerName}</span>
        </div> </div> 


        <div className="filde" style={{ marginTop: '0px' }}>
              <label className="fildelable" htmlFor="">ID Prisoner</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <FolderSharedIcon /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{visiter.ID_Prisoner}</span>
        </div>       

              <label className="fildelable" htmlFor="">Prison</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <CalendarViewWeekIcon /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{visiter.Prison}</span>
        </div> </div> 


         <div className="filde" style={{ marginTop: '0px' }}>
              <label className="fildelable" htmlFor="">ID Visite</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <TableChartIcon /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{visiter.ID_Visite}</span>
        </div>       

              <label className="fildelable" htmlFor="">Visit Date</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <CalendarMonthIcon /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{moment(visiter.VisitDate).format('YYYY-MM-DD')}</span>
        </div> </div> 



  
       
        
      <div className="button-row" >
        <Link style={{ textDecoration: "none",marginRight: '80px' }} to={'/visiter'} className="editbutton">
            <div style={{display:"flex",alignItems: "center",marginLeft:'90px',marginTop:'10px'}}>
            <FaArrowLeft className="button-icon" />
            <span style={{  fontWeight:'100'}}>Back</span>
            </div>
           
          </Link>
          <Link style={{ textDecoration: "none",marginRight: '0px' }} to={`/visiter/edit/${visiter.ID}`} className="editbutton">
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
