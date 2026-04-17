const { DataTypes, Model } = require("sequelize");

module.exports = class guild extends Model {
  static init(sequelize) {
    return super.init(
      {
        guild_id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        guild_prefix: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        welcome_channel: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        welcome_type: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        welcome_message: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        welcome_active: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        autorole_role: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        autorole_active: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        catptcha_channel: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        captcha_active: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        bump_description: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        bump_color: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        raidmode: {
          type: DataTypes.BOOLEAN,
          primaryKey: true,
        },
        welcome_recent: {
          type: DataTypes.BOOLEAN,
          primaryKey: true,
        },
        welcome_character: {
          type: DataTypes.BOOLEAN,
          primaryKey: true,
        },
        },
      {
        tableName: "guild",
        timestamps: false,
        sequelize,
      }
    );
  }
};
