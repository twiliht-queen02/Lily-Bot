const { Client, Message, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: 'kayıt',
    aliases: ['kayıt'],
    description: "Üye kayıt sistemi.",
    cooldown: 3000,
    userPerms: [],
    botPerms: [],
    run: async (client, message, args) => {
        // Ayarlar ve Roller
        const ayarlar = {
            taglıalım: true,
            isimyas: true,
            minYaş: 16,
            tag: "•",
            tagsiz: "•",
            zorunluTeyit: true,
            type: true
        };

        const roller = {
            boosterRolü: "1279167775085582336",
            vipRolü: "1279167807130208256",
            kurucuRolleri: ["1279167849206478848"],
            üstYönetimRolleri: ["1279167891272749440"],
            şüpheliRolü: "1279167923348027392",
            cezalıRolü: "1279167955423301632",
            yasaklıTagRolü: "1279167987498575872",
            sorunÇözmeciler: ["1279168019573840512"]
        };

        const cevaplar = {
            noyt: "Yetkiniz yok.",
            kendi: "Kendinizi kayıt edemezsiniz!",
            bot: "Botlar kayıt edilemez!",
            dokunulmaz: "Bu kullanıcıya dokunamazsınız!",
            yetkiust: "Bu kişi sizinle aynı veya daha yüksek bir rolde.",
            taglıalım: "Taglı alım aktif, bu kullanıcı taglı değil!",
            yenihesap: "Bu kullanıcı yeni açılmış bir hesaba sahip.",
            cezaliüye: "Bu kullanıcı cezalılardan, kayıt edilemez.",
            yetersizyaş: "Bu kullanıcı için belirtilen yaş yetersiz."
        };

        // Kullanıcıyı belirle
        let keasycim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!keasycim) return message.reply("Kullanıcı bulunamadı.");

        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) 
            return message.reply(cevaplar.noyt).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));

        // Kullanıcı bilgileri
        let isim = args[1]; // Kullanıcı ismi
        let yaş = args[2];  // Kullanıcı yaşı

        if (ayarlar.isimyas && (!isim || !yaş)) 
            return message.reply("İsim ve yaş belirtilmelidir.");

        let setName = ayarlar.isimyas ? `${isim} | ${yaş}` : `${isim}`;

        // Kullanıcı ismi değiştirme
        keasycim.setNickname(`${ayarlar.type ? keasycim.user.globalName.includes(ayarlar.tag) ? ayarlar.tag + " " : (ayarlar.tagsiz ? ayarlar.tagsiz + " " : (ayarlar.tag || "")) : ``}${setName}`).catch(err => message.channel.send({ embeds: [new EmbedBuilder().setDescription(`${keasycim} kişisinin ismi çok uzun olduğu için isim ayarlanmadı.`)]}));

        // Butonlar
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('erkek').setLabel('Erkek').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('kız').setLabel('Kadın').setStyle(ButtonStyle.Danger)
        );
        
        let msg = await message.reply({
            embeds: [
                new EmbedBuilder().setDescription(`${keasycim} kişisinin ismi "${setName}" olarak değiştirildi ve kayıt etmek için aşağıdaki butonları kullanabilirsiniz.`)
            ],
            components: [row]
        });

        // Buton etkileşimleri
        const filter = i => i.user.id === message.author.id;
        const collector = msg.createMessageComponentCollector({ filter, time: 30000 });

        collector.on('collect', async i => {
            if (i.customId === 'erkek') {
                await i.deferUpdate();
                await keasycim.roles.add("1279167670662467585");
                await keasycim.roles.remove("1279175325007482981");
                i.editReply({ embeds: [new EmbedBuilder().setDescription(`${keasycim} başarıyla Erkek olarak kayıt edildi!`)], components: [] });
            } else if (i.customId === 'kız') {
                await i.deferUpdate();
                await keasycim.roles.add("1279167735045161101");
                await keasycim.roles.remove("1279175325007482981");
                i.editReply({ embeds: [new EmbedBuilder().setDescription(`${keasycim} başarıyla Kadın olarak kayıt edildi!`)], components: [] });
            }
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                msg.edit({ embeds: [new EmbedBuilder().setDescription(`Zaman aşımına uğradı, ${keasycim} için kayıt işlemi iptal edildi.`)], components: [] });
            }
        });
    }
};
