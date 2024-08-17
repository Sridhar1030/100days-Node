const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/populate_example', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Database connected'))
.catch(err => console.error('Database connection error:', err));
