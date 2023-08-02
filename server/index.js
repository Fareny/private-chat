const mongoose = require('mongoose');
const express = require('express');
const cors = require('./middleware/cors.middleware');
const authRouter = require('./router/auth.routes');

const app = express();
const PORT = 8000;

app.use(cors)
app.use(express.json());
app.use('/api/auth', authRouter)

const start = async () => {
    try {

        await mongoose.connect('mongodb+srv://pdfareny:OyB7p5msBfa9Zxax@cloud.fk0fpdu.mongodb.net/cloud?retryWrites=true&w=majority');

        app.listen(PORT, () => {
            console.log('Server started on port ' + PORT);
        })

    } catch (error) {
        console.log(error);
    }
}

start();