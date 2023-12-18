

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import sbs from '../.././sbs.png';
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";

const Proofpapers = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [futureDate, setFutureDate] = useState('');
  const [error, setError] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [visitorData, setVisitorData] = useState([]);

  const fetchProofpapers = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/proofpapers/${id}`);
      if (response.status === 200) {
        const data = response.data;
        if (data.length > 0) {
          setVisitorData(data);
        } else {
          clearForm();
        }
      } else {
        setError('Error retrieving proof papers. Please try again.');
        clearForm();
      }
    } catch (error) {
      console.error(error);
      setError('Error retrieving proof papers. Please try again.');
      clearForm();
    }
  };

  useEffect(() => {
    if (showOutput) {
      fetchProofpapers();
    }
  }, [showOutput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowOutput(true);
  };

  const handleChange = (e) => {
    setId(e.target.value);
    setShowOutput(false);
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    const frames = document.querySelectorAll('.frame');
  
    if (frames.length === 0) {
      return;
    }
  
    const pdf = new jsPDF();
  
    for (let i = 0; i < frames.length; i++) {
      if (i !== 0) {
        pdf.addPage();
      }
  
      const canvas = await html2canvas(frames[i]);
      const imgData = canvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  
      if (i === frames.length - 1) {
        pdf.save('proofpapers.pdf');
      }
    }
  };
  
  // const handleDownload = (e) => {
  //   e.preventDefault();
  //   const frames = document.querySelectorAll('.frame');

  //   if (frames.length === 0) {
  //     return;
  //   }

  //   const pdf = new jsPDF();

  //   frames.forEach((frame, index) => {
  //     if (index !== 0) {
  //       pdf.addPage();
  //     }

  //     html2canvas(frame).then((canvas) => {
  //       const imgData = canvas.toDataURL('image/png');
  //       const imgProps = pdf.getImageProperties(imgData);
  //       const pdfWidth = pdf.internal.pageSize.getWidth();
  //       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  //       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

  //       if (index === frames.length - 1) {
  //         pdf.save('proofpapers.pdf');
  //       }
  //     });
  //   });
  // };

  const clearForm = () => {
    setId('');
    setName('');
    setLocation('');
    setCurrentDate('');
    setFutureDate('');
    setError('');
    setVisitorData([]);
  };

  return (
    <>
        <Topbar />

      <div className="homeContainer">
             <Sidebar />

        <div className="proofpapers" style={{flex:'9.1'}}>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <form onSubmit={handleSubmit}>
              <div>
                <h2 style={{ marginBottom: '40px' }}>Proof Papers</h2>
                <label style={{ fontWeight: '800', marginTop: '40px' }}>
                  Enter Visit ID
                  <input className="input-field" type="text" value={id} onChange={handleChange} />
                </label>
              </div>
              <br />
              <button className="btn solid" style={{ width: '250px' }} type="submit">Generate Permit Form</button>
            </form>
          </div>

          {error && (
            <div className="error-message">{error}</div>
          )}

          {showOutput && !error && visitorData.length > 0 && (
            <div id="mydata">
              {visitorData.map((visitor, index) => (
                <div className="frame" key={index}>
                  <div style={{ border: 'thick double #32a1ce', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '80vh', marginTop: '20px', marginRight: '20px', marginLeft: '20px' }}>
                    <img src={sbs} alt="ICRC" width="150" height="150" style={{ alignSelf: 'center', marginBottom: '20px' }} />
                    <h1 className="text1">تصريح دخول إلى إسرائيل</h1>
                    <div style={{ display: 'flex' }}>
                      <h2 style={{ marginRight: ' 60px' }}>{visitor.ID}</h2>
                      <h2 className="text">:حامل الهوية / ID Holder </h2>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <h2 style={{ marginRight: ' 60px' }}>{visitor.Name}</h2>
                      <h2 className="text">:الشخص / Person </h2>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <h2 style={{ marginRight: ' 60px' }}>{visitor.Location}</h2>
                      <h2 className="text">: الساكن / Location </h2>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <h2 style={{ marginRight: ' 60px' }}>{visitor.CurrentDate}</h2>
                      <h2 className="text">:سريان التصريح من / Valid from </h2>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <h2 style={{ marginRight: ' 60px' }}>{visitor.FutureDate}</h2>
                      <h2 className="text">:سريان التصريح إلى / Valid to </h2>
                    </div>
                    <p style={{ color: 'red', marginTop: '20px', marginBottom: '20px' }}>يسمح له بالدخول الى مناطق الخط الأخضر لغرض الزيارة</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showOutput && !error && visitorData.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button className="btn solid" style={{ width: '250px' }} onClick={handleDownload}>Download PDF Form</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Proofpapers;
