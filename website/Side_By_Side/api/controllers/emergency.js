import { db } from "../connect.js";





export const send = (req, res) => {
  const { visitId, title, content } = req.body;

  // Retrieve the visitors with the specified visit ID
  const selectVisitorsQuery = `SELECT ID, Email FROM visitor WHERE ID_Visite = ?`;

  db.query(selectVisitorsQuery, [visitId], (error, results) => {
    if (error) {
      console.error('Error retrieving visitors:', error);
      res.status(500).json({ error: 'An error occurred while retrieving the visitors.' });
    } else {
      const visitors = results; // Array of visitors with their ID and Email

      // Send the emergency message to each visitor
      const insertMessageQuery = `INSERT INTO emergence (Tittle, Content, fromID, ToID, Date, seen)
                                  VALUES (?, ?, ?, ?, NOW(), 1)`;

      visitors.forEach((visitor) => {
        const visitorId = visitor.ID;
        const visitorEmail = visitor.Email;

        db.query(insertMessageQuery, [title, content, 0, visitorId], (error) => {
          if (error) {
            console.error('Error inserting emergency message:', error);
          } else {
            console.log(`Emergency message sent successfully to visitor with ID: ${visitorId}, Email: ${visitorEmail}`);
          }
        });
      });

      res.json({ message: 'Emergency messages sent successfully.' });
    }
  });
};





export const gitmasseg = (req, res) => {
  const selectMessagesQuery = `
    SELECT e.Tittle, e.Content, v.Name AS FromName, v2.Name AS ToName, e.Date
    FROM emergence AS e
    LEFT JOIN visitor AS v ON e.fromID = v.ID
    LEFT JOIN visitor AS v2 ON e.ToID = v2.ID
    LEFT JOIN emplyee AS emp ON e.fromID = emp.ID`;

  db.query(selectMessagesQuery, (error, results) => {
    if (error) {
      console.error('Error retrieving messages:', error);
      res.status(500).json({ error: 'An error occurred while retrieving the messages.' });
    } else {
      res.json(results);
    }
  });
}


export const seendone = (req, res) => {
  const { messageIds } = req.body;

  const updateMessagesQuery = `UPDATE emergence SET seen = 1 WHERE seen = 0`;

  db.query(updateMessagesQuery, [messageIds], (error, result) => {
    if (error) {
      console.error('Error marking messages as seen:', error);
      res.status(500).json({ error: 'An error occurred while marking messages as seen.' });
    } else {
      const affectedRows = result.affectedRows || 0; // Get the number of affected rows
      
      res.json({ count: affectedRows, message: 'Messages marked as seen.' });
    }
  });
};





export const seen = (req, res) => {
  const countQuery = `SELECT COUNT(*) AS count FROM emergence WHERE seen = 0`;

  db.query(countQuery, (error, result) => {
    if (error) {
      console.error('Error fetching unseen message count:', error);
      res.status(500).json({ error: 'An error occurred while fetching unseen message count.' });
    } else {
      const count = result[0].count || 0; // Get the count of unseen messages
      
      res.json({ count: count, message: 'Unseen message count fetched.' });
    }
  });
};





