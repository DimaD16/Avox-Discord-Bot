const { DataTypes, Model } = require('sequelize')

module.exports = class money extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            money: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            bank: {
                type: DataTypes.STRING,
                primaryKey: true
            }
        }, {
            tableName: 'money', timestamps: false,
            sequelize
        });
    };
};