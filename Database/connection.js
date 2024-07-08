import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    logging: false
});

const connectToDB = async () => {
    try {
        //await sequelize.authenticate();
        await sequelize.sync({alter:true})
        console.log('Connection to database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};  

export { connectToDB, sequelize };