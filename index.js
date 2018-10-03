const postDb = require('./data/helpers/postDb.js');
const userDb = require('./data/helpers/userDb.js');
const tagDb = require('./data/helpers/tagDb.js');
const express = require('express');
const server = express();
server.use(express.json());
// const cors = require('cors');
// server.use(cors());

const port = 8000;
server.listen(port, ()=>{
    console.log(`API running on port ${port}`);
});

server.get('/', (req, res)=>{
    res.status(200).json('root sucessfully got');
});

server.get('/api/:dbtype', (req, res)=>{
    const {dbtype} = req.params;
    console.log(dbtype);
    switch (dbtype){
        case 'posts':
            postDb.get()
                .then(posts =>{
                    res.status(200).json(posts);
                })
                .catch(err => console.error(err));
            break;
        case 'users':
            userDb.get()
                .then(users =>{
                    res.status(200).json(users);
                })
                .catch(err => console.error(err));
            break;
        case 'tags':
            tagDb.get()
                .then(tags =>{
                    res.status(200).json(tags);
                })
                .catch(err => console.error(err));
            break;
        default:
            res.status(400).send(`URI ${dbtype} not found`);
    }
});

server.get('/api/:dbtype/:id', (req, res)=>{
    const {dbtype, id} = req.params;
    // res.status(200).send(`dbtype:${dbtype}\nid:${id}`);
    switch (dbtype){
        case 'posts':
            postDb.get(id)
                .then(post =>{
                    res.status(200).json(post);
                })
                .catch(err => console.error(err));
            break;
        case 'users':
            userDb.get(id)
                .then(user =>{
                    res.status(200).json(user);
                })
                .catch(err => console.error(err));
            break;
        case 'tags':
            tagDb.get(id)
                .then(tag =>{
                    res.status(200).json(tag);
                })
                .catch(err => console.error(err));
            break;
        default:
            res.status(400).send(`URI ${dbtype} not found`);
    }
});

server.post('/api/:dbtype', (req, res)=>{
    const {dbtype} = req.params;
    const item = req.body;
    switch (dbtype){
        case 'posts':
            postDb.insert(item)
                .then(post =>{
                    res.status(200).json(post);
                })
                .catch(err => console.error(err));
            break;
        case 'users':
            userDb.insert(item)
                .then(user =>{
                    res.status(200).json(user);
                })
                .catch(err => console.error(err));
            break;
        case 'tags':
            tagDb.insert(item)
                .then(tag =>{
                    res.status(200).json(tag);
                })
                .catch(err => console.error(err));
            break;
        default:
            res.status(400).send(`URI ${dbtype} not found`);
    }
})