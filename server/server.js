const express = require('express');
const app = express();
const pool = require('./db');

// MIDDLEWARE


app.use(express.json({ extended: true }))

app.post("/catalog", async (req, res) => {
    try {
        const { title, type, description } = req.body
        const newTodo = await pool.query(
            "INSERT INTO catalog (title, type, description) VALUES($1, $2, $3) RETURNING *",
            [title, type, description]);
        res.json(newTodo.rows[0])
    } catch (error) {
        console.log(error)
    }
})

app.post("/project", async (req, res) => {
    try {
        const { id_element, parent } = req.body
        const newTodo = await pool.query(
            "INSERT INTO project (id_element, parent) VALUES($1, $2) RETURNING *",
            [id_element, parent]);
        res.json(newTodo.rows[0])
    } catch (error) {
        console.log(error)
    }
})

app.get("/catalog", async (req, res) => {
    try {
        const items = await pool.query("SELECT * FROM catalog")
        res.json(items.rows)
    } catch (error) {
        console.log(error)
    }
})

app.put("/project", async (req, res) => {

    const { parent, node } = req.body;

    try {
        const items = await pool.query("UPDATE project SET parent = $1 WHERE id = $2", [parent, node])
        res.json(items.rows)
    } catch (error) {
        console.log(error)
    }
})

app.put("/catalog/:id", async (req, res) => {

    const { name, title } = req.body;
    const { id } = req.params;

    try {
        const items = await pool.query("UPDATE project SET name = $1, title = $2 WHERE id = $3", [name, title, id])
        res.json(items.rows)
    } catch (error) {
        console.log(error)
    }
})

app.get("/project", async (req, res) => {
    try {
        const items = await pool.query("SELECT project.id, project.id_element, catalog.title, catalog.type, project.parent FROM project LEFT JOIN catalog ON project.id_element = catalog.id")
        res.json(items.rows)
    } catch (error) {
        console.log(error)
    }
})

app.delete("/catalog", async (req, res) => {

    const { id } = req.body;

    try {
        const items = await pool.query("DELETE FROM catalog WHERE id = $1", [id])
        res.json(items.rows)
    } catch (error) {
        console.log(error)
    }
})

app.delete("/project", async (req, res) => {

    const { id } = req.body;

    try {
        const items = await pool.query("DELETE FROM project WHERE id = $1", [id])
        res.json(items.rows)
    } catch (error) {
        console.log(error)
    }
})


// START
app.listen(5000, () => {
    console.log('server start')
})