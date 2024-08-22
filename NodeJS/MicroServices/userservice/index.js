import express from 'express';

const app = express();
app.use(express.json());

const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
];

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.json(user);
});

app.listen(3001, () => {
    console.log('User Service running on port 3001');
});
