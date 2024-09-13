module.exports = {
    name: 'mute',
    description: 'Belirtilen kullanıcıyı susturur.',
    async execute(message, args) {
        if (!message.member.permissions.has('MUTE_MEMBERS')) {
            return message.reply('Bu komutu kullanma izniniz yok!');
        }

        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('Lütfen susturmak için bir kullanıcı belirtin.');
        }

        const member = message.guild.members.resolve(user);
        if (!member) {
            return message.reply('Bu kullanıcı bulunamadı.');
        }

        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (!muteRole) {
            return message.reply('`Muted` rolü bulunamadı. Lütfen bu rolü oluşturun.');
        }

        try {
            await member.roles.add(muteRole);
            message.channel.send(`${user.tag} susturuldu.`);
        } catch (error) {
            console.error(error);
            message.reply('Kullanıcı susturulurken bir hata oluştu.');
        }
    },
};
