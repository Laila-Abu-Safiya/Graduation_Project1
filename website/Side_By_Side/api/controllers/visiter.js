import { db } from "../connect.js"
// import bcrypt from "bcryptjs";


// export const visitertabel = (req, res) => {

//   const q = "SELECT * FROM visitor";

//   db.query(q, (err, data) => {
//     if (err) return res.status(500).json(err);
//     return res.json(data);

//   });

 
// };

export const visitertabel = (req, res) => {
  const q = "SELECT * FROM software_project.visitor WHERE added = 1";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};


export const addvisiter = (req, res) => {
  const query = "SELECT ID, Name, Email, Password, Location, Photo, ID_Prisoner, ID_Visite, added FROM visitor WHERE added = 0";

  db.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error executing query: ', error);
      res.status(500).json({ error: 'Error retrieving visitors' });
      return;
    }
    res.json(results);
  });
}




export const register = (req, res) => {
  const visitorQuery =
    "INSERT INTO visitor (`ID`, `Name`, `Email`, `Password`, `Location`, `Photo`, `ID_Prisoner`, `ID_Visite`, `added`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const visitQuery = "SELECT Prison FROM visits WHERE ID = ?";
  const prisonerQuery = "SELECT Prison FROM prisoner WHERE ID = ?";

  const visitorValues = [
    req.body.id,
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.location,
    req.body.photo,
    req.body.id_Prisoner,
    req.body.id_Visite || null,
    0,
  ];

  const visitId = req.body.id_Visite;
  const prisonerId = req.body.id_Prisoner;

  db.query(prisonerQuery, [prisonerId], (prisonerErr, prisonerData) => {
    if (prisonerErr) {
      console.log(prisonerErr);
      return res.status(500).json({ message: "An error occurred during prisoner retrieval" });
    }

    if (prisonerData.length === 0) {
      return res.status(400).json({ message: "Prisoner ID not found" });
    }

    const prisonerPrison = prisonerData[0].Prison;

    if (!visitId) {
      visitorValues[8] = 1; // Set the value of 'added' field to 1
      db.query(visitorQuery, visitorValues, (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "An error occurred during visitor registration" });
        }

        const successMessage = "Visitor registered successfully";
        return res.status(200).json({ message: successMessage });
      });
    } else {
      db.query(visitQuery, [visitId], (visitErr, visitData) => {
        if (visitErr) {
          console.log(visitErr);
          return res.status(500).json({ message: "An error occurred during visit retrieval" });
        }

        if (visitData.length === 0) {
          return res.status(400).json({ message: "Invalid visit ID" });
        }

        const visitPrison = visitData[0].Prison;

        if (visitPrison !== prisonerPrison) {
          return res.status(400).json({ message: "Invalid visit for this prisoner" });
        }

        db.query(visitorQuery, visitorValues, (err, data) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: "An error occurred during visitor registration" });
          }

          visitorValues[8] = 1; // Set the value of 'added' field to 1
          db.query(
            "UPDATE visitor SET added = 1 WHERE ID = ?",
            [req.body.id],
            (updateErr, updateData) => {
              if (updateErr) {
                console.log(updateErr);
                return res.status(500).json({ message: "An error occurred during visitor update" });
              }

              const successMessage = "Visitor registered successfully";
              return res.status(200).json({ message: successMessage });
            }
          );
        });
      });
    }
  });
};


// export const register = (req, res) => {
//   const visitorQuery =
//     "INSERT INTO visitor (`ID`, `Name`, `Email`, `Password`, `Location`, `Photo`, `IDPrisoner`, `IDVisite`, `added`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
//   const visitQuery = "SELECT Prison FROM visits WHERE ID = ?";
//   const prisonerQuery = "SELECT Prison FROM prisoner WHERE ID = ?";

//   const visitorValues = [
//     req.body.id,
//     req.body.name,
//     req.body.email,
//     req.body.password,
//     req.body.location,
//     req.body.photo,
//     req.body.id_Prisoner,
//     req.body.id_Visite || null,
//     0,
//   ];

//   const visitId = req.body.id_Visite;
//   const prisonerId = req.body.id_Prisoner;

//   db.query(prisonerQuery, [prisonerId], (prisonerErr, prisonerData) => {
//     if (prisonerErr) return res.json(prisonerErr);

//     if (prisonerData.length === 0) {
//       return res.json({ message: "Prisoner ID not found" });
//     }

//     const prisonerPrison = prisonerData[0].Prison;

//     if (!visitId) {
//       visitorValues[8] = 1; // Set the value of 'added' field to 1
//       db.query(visitorQuery, visitorValues, (err, data) => {
//         if (err) return res.json(err);

//         const successMessage = "Visitor registered successfully";
//         return res.json({ message: successMessage });
//       });
//     } else {
//       db.query(visitQuery, [visitId], (visitErr, visitData) => {
//         if (visitErr) return res.json(visitErr);

//         if (visitData.length === 0) {
//           return res.json({ message: "Invalid visit ID" });
//         }

//         const visitPrison = visitData[0].Prison;

//         if (visitPrison !== prisonerPrison) {
//           return res.json({ message: "Invalid visit for this prisoner" });
//         }

//         db.query(visitorQuery, visitorValues, (err, data) => {
//           if (err) return res.json(err);

//           visitorValues[8] = 1; // Set the value of 'added' field to 1
//           db.query(
//             "UPDATE visitor SET added = 1 WHERE ID = ?",
//             [req.body.id],
//             (updateErr, updateData) => {
//               if (updateErr) return res.json(updateErr);

//               const successMessage = "Visitor registered successfully";
//               return res.json({ message: successMessage });
//             }
//           );
//         });
//       });
//     }
//   });
// };






  export const read = (req, res) => {
    const q = `
      SELECT v.*, p.Name AS PrisonerName, vis.VisitDate, vis.Prison
      FROM visitor AS v
      LEFT JOIN prisoner AS p ON v.ID_Prisoner = p.ID
      LEFT JOIN visits AS vis ON v.ID_Visite = vis.ID
      WHERE v.ID = ?
    `;
    const ID = req.params.ID;
  
    db.query(q, [ID], (err, data) => {
      if (err) {
        return res.status(500).json({ Message: "error" });
      }
      return res.json(data);
    });
  };
  
  
  

  export const edit = (req, res) => {
    const { Name, Email, Password, Location, Photo, ID_Prisoner, ID_Visite } = req.body;
    const ID = parseInt(req.params.ID);
    
    
    if (isNaN(ID)) {
      return res.status(400).json({ Message: "Invalid ID parameter" });
    }
  
    const q = 'UPDATE visitor SET `Name`=?, `Email`=?, `Password`=?, `Location`=?, `Photo`=?, `ID_Prisoner`=?, `ID_Visite`=? WHERE ID=?';
  
    db.query(q, [Name, Email, Password, Location, Photo, ID_Prisoner, ID_Visite, ID], (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ Message: "error" });
      }
      return res.json(data);
    });
  };
  

  export const deleted = (req, res) => {
    const q = "DELETE FROM visitor WHERE ID = ?";
    const ID = req.params.ID;
  
    db.query(q,[ID], (err, data) => {
      if (err) {
        return res.status(500).json({Message: "error"});
      }
      return res.json(data);
    });

  }
  


  export const addvisitertosystem = (req, res) => {
    const visitorID = req.params.ID; // Update this line
  console.log(visitorID)
    // Check if the prisoner exists in the system for the given visitorID
    const checkPrisonerQuery = "SELECT * FROM prisoner WHERE ID = (SELECT ID_Prisoner FROM visitor WHERE ID = ?)";
  
    db.query(checkPrisonerQuery, [visitorID], (prisonerError, prisonerResults) => {
      if (prisonerError) {
        console.error("Error executing query:", prisonerError);
        res.status(500).json({ error: "Error checking prisoner" });
        return;
      }
  
      if (prisonerResults.length === 0) {
        res.status(400).json({ error: "Prisoner not found" });
        return;
      }
  
      // Update the visitor's added field to 1
      const updateVisitorQuery = "UPDATE visitor SET added = 1 WHERE ID = ?";
  
      db.query(updateVisitorQuery, [visitorID], (error, results) => {
        if (error) {
          console.error("Error executing query:", error);
          res.status(500).json({ error: "Error updating visitor" });
          return;
        }
  
        res.sendStatus(200);
      });
    });
  };
  