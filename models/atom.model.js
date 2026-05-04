import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class Atom extends Model { }

Atom.init(
    {
        Atom_Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        User_Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
        },
        Atom_proton: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
        },
        Atom_neutron: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
        },
        Atom_electron: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
        },
        Atom_name: {
            type: DataTypes.STRING(80),
            allowNull: true,
            unique: false,
        }
    },
    {
        sequelize,
        modelName: 'Atom',
        tableName: 'atoms',
        timestamps: false,
    }
);