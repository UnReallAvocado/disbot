const { Client, GatewayIntentBits, discordSort, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Embed, Collector } = require('discord.js');
const axios = require('axios')

const replace = require('replace-in-file');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageTyping,
	],
});
const fs = require('fs');
const { time, error } = require('console');
var { inviteTracker } = require("discord-inviter"), 
  tracker = new inviteTracker(client);
const database = 'data.txt'

var useridd
var robuxAmount
client.once('ready', async() => {
 console.log('Bot is on')
    

 const guildID = '983343747481874432'
 const guild = client.guilds.cache.get(guildID)
 let commands 
    if (guild) {
        commands = guild.commands

    } else {
        commands = client.application?.commands

    }
 
    commands?.create({
        name: 'withdrawn',
        description: 'Withdrawn robux',

    })
    commands?.create({
        name:'invites',
        description:'Check your invites',
    })
    commands?.create({
        name:'createwallet',
        description:'Create a new wallet',
    })
    commands?.create({
        name: 'balance',
        description: 'Check your balance'
    })
    commands?.create({
        name: 'add',
        description: 'Give bobux',
        options: [
            
        {
            name: 'user',
            description: 'mention a user',
            type: ApplicationCommandOptionType.Mentionable,
            required: true
        },
        {
            name: 'amount',
            description: 'Amount of robux',
            type: ApplicationCommandOptionType.Number,
            require: true,
        }
    ]
         
    
    })
    
})
 //---------------------------------------------------------------// //---------------------------------------------------------------//
 client.on('guildMemberAdd', member => {
    tracker.on("guildMemberAdd", async (member, inviter, invite, error) => {
       
      
    
      
    console.log(member.id)
    const wel1 = {
        "type": "rich",
        "title": `Ro-Sky Balance`,
        "description": 'Welcome to the server' + '<@' + member.user + '>' + `, invited by <@!${inviter.id}>`,
        "color": 0xEB3349,
        "footer": {
            "text": `Made by UnReallAvocado#6209`
        }
        }
        const wel2 = {
            "type": "rich",
            "title": `Ro-Sky Balance`,
            "description": 'Welcome back to the server' + '<@' + member.user + '>' + `, invited by <@!${inviter.id}>`,
            "color": 0xEB3349,
            "footer": {
                "text": `Made by UnReallAvocado#6209`
            }
            }
    fs.readFile(database, function (err, data) {
        if (err) throw err;
        console.log(member.user.id)
        if(data.includes(member.user.id)){
         console.log('User joined before')
         const channel = client.channels.cache.get('1026117819257073774');
         channel.send({
            embeds: [wel2]
        });
        }else{
            console.log('No recorded')
            fs.appendFile(database, member.user.id + ':0' + '\n', (error) => {
                if(error) throw err;
                
            })
            const channel = client.channels.cache.get('1026117819257073774');
            channel.send({
                embeds: [wel1]
            });
            var array = fs.readFileSync('data.txt').toString().split("\n");
                    
                    for(i in array) {
                        if (array[i].includes(inviter.id)){
                            
                            
                            let position = inviter.id.length + 1
                            let robux = array[i].slice(position)
                           
                            console.log(array[i])
                            afterrobux = Number(robux) + 2
                            
                              
                              const replacment = inviter.id.toString() + ':' + afterrobux.toString()
                              console.log(replacment)
                              
                              const options = {
                                files: 'data.txt',
                                from: array[i],
                                to: replacment,
                              };
                              try {
                                const results = replace(options)
                                console.log('Replacement results:', results);
                              }
                              catch (error) {
                                console.error('Error occurred:', error);
                              }
                            
                        

                          
                   
                        }
                       
                    }














                
        }
      });
    
    });
  
    
});

client.on ('interactionCreate', async (interaction) => {
   
    
      

    
   
      
          const { commandName, options} = interaction
                if (commandName === 'createwallet'){
                    userid = interaction.user.id
                    const embed1 = {
                        "type": "rich",
                        "title": `Ro-Sky Balance`,
                        "description": '<@' + userid + '>' + ' Your wallet has been created. Use /balance to check',
                        "color": 0xEB3349,
                        "footer": {
                            "text": `Made by UnReallAvocado#6209`
                        }
                        }
                    const embed2 = {
                            "type": "rich",
                            "title": `Ro-Sky Balance`,
                            "description": '<@' + userid + '>' + ' You already have a wallet. Use /balance to check',
                            "color": 0xFF002F,
                            "footer": {
                                "text": `Made by UnReallAvocado#6209`
                            }
                            }
                    fs.readFile(database, function (err, data) {
                        if (err) throw err;
                        if(data.includes(userid)){
                         
                        
                            interaction.reply({
                            embeds: [embed2]
                        })
                        return;
                        }else{
                            console.log('No recorded')
                           
                            interaction.reply({
                                embeds: [embed1]
                            })
                            
                            fs.appendFile(database, userid + ':0' + '\n', (error) => {
                                if(error) throw err;
                                
                            })
                            return;
                        }
                      });
                }
                if (commandName === 'invites'){
                }
                if (commandName === 'balance'){
                    console.log('getting')
                    let userid = interaction.user.id
                 
                   
              
                            var array = fs.readFileSync('data.txt').toString().split("\n");
                            try{
                                for(i in array) {
                                
                                    console.log(array[i])
                                            if (array[i].includes(userid)){
                                                console.log('line: ' + i)
                                                let position = userid.length + 1
                                                console.log(array[i].slice(position))
                                                const e1 = {
                                                    "type": "rich",
                                                    "title": `Ro-Sky Balance`,
                                                    "description": 'Balance: ' + array[i].slice(position),
                                                    "color": 0xEB3349,
                                                    "footer": {
                                                        "text": `Made by UnReallAvocado#6209`
                                                    }
                                                    }
                                            
                    
                                            
                                                    await interaction.reply({
                                                        embeds: [e1]
                                            
                                        })
                                            
                                            }
                                   
                                }
                            }catch{
                                const e2 = {
                                    "type": "rich",
                                    "title": `Ro-Sky Balance`,
                                    "description": '<@' + userid + '>' + ' Please create a wallet using /createwallet',
                                    "color": 0xFF002F,
                                    "footer": {
                                        "text": `Made by UnReallAvocado#6209`
                                    }
                                    }
                                    await interaction.reply({
                                        embeds: [e2]
                                    })
                            }
                           

        
                }
                if (commandName === 'add'){

                    let user = options.getMentionable('user')
                    let amount = options.getNumber('amount')
                    let userid = user.id
                    let giverid = interaction.user.id

                    var array = fs.readFileSync('data.txt').toString().split("\n");
                    
                    for(i in array) {
                        if (array[i].includes(userid)){
                            
                            
                            let position = userid.length + 1
                            let robux = array[i].slice(position)
                            console.log(amount)
                            console.log(array[i])
                            afterrobux = Number(robux) + amount
                            
                              
                              const replacment = userid.toString() + ':' + afterrobux.toString()
                              console.log(replacment)
                              
                              const options = {
                                files: 'data.txt',
                                from: array[i],
                                to: replacment,
                              };
                              try {
                                const results = await replace(options)
                                console.log('Replacement results:', results);
                              }
                              catch (error) {
                                console.error('Error occurred:', error);
                              }
                            const embed3 = {
                                "type": "rich",
                                "title": `Ro-Sky Balance`,
                                "description": 'Sucessfully sent ' + amount + ` robux to <@` + userid +`>`,
                                "color": 0xEB3349,
                                "footer": {
                                    "text": `Made by UnReallAvocado#6209`
                                }
                                }
                        

                          
                    interaction.reply({
                        embeds: [embed3]
                    })
                   
                        }
                       
                    }














                }
                if(commandName === 'withdrawn'){
                    interaction.reply('Check your DM')
                    useridd = interaction.user.id
                    let dm = interaction.user.send('Please enter the robux amount (**NUMBER ONLY**) you want to withdraw! Minimum is 5 robux! Use *Cancel* to end the action')
                    let amountPM = (await dm).channel.createMessageCollector({
                        max: 1,
                        time: 300 * 1000,
                    })
                    amountPM.on('collect', async (collected) => {
                        console.log(collected.content)
                        console.log(typeof collected.content[1])
                        if (!isNaN(collected.content[0])){
                            robuxAmount = collected.content
                            var array = fs.readFileSync('data.txt').toString().split("\n");
                           
                            try{
                                for(i in array) {
                                    
                                    console.log(array[i])
                                            if (array[i].includes(useridd)){
                                                console.log('line: ' + i)
                                                let position = useridd.length + 1
                                                let balanceremain = array[i].slice(position)
                                                console.log(array[i].slice(position))
                                                if (parseInt(robuxAmount) > parseInt(balanceremain) || 5 > parseInt(robuxAmount)) {
                                                    
                                                    const decline = {
                                                        "type": "rich",
                                                        "title": `Ro-Sky Balance`,
                                                        "description": 'Not enough balance to request payout, please try again',
                                                        "color": 0xEB3349,
                                                        "footer": {
                                                            "text": `Made by UnReallAvocado#6209`
                                                        }
                                                        }
                                                        await interaction.user.send({
                                                            embeds: [decline]
                                                
                                            })
                                                }else{
                                                    afterrobux = Number(balanceremain) - parseInt(robuxAmount)
                            
                              
                              const replacment = useridd.toString() + ':' + afterrobux.toString()
                              console.log(replacment)
                              
                              const options = {
                                files: 'data.txt',
                                from: array[i],
                                to: replacment,
                              };
                              try {
                                const results = await replace(options)
                                console.log('Replacement results:', results);
                              }
                              catch (error) {
                                console.error('Error occurred:', error);
                              }


                            let getLink = interaction.user.send('Please create a gamepass with this price: ' + robuxAmount + ' | Please send a valid gamepass/shirt URL. If any problem contact support for help')
                            let link = (await getLink).channel.awaitMessages({
                                max: 1,
                                time: 100 * 1000,
                            }).then(msg =>{
                                const gamepassLink = msg.first().content
                                console.log(msg.first().content)
                                if (gamepassLink.toLowerCase() === 'cancel'){
                                    interaction.user.send('Canceled action')
                                    return;
                                }

                                const channel = client.channels.cache.get('1027207059701248031');
                                const row = new ActionRowBuilder()
                                        .addComponents(
                                            new ButtonBuilder()
                                                .setURL(gamepassLink)
                                                .setLabel('Gamepass Link')
                                                .setStyle(ButtonStyle.Link),
                                                new ButtonBuilder()
                                                .setStyle(ButtonStyle.Danger)
                                                .setLabel('Reject')
                                                .setCustomId('decbutton'),
                                                new ButtonBuilder()
                                                .setStyle(ButtonStyle.Success)
                                                .setLabel('Paid')
                                                .setCustomId('paidbutton')
                                                
                                        );
                                      
                                                
                                        
                                const e1 = {
                                    "type": "rich",
                                    "title": `Withdraw request || **CHECK CAREFULLY**`,
                                    "description": 'Amount: ' + `**${robuxAmount}**` + ` || Request made by <@${useridd}>` ,
                                    "color": 0xEB3349,
                                    "footer": {
                                        "text": `Made by UnReallAvocado#6209`
                                    }
                                    }
                                    try{
                                channel.send({
                                    components: [row],
                                    embeds: [e1]
                                });
                               
                                    
                                
                            }catch(err){
                                console.log(err)
                                interaction.user.send('Error, please enter valid URL')
                            }   
                            
                        

                            })
                                                }
                                            
                                                
                                            
                                            }
                                   
                                }
                            }catch{
                                console.log(error)
                                const e2 = {
                                    "type": "rich",
                                    "title": `Ro-Sky Balance`,
                                    "description": '<@' + useridd + '>' + ' Please create a wallet using /createwallet',
                                    "color": 0xEB3349,
                                    "footer": {
                                        "text": `Made by UnReallAvocado#6209`
                                    }
                                    }
                                    await interaction.user.send({
                                        embeds: [e2]
                                    })
                            }
                           

                            
//-----------------------------------------------------------------------------------------------------//

                            
                            


                                
                                  
                           
                               
                                
                             
                             


                              //-----------------------------------------------------------------------------------------------------//
                            
                        }else{
                            interaction.user.send('Action canceled. Please use /withdrawn to repeat the action!')
                        }
                      });
                     




                    
                    

                }





                if (interaction.customId === "paidbutton") {
                    console.log('Button clicked')
                    interaction.message.delete();
                    client.users.fetch(useridd).then(dm =>{
                        dm.send('Your payout have been accepted by the mod!')
                    })
                    const e11 = {
                        "type": "rich",
                        "title": `Successfully Paid`,
                        "description": 'Amount: ' + `**${robuxAmount}**` + ` || Paid to <@${useridd}>` ,
                        "color": 0xEB3349,
                        "footer": {
                            "text": `Made by UnReallAvocado#6209`
                        }
                        }
                        const channel = client.channels.cache.get('1027589743183155311');
                        channel.send({
                            embeds: [e11]
                        });




                   }
                   if (interaction.customId === 'decbutton'){
                     console.log('Reject Payout')
                  
                    interaction.message.delete();
                    client.users.fetch(useridd).then(dm =>{
                        dm.send('Your payout have been rejected by the mod!')
                    })
                     var array = fs.readFileSync('data.txt').toString().split("\n");
                   
                    
                     
                     for(i in array) {
                     if (array[i].includes(useridd)){
                         console.log('line: ' + i)
                         let position = useridd.length + 1
                         let balanceremain = array[i].slice(position)
                         afterrobux = Number(balanceremain) + parseInt(robuxAmount)
                            
                         const replacment = useridd.toString() + ':' + afterrobux.toString()
                              console.log(replacment)
                              
                              const options = {
                                files: 'data.txt',
                                from: array[i],
                                to: replacment,
                              };
                              try {
                                const results = await replace(options)
                                console.log('Replacement results:', results);
                              }
                              catch (error) {
                                console.error('Error occurred:', error);
                              }
                   }
                 }
                 };
    })
    
 
   
            

 

  
                                


client.login('MTAyNDI5NDk3MDE0MTcxNjYwMA.GtgV-2.VHBDA2XzU4ddnRnp2m6ZEI1Rma6nfV15g_8vnM')




