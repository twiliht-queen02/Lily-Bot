module.exports = {
    name: 'kick',
    description: 'Belirtilen kullanıcıyı sunucudan atar.',
    async execute(message, args) {
        if (!message.member.permissions.has('KICK_MEMBERS')) {
            return message.reply('Bu komutu kullanma izniniz yok!');
        }

        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('Lütfen atmak için bir kullanıcı belirtin.');
        }

        const member = message.guild.members.resolve(user);
        if (!member) {
            return message.reply('Bu kullanıcı bulunamadı.');
        }

        try {
            await member.kick();
            message.channel.send(`${user.tag} sunucudan atıldı.`);
        } catch (error) {
            console.error(error);
            message.reply('Kullanıcı atılırken bir hata oluştu.');
        }
    },
};
