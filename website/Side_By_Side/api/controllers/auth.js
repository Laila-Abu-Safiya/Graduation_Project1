import { db } from "../connect.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import axios from "axios";



// export const register = (req, res) => {
//   //CHECK  USER EXISTS

//   const q = "SELECT * FROM emplyee WHERE Email = ?";

//   db.query(q, [req.body.Email], (err, data) => {
//     if (err) return res.status(500).json(err);
//     if (data.length) return res.status(409).json("Emplyee already exists!");

//     //CREATE NEW USER
//     //HASH PASSWORD

//     const salt = bcrypt.genSaltSync(10);
//     const hashedPassword = bcrypt.hashSync(req.body.Password, salt);

//     const insertQuery =
//       "INSERT INTO emplyee (`Name`, `Email`, `Password` ,`Photo`, `Location`) VALUES (?,?,?,?,?)";

//     const values = [req.body.Name, req.body.Email, hashedPassword, req.body.Photo, req.body.Location];

//     db.query(insertQuery, values, (err, data) => {
//       if (err) return res.status(500).json(err);
//       return res.status(200).json("Emplyee has been created.");
//     });
//   });
// };






export const register = async (req, res) => {
  //CHECK IF USER EXISTS
  const q = "SELECT * FROM emplyee WHERE Email = ?";
  const username = req.body.Name;

  try {
    const chatEngineResponse = await axios.put(
      "https://api.chatengine.io/users/",
      {
        username: username,
        secret: username,
        first_name: username
      },
      { headers: { "private-key": "4092fe66-d5a2-49f8-b2df-31ca5a536e02" } }
    );

    //CREATE NEW USER
    //HASH PASSWORD
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.Password, salt);

    const insertQuery =
      "INSERT INTO emplyee (`Name`, `Email`, `Password` ,`Photo`, `Location`) VALUES (?,?,?,?,?)";

    const values = [
      req.body.Name,
      req.body.Email,
      hashedPassword,
      req.body.Photo,
      req.body.Location
    ];

    db.query(insertQuery, values, (err, data) => {
      if (err) return res.status(500).json(err);

      const token = jwt.sign({ ID: data.insertId }, "secretkey");

      const { Password, ...others } = req.body;

      res.cookie("accessToken", token, {
        httpOnly: true,
      }).status(chatEngineResponse.status).json(chatEngineResponse.data);
    });
  } catch (e) {
    if (e.response) {
      return res.status(e.response.status).json(e.response.data);
    }
    console.log(e.response);
    return res.status(500).json({ message: "Server Error" });
  }
};







export const login = (req,res)=>{

  const q="SELECT * FROM emplyee WHERE Email = ?"
 
  db.query(q,[req.body.Email],(err,data)=>{
    if(err) return res.status(500).json(err);
    if(data.length ===0) return res.status(404).json("Emplyee not found!")

    const checkPassword = bcrypt.compareSync(req.body.Password, data[0].Password)

    if(!checkPassword) return res.status(400).json("Wrong Password or Email")


    const token = jwt.sign({ID:data[0].ID}, "secretkey");

    const {Password, ...others}= data[0]

    res.cookie("accessToken", token, {
      httpOnly: true,
    }).status(200).json(others);


  })

}







export const logout = (req, res) => {
 

res.clearCookie("accessToken",{
  secure:true,
  sameSite:"none"
}).status(200).json("Emplyee has been loged out")
} 








export const updateUser = (req, res) => {
  const employeeId = req.params.id;
  const { Name, Password, Photo, Location, CoverPage } = req.body;

  // Check if Password is provided
  if (!Password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  // Hash the password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(Password, salt);

  const query =
    'UPDATE emplyee SET Name = ?, Password = ?, Photo = ?, Location = ?, CoverPage = ? WHERE ID = ?';
  const values = [Name, hashedPassword, Photo, Location, CoverPage, employeeId];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Failed to update employee' });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }

    res.json({ message: 'Employee updated successfully' });
  });
};

