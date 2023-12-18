import { db } from "../connect.js"
// import bcrypt from "bcryptjs";


export const visittabel = (req, res) => {

  const q = "SELECT * FROM visits";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);

  });

 
};
// export const register = (req, res) => {

//   const q = "INSERT INTO visits (`ID`,`VisitDate`,`AvailableDate`,`Day`,`ReserveNumber`,`Prison`) VALUES (?)";
//   const values=[
//     req.body.id,
//     req.body.visitDate,
//     req.body.availableDate,
//     req.body.day,
//     req.body.reserveNumber,
//     req.body.prison,
    


//   ]
 
//    db.query(q, [values],(err, data) => {
//      if (err) return res. json(err);
//      return res.json(data);
 
//    });
//    }

export const register = (req, res) => {
  const { id, visitDate, availableDate, day, reserveNumber, prison } = req.body;
  
  // Check if the prison exists in the prisoner table
  const checkPrisonQuery = "SELECT COUNT(*) AS count FROM prisoner WHERE Prison = ?";
  db.query(checkPrisonQuery, [prison], (err, result) => {
    if (err) return res.json({ error: err });
    
    const prisonCount = result[0].count;
    if (prisonCount === 0) {
      return res.json({ error: "Prison does not exist in the prisoner table" });
    }
    
    // Insert the visit into the visits table
    const insertVisitQuery = "INSERT INTO visits (`ID`, `VisitDate`, `AvailableDate`, `Day`, `ReserveNumber`, `Prison`) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [id, visitDate, availableDate, day, reserveNumber, prison];
  
    db.query(insertVisitQuery, values, (err, data) => {
      if (err) return res.json({ error: err });
      return res.json({ success: true });
    });
  });
};



   export const read = (req, res) => {
    const q = "SELECT * FROM visits WHERE ID = ?";
    const ID = req.params.ID;
  
    db.query(q,[ID], (err, data) => {
      if (err) {
        return res.status(500).json({Message: "error"});
      }
      return res.json(data);
    });
  };

  
  

  export const edit = (req, res) => {
    const { VisitDate, AvailableDate, Day, ReserveNumber, Prison } = req.body;
    const ID = parseInt(req.params.ID);
    
    if (isNaN(ID)) {
      return res.status(400).json({ Message: "Invalid ID parameter" });
    }
  
    const q = 'UPDATE visits SET `VisitDate`=?, `AvailableDate`=?, `Day`=?, `ReserveNumber`=?, `Prison`=? WHERE ID=?';
  
    db.query(q, [VisitDate,  AvailableDate, Day, ReserveNumber, Prison, ID], (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ Message: "error" });
      }
      return res.json(data);
    });
  };
  

  export const deleted = (req, res) => {
    const q = "DELETE FROM visits WHERE ID = ?";
    const ID = req.params.ID;
  
    db.query(q,[ID], (err, data) => {
      if (err) {
        return res.status(500).json({Message: "error"});
      }
      return res.json(data);
    });

  }
  