import { db } from "../connect.js"
// import bcrypt from "bcryptjs";


export const prisonerstabel = (req, res) => {

  const q = "SELECT * FROM prisoner";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);

  });

 
};
export const register = (req, res) => {

  const q = "INSERT INTO prisoner (`ID`,`Name`,`Location`,`PrisoneDate`,`EndDate`,`Prison`) VALUES (?)";
  const values=[
    req.body.id,
    req.body.name,
    req.body.location,
    req.body.prisoneDate,
    req.body.EndDate,
    req.body.Prison,
    


  ]
 
   db.query(q, [values],(err, data) => {
     if (err) return res. json(err);
     return res.json(data);
 
   });
   }

  //  export const read = (req, res) => {
  //   const q = "SELECT * FROM prisoner WHERE ID = ?";
  //   const ID = req.params.ID;
  
  //   db.query(q,[ID], (err, data) => {
  //     if (err) {
  //       return res.status(500).json({Message: "error"});
  //     }
  //     return res.json(data);
  //   });
  // };


  export const read = (req, res) => {
    const q = `
      SELECT p.*, v.Name AS VisitorName, v.ID AS VisitorID
      FROM prisoner AS p
      LEFT JOIN visitor AS v ON p.ID = v.ID_Prisoner
      WHERE p.ID = ?
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
    const { Name, Location, PrisoneDate, EndDate, Prison } = req.body;
    const ID = parseInt(req.params.ID);
    
    if (isNaN(ID)) {
      return res.status(400).json({ Message: "Invalid ID parameter" });
    }
  
    const q = 'UPDATE prisoner SET `Name`=?, `Location`=?, `PrisoneDate`=?, `EndDate`=?, `Prison`=? WHERE ID=?';
  
    db.query(q, [Name,  Location, PrisoneDate, EndDate, Prison, ID], (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ Message: "error" });
      }
      return res.json(data);
    });
  };
  

  export const deleted = (req, res) => {
    const q = "DELETE FROM prisoner WHERE ID = ?";
    const ID = req.params.ID;
  
    db.query(q,[ID], (err, data) => {
      if (err) {
        return res.status(500).json({Message: "error"});
      }
      return res.json(data);
    });

  }
  