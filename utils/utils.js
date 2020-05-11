'use strict'
const YouTubeNotifier = require('youtube-notification');
const needle = require('needle');
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    checkTwitch: async function checkTwitch() {
        client.channels.fetch('664862008251777044').then(channel => {
            needle.get('https://decapi.me/twitch/uptime/herrbergmann', function(error, response) {
                if (response.body.includes('offline')) {
                    return;
                }
                else {
                    throwEmbed(channel, 'https://www.twitch.tv/herrbergmann', 'Herr Bergmann ist live!', 0xecf542, 'Schau jetzt zu!', 'https://static-cdn.jtvnw.net/previews-ttv/live_user_herrbergmann-320x180.jpg')
                }
            });
        });
    },

    checkYoutube: async function checkYoutube() {
        const notifier = new YouTubeNotifier({
            hubCallback: 'https://youtube.com/user/HerrBergmannLP',
            path: '/youtube'
          });
        notifier.setup();
        
        notifier.on('notified', data => {
            client.channels.fetch('664862008251777044').then(channel => {
            throwEmbed(channel, 'https://youtube.com/user/HerrBergmannLP', 'Neues Video von Herr Bergmann!', 0xecf542, data.video.title);
            });
        });
    
        notifier.subscribe('https://youtube.com/user/HerrBergmannLP');
    },

    throwEmbed: async function throwEmbed(channel, link, title, color, description, url) {
        let embed = new Discord.MessageEmbed()
            .setTitle(link)
            .setDescription(title)
            .setThumbnail(url)
            .setColor(color)
            .setTimestamp()
            .addField("Beschreibung: ", description);
    
        channel.send(embed);
    }
};