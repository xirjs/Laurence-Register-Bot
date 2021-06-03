const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
const config = require("../config.json");
exports.run = async(client, message, args) => {
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setFooter(config.footer)
    if(!message.member.roles.cache.has(config.kayıtcıRolü) && !message.member.hasPermission(8)) return;
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!uye) return message.channel.send(embed.setDescription(`${message.author}, Bir Kullanıcı Etiketlemelisin.`)).then(m => m.delete({ timeout: 7000 }))
    args = args.filter(a => a !== "" && a !== " ").splice(1)
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase() + arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || undefined;
    if (!isim || !yaş) return message.channel.send(embed.setDescription(`${message.author}, Bir İsim Belirtmelisin.`)).then(m => m.delete({ timeout: 7000 }))
    let yazilacakisim = `${uye.user.username.includes(config.tag) ? config.tag : (config.unTag ? config.unTag : (config.unTag || ""))} ${isim} | ${yaş}`
    if (uye.id === client.user.id) return message.channel.send(embed.setDescription(`Beni Kayıt Edemezsin!`)).then(m => m.delete({ timeout: 7000 }))
    if (uye.id === message.author.id) return message.channel.send(embed.setDescription(`Kendini Kayıt Edemezsin!`)).then(m => m.delete({ timeout: 7000 }))
    message.channel.send(embed.setDescription(`
  ${uye} Adlı Kullanıcının İsmi \`${yazilacakisim}\` Olarak Güncellendi.`))
    uye.setNickname(yazilacakisim)
    message.react(config.yes)


}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['nick','i'],
    name: 'isim',
    permLevel: 0
};