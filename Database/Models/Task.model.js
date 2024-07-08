// Import the built-in data types
import { DataTypes} from 'sequelize'; 
import { sequelize } from '../connection.js';
const Task = sequelize.define('task', {
    taskId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(1500),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
        allowNull: false,
        defaultValue: 'pending'
    },
    startDate:{
        type: DataTypes.DATE,
        allowNull:true
    },
    endDate:{
        type: DataTypes.DATE,
        allowNull:true
    } 
}, { timestamps: false });

export default Task;
