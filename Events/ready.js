const Discord = require("discord.js");
const db = require("../database");
const money = require("../models/money");
const guild = require("../models/guild");


module.exports = {
  name: "ready",

  async execute(client) {

    db.authenticate({ logging: false })
      .then(async () => {
        console.log("Connected to Database");
        guild.init(db);
        guild.sync();
        money.init(db);
        money.sync();
      }).catch((err) => console.log(err));

    const salon = client.channels.cache.size
    const user = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)
    const server = client.guilds.cache.size

    let status_liste = [
      `/ | ${server} serveurs`,
      `/ | ${user} users`
    ]

    client.user.setActivity()
    setInterval(() => {
      let st = Math.floor((Math.random() * status_liste.length));
      client.user.setActivity(status_liste[st], { type: 'PLAYING' })
    }, 6000)
  }
}