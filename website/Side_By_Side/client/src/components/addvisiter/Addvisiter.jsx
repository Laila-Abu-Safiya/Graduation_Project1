


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './addvisiter.css';
// import Sidebar from "./../sidebar/Sidebar";
// import Topbar from "./../topbar/Topbar";

// const Addvisiter = () => {
//   const [visitors, setVisitors] = useState([]);

//   useEffect(() => {
//     fetchVisitors();
//   }, []);

//   const fetchVisitors = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/visiter/addvisiter');
//       const data = response.data;
//       setVisitors(data);
//     } catch (error) {
//       console.error('Error fetching visitors:', error);
//     }
//   };

//   const acceptVisitor = async (id) => {
//     console.log(id);
//     try {
//       await axios.put(`http://localhost:8080/api/visiter/addvisitertosystem/${id}`);
//       fetchVisitors();
//     } catch (error) {
//       console.error('Error accepting visitor:', error);
//     }
//   };

//   const deleteVisitor = async (id) => {
//     console.log(id);

//     try {
//       await axios.delete(`http://localhost:8080/api/visiter/delete/${id}`);
//       fetchVisitors();
//     } catch (error) {
//       console.error('Error deleting visitor:', error);
//     }
//   };

//   return (
//     <>
//       <Topbar />
//       <div className="homeContainer">
//         <Sidebar />
//         <div className="visetor-table-container" style={{ marginTop: "15px", flex: "9" }}>
//           <div className="visetor-table-header">
//             <h2 className="titel" style={{ marginBottom: '20px' }}>Accept Visitor In System</h2>
//             <div className="table">
//               <table id="my-table" className="visetor-table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>ID Prisoner</th>
//                     <th>Email</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {visitors.map(visitor => (
//                     <tr key={visitor.ID}>
//                       <td>{visitor.Name}</td>
//                       <td>{visitor.IDPrisoner}</td>
//                       <td>{visitor.Email}</td>
//                       <td>
//                         <button onClick={() => acceptVisitor(visitor.ID)} className="action-button accept-button">Accept</button>
//                         <button onClick={() => deleteVisitor(visitor.ID)} className="action-button delete-button">Delete</button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Addvisiter;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './addvisiter.css';
import Sidebar from "./../sidebar/Sidebar";
import Topbar from "./../topbar/Topbar";

const Addvisiter = () => {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/visiter/addvisiter');
      const data = response.data;
      setVisitors(data);
    } catch (error) {
      console.error('Error fetching visitors:', error);
    }
  };

  const acceptVisitor = async (id, email) => {
    console.log(id);
    try {
      await axios.put(`http://localhost:8080/api/visiter/addvisitertosystem/${id}`);
      sendEmailToVisitor(email);
      fetchVisitors();
    } catch (error) {
      console.error('Error accepting visitor:', error);
    }
  };

  const sendEmailToVisitor = (email) => {
    const subject = 'Your visit has been accepted';
    const body = 'Dear Visitor,\n\nYour request to register in the application has been accepted Side By Side.\n\nBest regards,\nThe Management';
    const composeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(composeUrl);
  };

  const deleteVisitor = async (id) => {
    console.log(id);

    try {
      await axios.delete(`http://localhost:8080/api/visiter/delete/${id}`);
      fetchVisitors();
    } catch (error) {
      console.error('Error deleting visitor:', error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <div className="visetor-table-container" style={{ marginTop: "15px", flex: "9" }}>
          <div className="visetor-table-header">
            <h2 className="titel" style={{ marginBottom: '20px' }}>Accept Visitor In System</h2>
            <div className="table">
              <table id="my-table" className="visetor-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>ID Prisoner</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visitors.map(visitor => (
                    <tr key={visitor.ID}>
                      <td>{visitor.Name}</td>
                      <td>{visitor.ID_Prisoner}</td>
                      <td>{visitor.Email}</td>
                      <td>
                        <button onClick={() => acceptVisitor(visitor.ID, visitor.Email)} className="action-button accept-button">Accept</button>
                        <button onClick={() => deleteVisitor(visitor.ID)} className="action-button delete-button">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addvisiter;
