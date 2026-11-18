const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const db = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  database: ' kniznica_db'      // need space
});

db.connect((err) => {
  if (err) {
    console.error('Chyba pri pripajani k databaze: ' + err.stack);
  } else {
    console.log('pripojeno k databaze');
  }
});

app.get('/api/zadania', (req, res) => {
  db.query('SELECT * FROM zadanie', (err, rows) => {
    if (err) {
      console.error('chyba:', err);
      return res.status(500).json({ error: 'Chyba pri dotaze na databazu' });
    }
    res.json(rows);
  });
});

app.post('/api/zadania', (req, res) => {
  const { nazov, autor, rok, cena } = req.body;
  db.query(
    'INSERT INTO zadanie (nazov, autor, rok, cena) VALUES (?, ?, ?, ?)',
    [nazov, autor, rok, cena],
    (err, results) => {
      if (err) {
        console.error('Chyba pri vkladani do databazy: ' + err.stack);
        return res.status(500).json({ error: 'Chyba pri vkladani do databazy' });
      }
      res.status(201).json({ id: results.insertId, nazov, autor, rok, cena });
    }
  );
});

app.delete('/api/zadania/:id', (req, res) => {
    db.query('DELETE FROM zadanie WHERE id = ?', [req.params.id], (err) => {
        if (err) {
            console.error('Chyba pri mazani: ' + err.stack);
            return res.status(500).json({ error: 'Chyba pri mazani' });
        }
        res.json({ ok: true });
    });
});

app.patch('/api/zadania/:id/cena', (req, res) => {
    const zmena = Number(req.body.zmena);
    if (!Number.isFinite(zmena)) {
        return res.status(400).json({ error: 'Neplatna hodnota' });
    }
    db.query('UPDATE zadanie SET cena = cena + ? WHERE id = ?', [zmena, req.params.id], (err) => {
        if (err) {
            console.error('Chyba pri zmene ceny: ' + err.stack);
            return res.status(500).json({ error: 'Chyba pri zmene ceny' });
        }
        res.json({ ok: true });
    });
});

app.put('/api/zadania/:id', (req, res) => {
    const { nazov, autor, rok} = req.body;
    if (!nazov || !autor || !Number.isInteger(rok) ) {
        return res.status(400).json({ error: 'Neplatne hodnoty' });
    }
    const sql = 'UPDATE zadanie SET nazov = ?, autor = ?, rok = ? WHERE id = ?';
    db.query(sql, [nazov, autor, rok, req.params.id], (err, vysledok) => {
        if (err) { return res.status(500).send("Chyba SQL");}
        if (!vysledok.affectedRows) {return res.sendStatus(404);}
        res.send("kniha upravena");
    });
  });

app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/404.html');
});

app.listen(3000, () => {
  console.log('Server bezi na http://localhost:3000');
});