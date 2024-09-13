// commands/suggest.js
const songSuggestions = [
    { title: "Blinding Lights", artist: "The Weeknd" },
    { title: "Levitating", artist: "Dua Lipa" },
    { title: "Shape of You", artist: "Ed Sheeran" },
    { title: "Bad Guy", artist: "Billie Eilish" },
    { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars" },
    // Listeye daha fazla şarkı ekleyebilirsiniz
];

module.exports = {
    name: 's',
    description: 'Size bir şarkı önerelim!',
    execute(message) {
        // Listeye rastgele bir şarkı seçin
        const randomIndex = Math.floor(Math.random() * songSuggestions.length);
        const song = songSuggestions[randomIndex];

        // Öneriyi kullanıcıya gönderin
        return message.channel.send(`Önerilen şarkı: **${song.title}** by **${song.artist}**`);
    }
};
