const fetch = require('node-fetch');

async function getTwitchTitle(username) {
    try {
        const response = await fetch(`https://decapi.me/twitch/title/${username}`);
        const data = await response.text();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function getTwitchGame(username) {
    try {
        const response = await fetch(`https://decapi.me/twitch/game/${username}`);
        const data = await response.text();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function getTwitchAvatar(username) {
    try {
        const response = await fetch(`https://decapi.me/twitch/avatar/${username}`);
        const data = await response.text();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function getTwitchViewers(username) {
    try {
        const response = await fetch(`https://decapi.me/twitch/viewercount/${username}`);
        const data = await response.text();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function getTwitchUptime(username) {
    try {
        const response = await fetch(`https://decapi.me/twitch/uptime/${username}`);
        const data = await response.text();
        return data;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getTwitchTitle,
    getTwitchGame,
    getTwitchAvatar,
    getTwitchViewers,
    getTwitchUptime
}
