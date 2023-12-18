import { db } from "../connect.js"

export const proofpapers = (req, res) => {
  const id = req.params.id;

  const query = `SELECT ID, Name, Location FROM visitor WHERE ID_Visite = ${id}`;

  db.query(query, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      const currentDate = new Date();
      const futureDate = new Date();
      futureDate.setHours(futureDate.getHours() + 48);

      const visitors = result.map(visitor => {
        return {
          ID: visitor.ID,
          Name: visitor.Name,
          Location: visitor.Location,
          CurrentDate: currentDate,
          FutureDate: futureDate
        };
      });

      res.json(visitors);
    } else {
      res.status(404).json({ message: 'Visitors not found' });
    }
  });
}
