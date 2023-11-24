require('dotenv').config();
express = require('express')
const { Pool } = require('pg');
const app = express()
app.use(express.json())
const port = 3000;
//const API_KEY ='alejandro0607#'
const API_KEY = process.env.API_KEY;


const apiKeyValidation = (req, res, next ) => {
    const userApiKey = req.get('x-api-key');
    if  (userApiKey && userApiKey === API_KEY) {
        next();
    } else {
        res.status(401).send('Invalid API Key');
    }
};

app.use(apiKeyValidation)




const pool = new Pool({
    user: 'default',
    host: 'ep-orange-smoke-08960365.us-east-1.postgres.vercel-storage.com',
    database: 'verceldb',
    password: 'bf3BTmnKYd4P',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

app.get('/students/:id', function (req, res) {
    const index = req.params.id
    const listUsersQuery = `SELECT * FROM students where id=${index};`;

    pool.query(listUsersQuery)
        then(data => {
            // console.log ("List students: ", data.rows[index]);
            res.status(201).send(data.rows)
        })
        .catch(err => {
            console.error(err);
        });
    })
        app.delete('/students/:id', (req, res) => {
            const studentId = req.params.id;
            const eliminar = `
                DELETE FROM students  WHERE id = ${studentId}; `;
            pool.query(eliminar)
                .then(() => {
                    res.status(204).send('Archivo eliminado con exito');
                })
                .catch((err) => {
                    res.status(502).send('ah ocurrido un error')
                    console.error(err);
                });
            });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        app.put('/students/:id', (req, res) => {
            const studentId = req.params.id;
            const { name, lastname, notes } = req.body;
        
            const updateStudentQuery = `
                UPDATE students SET name = '${name}', lastname = '${lastname}', notes ='${notes}' WHERE id = ${studentId};
            `;
            
            pool.query(updateStudentQuery)
                .then((data) => {
                    console.log(`Student ${studentId} updated successfully.`);
                    res.send(`Student ${studentId} updated successfully.`);
                })
                .catch((err) => {
                    console.error(err);
                    res.status(400).send('Hubo un error');
                });
        
    });
    ;
app.get('/students', function (req, res) {
    const listUsersQuery = `SELECT * FROM students ;`;

    pool.query(listUsersQuery)
        .then(data => {
            // console.log ("List students: ", data.rows[index]);
            res.status(201).send(data.rows)
        })
        .catch(err => {
            console.error(err);
        });

});
app.put('/students/:id', (req, res) => {
    const studentId = req.params.id;
    const { name, lastname, notes } = req.body;

    const updateStudentQuery = `
        UPDATE students
        SET name = '${name}', lastname = '${lastname}', notes ='${notes}'
        WHERE id = ${studentId};
    `;
    
    pool.query(updateStudentQuery)
        .then((data) => {
            console.log(`Student with ID ${studentId} updated successfully.`);
            res.send(`Student with ID ${studentId} updated successfully.`);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error updating student.');
        });
    });

app.post('/students', function (req, res) {
    const insertUsersQuery = `INSERT INTO students (id, name, lastname, notes) VALUES (${req.body.id},'${req.body.name}',  '${req.body.lastname}',  '${req.body.notes}');`;

    pool.query(insertUsersQuery)
        .then(() => {
            // console.log ("List students: ", data.rows[index]);
            res.status(201).send("registro guardado")
        })
        .catch(err => {
            console.error(err);
        });

})

app.listen(port, () => {
    console.log('the app is running')
});
