const sql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
//const http = require('http');
//const { Server } = require("socket.io");
//const io = new Server(serv);
//const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const {axios}= require('axios');
//connection
app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));
var connection = sql.createConnection({
    host: 'localhost',
    database:'software_project',
    user : 'root',
    password : ''
});

server.listen(3000, () => {
    console.log('listening on *:3000');
  });


connection.connect(function(error){
    if(error){
        console.log(error);

    }
    else{
        console.log('connect succefully');
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  
  io.on('connection', (socket) => {
    console.log('a user connected');
  
   /* setTimeout(()=>{
      let obj = {
        channel_name: 'Intellect Developer',
        subscribers : '2k+',
        message: 'Please like this'  
      }
      socket.emit('customEvent',{data: {obj}})
    },4000);
  
    socket.on('clientEvent',(data)=>{
      console.log("client data recived: ",data)
    })*/
   socket.on('send_msg',(data) =>{
      console.log("received message in server side",data)
      io.emit('recived_msg',data)
   })
  
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

// get all available visites
app.get('/AvailbleVistes', function(req,res){
    connection.query('select * from visits', function(error,rows,feilds){
        if(error) console.log(error)
        else{
           
            console.log(rows)
            res.send(rows)
        }
    })
})

//show news
app.get('/NewsPage', function(req,res){
    connection.query('select * from post', function(error,rows,feilds){
        if(error) console.log(error)
        else{
           
            console.log(rows)
            res.send(rows)
        }
    })
})

/// info
app.get('/info', function(req,res){
    connection.query('select * from  info', function(error,rows,feilds){
        if(error) console.log(error)
        else{
           
            console.log(rows)
            res.send(rows)
        }
    })
})
////getLogin
app.get('/getLogin',function(req,res){
    //console.log(loginId)
    connection.query('SELECT loginID FROM login', function(error,rows,feilds){
        if(error) console.log(error)
        else{
            //console.log(rows)
            var result = JSON.parse(JSON.stringify(rows));
           // console.log(result[result.length - 1]);
            loginId = result[result.length - 1].loginID;
            console.log(result[result.length - 1])
            res.send(result[result.length - 1])}
        })
    })





//show visites that the user has been reserve
app.get('/ReservedPage', function(req,res){
    //console.log(loginId)
    connection.query('SELECT loginID FROM login', function(error,rows,feilds){
        if(error) console.log(error)
        else{
            //console.log(rows)
            var result = JSON.parse(JSON.stringify(rows));
           // console.log(result[result.length - 1]);
            loginId = result[result.length - 1].loginID;
            //console.log(loginId)
    connection.query('SELECT ID_Visite FROM visitor WHERE ID= ?',[loginId], function(error,rows,feilds){
        if(error) console.log(error)
        else{
           const VisitID = rows[0].ID_Visite;;
            console.log(VisitID)

            connection.query('SELECT * FROM visits WHERE ID = ?', [VisitID], function (error, results, fields) {
                if (error) throw error;
            
                // Do something with the results
                //console.log(results);
                res.send(results)
              });

        }
    })}
})
    
})

//signUp
app.post('/signup', async (req,res)=>{
    const insert= 'INSERT INTO visitor (`ID` , `Name`, `Email`, `Password`, `Location`, `Photo`, `ID_Prisoner`, `ID_Visite`) Values (?,?,?,?,?,?,?,?)';
    const values = [
        req.body.ID,
        req.body.Name,
        req.body.Email,
        req.body.Password, 
        req.body.Location,
        '0',
        0,
        0

    ]
    console.log(values);
    connection.query(insert,values, (err,data)=>{
        if(err) return res.json(err);
        else{
//console.log(data);
return res.json(data);

        }
    })



});

//login
let loginId =0;
app.post('/login',(req,res)=>{
    const sql = 'SELECT * FROM visitor where ID = ? and Password = ? and added = ?';
    const values = [
        req.body.ID,
        req.body.Password
    ]
    connection.query(sql,[values[0].ID, values[1].Password, 1], (err,data) =>{
        if(err) return res.json(err);
        if(data.length === 0){
            console.log('hello')
          return( res.status(404).json("User not found!"))
          //  console.log('hello')
        }
        else {
            var result = JSON.parse(JSON.stringify(data))
        loginId = result[0].ID;
        const values = {id:0,loginID: loginId};
        console.log(loginId);
        connection.query("INSERT INTO login SET?",values,(err,result)=>{
            if(err){
                res.send('error');
            }else{
                res.send(result);
            }

        }
        )
        //res.status(200).json("User found!")
        console.log('hi')
      // return res.status(200).json("User found!")
    }
        
        /*if(Object.keys(data).length !== 0){
        console.log(typeof(data));
        var result = JSON.parse(JSON.stringify(data))
        loginId = result[0].ID;
        const values = {id:0,loginID: loginId};
        console.log(loginId);
        connection.query("INSERT INTO login SET?",values,(err,result)=>{
            if(err){
                res.send('error');
            }else{
                res.send(result);
            }
        })
        
        //return res.redirect('/AvailbleVistes');

        }
        else{

        }*/
    })
})
//
app.get('/reserved/:id',(req,res) =>{ 
    const sql = 'SELECT * FROM visits where ID = ?';
    const id = req.params.id;
    connection.query(sql,[id], (err, result) =>{
        if(err) return res.json({Error:err});
        return res.json(result);
    })
})

//cancel a visit which it reserved
app.put('/delete/:id',(req,res) =>{
    const sql = 'update visitor set ID_Visite = ? where ID_Visite = ? and ID = ?'
    const id = parseInt(req.params.id);
    console.log((parseInt(id)))
    

    connection.query('SELECT loginID FROM login', function(error,rows,feilds){
        if(error) console.log(error)
        else{
            //console.log(rows)
            var result = JSON.parse(JSON.stringify(rows));
           // console.log(result[result.length - 1]);
            loginId = result[result.length - 1].loginID;
            //console.log(loginId)
            const values = [0, id,loginId];
    connection.query(sql,values, (err, result) =>{
        if(err) return res.json({Error:err});
        else{
            console.log(values);
            return res.json(result);

        }
        
    })
}
    })
})

//increment likes number
/*app.post('/IncLikes/:id',(req,res) =>{
    connection.query('SELECT loginID FROM login', function(error,rows,feilds){
        if(error) console.log(error)
        else{
            //console.log(rows)
            var result = JSON.parse(JSON.stringify(rows));
           // console.log(result[result.length - 1]);
            loginId = result[result.length - 1].loginID;
            console.log(loginId);

    const insert= 'INSERT INTO `like`(`idlike`, `emplyeeid`, `postid`) VALUES (?,?,?)';
    const values = [
        '0',
        loginId,
        req.params.id

    ]
    console.log(values);
    connection.query(insert,values, (err,data)=>{
        if(err) return res.json(err);
        else{
//console.log(data);
return res.json(data);

        }
    })
        }}
    )

  });
*/
  //get like number
  app.post('/IncLikes/:id',(req,res) =>{
    connection.query('SELECT loginID FROM login', function(error,rows,feilds){
        if(error) console.log(error)
        else{
            //console.log(rows)
            var result = JSON.parse(JSON.stringify(rows));
           // console.log(result[result.length - 1]);
            loginId = result[result.length - 1].loginID;
            console.log(loginId);
            postID = req.params.id;
            console.log(loginId)
            console.log(parseInt(postID))
            const likeGet = 'SELECT * FROM `like` where emplyeeid=? and postid = ?';
            connection.query(likeGet,[loginId,parseInt(postID)], function(error,rows,feilds){
                if(error) {console.log(error)}
                else{
                    if(rows.length===0){ 
                     const insert= 'INSERT INTO `like` (`idlike`, `emplyeeid`, `postid`) VALUES (?,?,?)';
                    const values = [
                        '0',
                        loginId,
                        req.params.id
                
                    ]
                    
                    console.log(values);
                    connection.query(insert,values, (err,data)=>{
                        if(err) return res.json(err);
                        else{
                            console.log("hello")
                            let query = "SELECT COUNT(postid) AS id_count FROM `like` WHERE postid=?";
                  
                             connection.query(query,postID, (err, rows) => {
                                 if(err) throw err;
                                 else{
                                 console.log(rows[0].id_count);
                                 const sql = 'update `post` set NumberLikes = ? where id = ?'
                                 connection.query(sql,[ (rows[0].id_count) ,parseInt(postID)], (err, result) =>{
                                    if(err) return res.json({Error:err});
                                    else{
                                      
                                        return res.json(result);
                            
                                    }
                                    
                                })
                 
                             }
                             });
                
                            
                //return res.json(data);
                
                        }
                    });}
                    else{
                        const delet ='DELETE FROM `like` WHERE `emplyeeid`=? AND `postid`=?'

                        connection.query(delet,[loginId,parseInt(postID)], (err,data)=>{
                            if(err) return res.json(err);
                            else{
                                console.log("hello")
                                let query = "SELECT COUNT(postid) AS id_count FROM `like` WHERE postid=?";
                      
                                 connection.query(query,postID, (err, rows) => {
                                     if(err) throw err;
                                     else{
                                     console.log(rows[0].id_count);
                                     const sql = 'update `post` set NumberLikes = ? where id = ?'
                                     connection.query(sql,[ (rows[0].id_count) ,parseInt(postID)], (err, result) =>{
                                        if(err) return res.json({Error:err});
                                        else{
                                          
                                            return res.json(result);
                                
                                        }
                                        
                                    })
                     
                                 }
                                 });
                    
                                
                    //return res.json(data);
                    
                            }
                        });
                    }

}
            });

}
    })
});
    




  ///get number of like
  app.get('/getLikes',(req,res) => {
    const q = "SELECT emplyeeid FROM like WHERE postid = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.map(like=>like.emplyeeid));
  });
  })

//ResetPassowrd
app.put('/ResetPassowrd',(req,res) =>{
    const sql = 'update visitor set Password = ? where ID = ?'
    const values = [
        req.body.ID,
        req.body.Password
    ]
    //console.log(values[0].id)
    console.log(values[1].Password)
    connection.query(sql,[ values[1].Password,parseInt(values[0].ID)], (err, result) =>{
        if(err) return res.json({Error:err});
        else{
          //  console.log(values);
            return res.json(result);

        }
        
    })
}
)

/// visit was reserve
app.put('/ReserveVisit/:id',(req,res) =>{

    connection.query('SELECT loginID FROM login', function(error,rows,feilds){
        if(error) console.log(error)
        else{
            //console.log(rows)
            var result = JSON.parse(JSON.stringify(rows));
           // console.log(result[result.length - 1]);
            loginId = result[result.length - 1].loginID;
            console.log(loginId);


    connection.query('select ID_Prisoner from visitor WHERE ID= ?',[loginId], function(error,rows,feilds){
        if(error) console.log(error)
        else{
            var result = JSON.parse(JSON.stringify(rows));
            // console.log(result[result.length - 1]);
             prisonerId = result[result.length - 1].ID_Prisoner;
            console.log(prisonerId)
           // res.send(rows)
           connection.query('select Prison from prisoner WHERE ID= ?',[prisonerId], function(error,rows,feilds){
            if(error) console.log(error)
            else{
                var result = JSON.parse(JSON.stringify(rows));
                // console.log(result[result.length - 1]);
                 prisonerName = result[result.length - 1].Prison;
                console.log(prisonerName)
                const id = parseInt(req.params.id);
                connection.query('select Prison from visits WHERE id= ?',[id], function(error,rows,feilds){
                    if(error) console.log(error)
                    else{
                        console.log(rows)
                        var result = JSON.parse(JSON.stringify(rows));
                // console.log(result[result.length - 1]);
                        Name = result[result.length - 1].Prison;
                        const sql = 'update visitor set ID_Visite = ? where ID = ?'
                       // const id = parseInt(req.params.id);
                      // var success = 0;
                        if(Name === prisonerName){
                          //  success = 1;
                        console.log((parseInt(id)))
                       // console.log('heelo')
                        const values = [ id,loginId];
                        connection.query(sql,values, (err, result) =>{
                            if(err) return res.json({Error:err});
                            else{
                                console.log(result);
                                return  res.send('1')
                    
                            }
                            
                        })
                    }else{
                        console.log(result)
                        return res.status(404).send("0")

                    }

                    }
                })



            }
        })

        }
    })
}})




})

app.get('/Chat', function(req,res){
    connection.query('select * from visitor', function(error,rows,feilds){
        if(error) console.log(error)
        else{
           
            console.log(rows)
            res.send(rows)
        }
    })
})

app.get('/permit', function(req,res){
    connection.query('SELECT loginID FROM login', function(error,rows,feilds){
        if(error) console.log(error)
        else{
            //console.log(rows)
            var result = JSON.parse(JSON.stringify(rows));
           // console.log(result[result.length - 1]);
            loginId = result[result.length - 1].loginID;
            console.log(loginId);
    connection.query('select * from permit WHERE id= ?',[loginId], function(error,rows,feilds){
        if(error) console.log(error)
        else{
           
            console.log(rows)
            res.send(rows)
        }
    })
}})
})

//user
app.post('/EmergUser',(req,res)=>{
    connection.query('SELECT loginID FROM login', function(error,rows,feilds){
        if(error) console.log(error)
        else{
            //console.log(rows)
            var result = JSON.parse(JSON.stringify(rows));
           // console.log(result[result.length - 1]);
            loginId = result[result.length - 1].loginID;
            console.log(loginId);

    const insert= 'INSERT INTO emergence (`id` , `Tittle`, `Content`, `fromID`, `ToID`, `Date`) Values (?,?,?,?,?,?)';
    const values = [
        0,
        req.body.Tittle,
        req.body.content,
        loginId,
        1264,
        new Date()

    ]
    console.log(values);
    connection.query(insert,values, (err,data)=>{
        if(err) return res.json(err);
        else{
//console.log(data);
return res.json(data);

        }
    })
        }}
    )

})

//EmergRed
app.post('/EmergRed',(req,res)=>{
    connection.query('SELECT loginID FROM login', function(error,rows,feilds){
        if(error) console.log(error)
        else{
            //console.log(rows)
            var result = JSON.parse(JSON.stringify(rows));
           // console.log(result[result.length - 1]);
            loginId = result[result.length - 1].loginID;
            console.log(loginId);

    const insert= 'INSERT INTO emergence (`id` , `Tittle`, `Content`, `fromID`, `ToID`, `Date`) Values (?,?,?,?,?,?)';
    const values = [
        0,
        req.body.Tittle,
        req.body.content,
        loginId,
        0,
        new Date()

    ]
    console.log(values);
    connection.query(insert,values, (err,data)=>{
        if(err) return res.json(err);
        else{
//console.log(data);
return res.json(data);

        }
    })
        }}
    )

})
///
//get Red Message
app.get('/Message', function(req,res){
    connection.query('SELECT loginID FROM login', function(error,rows,feilds){
        if(error) console.log(error)
        else{
            //console.log(rows)
            var result = JSON.parse(JSON.stringify(rows));
           // console.log(result[result.length - 1]);
            loginId = result[result.length - 1].loginID;
            console.log(loginId);
    connection.query('select * from emergence WHERE (fromID= ? or ToID=?) and ToID < ?',[loginId,loginId,1263], function(error,rows,feilds){
        if(error) console.log(error)
        else{
           
            console.log(rows)
            res.send(rows)
        }
    })
}})
})

//get user Message
app.get('/Message2', function(req,res){
    connection.query('select * from emergence WHERE ToID=?',[1264], function(error,rows,feilds){
        if(error) console.log(error)
        else{
           
            console.log(rows)
            res.send(rows)
        }
    })
})

///get My visit

app.get('/MyVisits', function(req,res){
    connection.query('SELECT loginID FROM login', function(error,rows,feilds){
        if(error) console.log(error)
        else{
            //console.log(rows)
            var result = JSON.parse(JSON.stringify(rows));
           // console.log(result[result.length - 1]);
            loginId = result[result.length - 1].loginID;
            console.log(loginId);


    connection.query('select ID_Prisoner from visitor WHERE ID= ?',[loginId], function(error,rows,feilds){
        if(error) console.log(error)
        else{
            var result = JSON.parse(JSON.stringify(rows));
            // console.log(result[result.length - 1]);
             prisonerId = result[result.length - 1].ID_Prisoner;
            console.log(prisonerId)
           // res.send(rows)
           connection.query('select Prison from prisoner WHERE ID= ?',[prisonerId], function(error,rows,feilds){
            if(error) console.log(error)
            else{
                var result = JSON.parse(JSON.stringify(rows));
                // console.log(result[result.length - 1]);
                 prisonerName = result[result.length - 1].Prison;
                console.log(prisonerName)

                connection.query('select * from visits WHERE Prison= ?',[prisonerName], function(error,rows,feilds){
                    if(error) console.log(error)
                    else{
                        console.log(rows)
                        res.send(rows)

                    }
                })


            }
        })

        }
    })
}})
})

//get all users
app.get('/users', function(req,res){
    connection.query('select * from visitor where added = ?',[1], function(error,rows,feilds){
        if(error) console.log(error)
        else{
           
          //  console.log(rows)
            res.send(rows)
        }
    })
})