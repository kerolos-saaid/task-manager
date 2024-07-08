import { DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';
import Task from './Task.model.js';

const Member = sequelize.define('Member',
    {
        memberId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(25),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, { timestamps: false }
)
Member.hasMany(Task,
    {
        foreignKey: "memberId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
);
Task.belongsTo(Member,
    {
        foreignKey: "memberId"
    }
);

export default Member;

