class GitCommand {
  constructor() {
    this.cooldown = 0;
  }
  handler(message) {
    message.delete(1000);
    message.channel.send(`You can find the most recently updated code at https://github.com/Rynemgar/Gladiator-Bot`)
  }
}

module.exports = new GitCommand();