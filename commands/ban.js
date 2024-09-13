module.exports = {
    name: 'ban',
    description: 'Belirtilen kullanıcıyı yasaklar.',
    async execute(message, args) {
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            return message.reply('Bu komutu kullanma izniniz yok!');
        }

        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('Lütfen yasaklamak için bir kullanıcı belirtin.');
        }

        const member = message.guild.members.resolve(user);
        if (!member) {
            return message.reply('Bu kullanıcı bulunamadı.');
        }

        try {
            await member.ban();
            message.channel.send(`${user.tag} yasaklandı.`);
        } catch (error) {
            console.error(error);
            message.reply('Kullanıcı yasaklanırken bir hata oluştu.');
        }
    },
};
