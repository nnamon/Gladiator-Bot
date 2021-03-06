const config = require('../config');
const commands = require('./commands');
const querySql = require('../connection');

module.exports = message => {
  //if (message.author.bot) return;
  const trigger = message.content.split(' ')[ 0 ].slice(1).toLowerCase();
  if (commands[ trigger ]) {
    return commands[ trigger ].handleMessage(message);
  }
  const filter = (reaction, user) => reaction.emoji.name === '💸' && user.id === '413887034864697364';
  if (
    message.content.startsWith(".tip") &&
    message.mentions.users.get('447326000758652929') &&
    message.content.includes("potions")
  ) {
    message.awaitReactions(filter, { time: 1500 })
      .then((collected) => {
        console.log(collected)
        if (collected.array().length === 0) throw new Error('No 💸 reactions :(');
        const args = message.content.split(" ").slice(1);
        const amount = args[ 0 ];
        const potionamt = Math.floor(amount / 150);

        querySql(`
         UPDATE \`GladiatorBot\`.\`Levels\`
         SET \`Potions\` = Potions + ${potionamt}
         WHERE UserID = ${message.author.id}`)
          .then(results => {
            message.channel.send(`${message.author} purchased ${potionamt} potions for ${amount}TRTL`);
            console.log(`${message.author} purchased ${potionamt} potions for ${amount}TRTL`);
          })
          .catch(e => {
            console.error(e);
          });
      })
      .catch(e => {
        console.error(e);
         message.channel.send(`Your purchase was unsuccessful ${message.author}`)
        });
        

  }
};