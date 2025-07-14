const sequelize = require('./config/db');
const User = require('./models/User');
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the ATM Application!' });
});

const startServer = async () => {
    try {
        await sequelize.sync();
        console.log('Database synchronized successfully.');

        try {
            await User.bulkCreate([
                {
                    userName: 'bobo_karamel',
                    tc: '77777777777',
                    password: '1234',
                    balance: 7000.00
                },
                {
                    userName: 'Cloud',
                    tc: '14141414141',
                    password: '2345',
                    balance: 1000.00
                }
            ]);
            console.log('Default users created successfully.');
        } catch (error) {
            console.error('Error creating default users:', error);
        }

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error synchronizing the database:', error);
        process.exit(1);
    }
};

console.log('Starting the application...');

startServer();