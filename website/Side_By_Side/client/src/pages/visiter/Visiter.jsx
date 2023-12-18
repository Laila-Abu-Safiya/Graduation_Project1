import "./visiter.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaEye, FaPrint } from "react-icons/fa";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import SearchIcon from '@mui/icons-material/Search';

export default function Visiter() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: '#my-table' });
    doc.save('table.pdf');
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/visiter/visitertabel")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/visiter/delete/${id}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((visiter) => {
    const { ID, Name, Email, Location } = visiter;
    const searchTermLower = searchTerm.toLowerCase();

    return (
      ID.toString().includes(searchTermLower) ||
      Name.toLowerCase().includes(searchTermLower) ||
      Email.toLowerCase().includes(searchTermLower) ||
      Location.toLowerCase().includes(searchTermLower)
    );
  });

  const sortedData = sortBy
    ? [...filteredData].sort((a, b) => {
        if (sortBy === "ID") {
          return a.ID - b.ID;
        } else if (sortBy === "Name") {
          return a.Name.localeCompare(b.Name);
        } else if (sortBy === "Email") {
          return a.Email.localeCompare(b.Email);
        } else if (sortBy === "Location") {
          return a.Location.localeCompare(b.Location);
        }
      })
    : filteredData;

  const handleSort = (field) => {
    setSortBy(field);
  };

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />

        <div className="visetor-table-container" style={{ marginTop: "15px", flex: "9" }}>
          <div className="visetor-table-header">
            <h2 className="titel" style={{ marginBottom: '20px' }}>Visetor</h2>
            <div className="buttonTop">
              <Link style={{ textDecoration: "none", marginRight: '20px' }} className="btn solid" to={"/visiter/create"}>
                <div style={{ display: "flex", alignItems: "center", marginLeft: '40px', marginTop: '12px' }}>
                  <GroupAddIcon className="sidebarIcon" />
                  <span style={{ fontWeight: '200' }}>Add Viseters</span>
                </div>
              </Link> 
              <button style={{ marginRight: '20px' }} onClick={handlePrint} className="btn solid">
<div style={{ display: "flex", alignItems: "center", marginLeft: '90px' }}>
  <FaPrint style={{ marginRight: '10px' }} className="print-icon" />
  <span style={{ fontWeight: '500' }} >Print</span>
</div>
</button>
<button style={{ marginRight: '20px' }} onClick={handleDownload} className="btn solid">
<div style={{ display: "flex", alignItems: "center", marginLeft: '60px' }}>
  <ArrowDownwardIcon className="print-icon" />
  <span style={{ marginTop: '3px', fontWeight: '500' }}>Download PDF</span>
</div>
</button>
<div className="input-fieldv">
<i className="fas fa-user"><SearchIcon/></i>
<input
type="text"
placeholder="Search..."
className="search-bar"
value={searchTerm}
onChange={handleSearch}
/>
</div>
</div>
</div>

<div className="table">
<table id="my-table" className="visetor-table">
<thead>
<tr>
  <th onClick={() => handleSort("ID")}>ID</th>
  <th onClick={() => handleSort("Name")}>Name</th>
  <th onClick={() => handleSort("Email")}>Email</th>
  <th>Password</th>
  <th onClick={() => handleSort("Location")}>Location</th>
  <th>Photo</th>
  <th>ID Prisoner</th>
  <th>ID Visite</th>
  <th>Action</th>
</tr>
</thead>
<tbody>
{sortedData.map((visiter, index) => {
  return (
    <tr key={index}>
      <td>{visiter.ID}</td>
      <td>{visiter.Name}</td>
      <td>{visiter.Email}</td>
      <td>{visiter.Password}</td>
      <td>{visiter.Location}</td>
      <td>
        {visiter.Photo ? (
          <img src={visiter.Photo} alt={visiter.Name} className="table-photo" />
        ) : (
          "-"
        )}
      </td>
      <td>{visiter.ID_Prisoner}</td>
      <td>{visiter.ID_Visite}</td>
      <td>
        <Link to={`/visiter/edit/${visiter.ID}`} className="visetor-action-link">
          <FaEdit className="action-icon edit-icon" />
        </Link>
        <Link to={`/visiter/read/${visiter.ID}`} className="visetor-action-link">
          <FaEye className="action-icon view-icon" />
        </Link>
        <button
          className="visetor-action-link"
          onClick={() => handleDelete(visiter.ID)}
        >
          <FaTrashAlt className="action-icon delete-icon" />
        </button>
      </td>
    </tr>
  );
})}
</tbody>
</table>
</div>
</div>
</div>
</>
);
}
