const Discord = require('discord.js');
const client = new Discord.Client();
const { config } = require("dotenv");
const version = '1.0.0';
const prefix = 'kalle!';
const gifs = require('./extern/gifs');
const utils = require('./utils/utils')

config({
    path: __dirname + "/.env"
});

client.on('ready', (reaction, user) => {
	console.log('Kalle läuft unter der Version: ' + version);
    setInterval(utils.checkTwitch, 6000);
    utils.checkYoutube();
});

client.on('guildMemberAdd', async member => {
    client.channels.fetch('556246823459749898').then(channel => {
        channel.send('Hej und Willkommen in der From The Future Redaktion, ' + member.displayName + '!');
    })
	setTimeout(() => {
		let role = (msg.member.guild.roles.cache.find(role => role.name === 'redakteur/in'));
		member.roles.add(role);
	}, 600000);
});

client.on('message', async msg => {
	switch (msg.content) {
		case prefix + 'version':
			utils.throwEmbed(msg.channel, '', 'Version', 0xecf542, version);
			break;

        case prefix + 'gif':
			var gifI = gifs[Math.floor(Math.random()*gifs.length)]
			msg.channel.send(gifI);
            break;
	}
});

client.login(process.env.TOKEN);
