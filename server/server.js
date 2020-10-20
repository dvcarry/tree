const express = require('express');
const app = express();
const pool = require('./db');

// MIDDLEWARE


app.use(express.json({ extended: true }))


// CATALOG

app.get("/catalog/:project_id", async (req, res) => {

    const { project_id } = req.params;

    try {
        const items = await pool.query("SELECT * FROM catalog WHERE project_id=$1", [project_id])
        res.json(items.rows)
    } catch (error) {
        console.log(error)
    }
})

app.post("/catalog/:project_id", async (req, res) => {
    try {
        const { title, type, description } = req.body
        const { project_id } = req.params;
        const newTodo = await pool.query(
            "INSERT INTO catalog (title, type, description, project_id) VALUES($1, $2, $3, $4) RETURNING *",
            [title, type, description, project_id]);
        res.json(newTodo.rows[0])
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

app.delete("/catalog", async (req, res) => {

    const { id } = req.body;

    try {
        const items = await pool.query("DELETE FROM catalog WHERE id = $1", [id])
        res.json(items.rows)
    } catch (error) {
        console.log(error)
    }
})


// TREE

app.get("/tree/:project_id", async (req, res) => {

    const { project_id } = req.params

    try {
        const items = await pool.query("SELECT project.id, project.id_element, catalog.title, catalog.type, project.parent FROM project LEFT JOIN catalog ON project.id_element = catalog.id WHERE catalog.project_id = $1", [project_id])
        res.json(items.rows)
    } catch (error) {
        console.log(error)
    }
})

app.post("/tree/", async (req, res) => {
    try {
        const { id_element, parent, project_id } = req.body
        const newTodo = await pool.query(
            "INSERT INTO project (id_element, parent, project_id) VALUES($1, $2, $3) RETURNING *",
            [id_element, parent, project_id]);
        res.json(newTodo.rows[0])
    } catch (error) {
        console.log(error)
    }
})

app.put("/tree/", async (req, res) => {

    const { currentId, newParentId } = req.body;

    try {
        const items = await pool.query("UPDATE project SET parent = $1 WHERE id = $2", [newParentId, currentId])
        res.json(items.rows)
    } catch (error) {
        console.log(error)
    }
})

app.delete("/tree/:id", async (req, res) => {    

    const { id } = req.params;

    try {
        const items = await pool.query("DELETE FROM project WHERE id = $1", [id])
        res.json(items.rows)
    } catch (error) {
        console.log(error)
    }
})


// PROJECTS

app.post("/projects", async (req, res) => {
    try {
        const { name, description } = req.body
        const newTodo = await pool.query(
            "INSERT INTO projects (name, description, user_id) VALUES($1, $2, $3) RETURNING *",
            [name, description, 1]);
        res.json(newTodo.rows[0])
    } catch (error) {
        console.log(error)
    }
})

app.get("/projects", async (req, res) => {
    try {
        const items = await pool.query("SELECT * FROM projects", [])
        res.json(items.rows)
    } catch (error) {
        console.log(error)
    }
})


// START
app.listen(5000, () => {
    console.log('server start')
})