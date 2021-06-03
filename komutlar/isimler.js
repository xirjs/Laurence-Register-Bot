const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
const config = require("../config.json");
exports.run = async(client, message, args) => {
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setFooter(config.footer)
    if(!message.member.roles.cache.has(config.kayıtcıRolü) && !message.member.hasPermission(8)) return;
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let x = await db.fetch(`isimler.${uye.id}`)
    if (!x || !db.fetch(`isimler.${uye.id}`)) return message.channel.send(embed.setDescription(`Bu Kullanıcının geçmiş isimleri bulunamadı.`))
    let isimler = x.map((laurence, index) => `\`${laurence.isim}\` (<@&${laurence.rol}>)`).splice(0, 15)
    if (!uye) return message.channel.send(embed.setDescription(`Bir Kullanıcı Belirtmelisin`))
    message.channel.send(embed.setDescription(`
 ${uye}, Kullanıcısının toplam **${isimler.length}** kayıtı bulundu. 

${isimler.join("\n")}`))

}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    name: 'isimler',
    permLevel: 0
};
