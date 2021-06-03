const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
const config = require("../config.json");
exports.run = async(client, message, args) => {
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setFooter(config.footer)
    if( !message.member.hasPermission(8)) return;
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!uye) return message.channel.send(embed.setDescription(`${message.author}, Bir kullanıcı etiketlemelisin.`)).then(m => m.delete({ timeout: 5000 }))
    if (uye) {
        db.delete(`teyit.${uye.id}.toplam`)
        db.delete(`teyit.${uye.id}.kadın`)
        db.delete(`teyit.${uye.id}.erkek`)
        message.channel.send(embed.setDescription(`${uye} Üyesinin Kayıt Verileri Sıfırlandı`))
    }
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    name: 'teyit-sıfırla',
    permLevel: 0
};
