// const {SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle} = require('discord.js');

// module.exports = {
//     data: new SlashCommandBuilder()
//     .setName('modal')
//     .setDescription('Sends a modal'),
    
//         async execute (interaction) {
//         const modal = new ModalBuilder({
//             customId: 'myModal',
//             title: 'My modal',
//         });

//         const favoriteColorInput = new TextInputBuilder({
//             customId: 'favoriteColorInput',
//             label: 'What is your favorite color?',
//             style: TextInputStyle.Short,
//             required: true,
//         });
//         const hobbiesInput = new TextInputBuilder({
//             customId: 'hobbiesInput',
//             label: 'Whats some of your fav hobbies?',
//             style: TextInputStyle.Paragraph,
//         });

//         const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
//         const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput); 

//         // Adds the action rows to the modal

//         modal.addComponents(firstActionRow, secondActionRow);
        
//         await interaction.showModal(modal);

//         //Wait for modal to be submitted

//         const filter = (interaction) => interaction.customId === 'myModal';

//         interaction
//         .awaitModalSubmit({ filter, time: 30_000 })
//         .then((modalInteraction) => {
//             if (!modalInteraction) {
//                 return console.log('Interaction not found.');
//             }
    
//             const favoriteColorValue = modalInteraction.fields.getTextInputValue('favoriteColorInput');
//             const hobbiesValue = modalInteraction.fields.getTextInputValue('hobbiesInput');
            

//             interaction.client.channels.fetch('1189856644805443635')
//             .then(channel => {
//                 // Send the response to the channel
//                 channel.send(`Your fav color: ${favoriteColorValue}\nYour hobbies: ${hobbiesValue}`)
//                     .catch((err) => {
//                         console.log('Error sending message:', err);
//                     });
//             })
//             .catch((err) => {
//                 console.log('Error fetching channel:', err);
//             });
//     })
//     .catch((err) => {
//         console.log('Error waiting for modal submit:', err);
//             });
//         }
    
//     }

    


const { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('modal')
        .setDescription('Sends a modal'),

    async execute(interaction) {
        const modal = new ModalBuilder({
            customId: 'myModal',
            title: 'My modal',
        });

        const favoriteColorInput = new TextInputBuilder({
            customId: 'favoriteColorInput',
            label: 'What is your favorite color?',
            style: TextInputStyle.Short,
            required: true,
        });
        const hobbiesInput = new TextInputBuilder({
            customId: 'hobbiesInput',
            label: 'Whats some of your fav hobbies?',
            style: TextInputStyle.Paragraph,
        });

        const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
        const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

        // Adds the action rows to the modal

        modal.addComponents(firstActionRow, secondActionRow);

        await interaction.showModal(modal);

        // Wait for modal to be submitted

        const filter = (interaction) => interaction.customId === 'myModal';

        interaction
            .awaitModalSubmit({ filter, time: 30_000 })
            .then((modalInteraction) => {
                if (interaction.deferred) return;

                const favoriteColorValue = modalInteraction.fields.getTextInputValue('favoriteColorInput');
                const hobbiesValue = modalInteraction.fields.getTextInputValue('hobbiesInput');

                modalInteraction.deferUpdate()
                    .then(() => {
                        const channel = interaction.client.channels.cache.get('1189856644805443635');

                        if (!channel) {
                            console.log('Channel not found.');
                            return;
                        }

                        channel.send(`Your fav color: ${favoriteColorValue}\nYour hobbies: ${hobbiesValue}`)
                            .catch((err) => {
                                console.error('Error sending message:', err);
                            });
                    })
                    .catch((err) => {
                        console.error('Error deferring update:', err);
                    });
            })
            .catch((err) => {
                console.error('Error waiting for modal submit:', err);
            });
    },
};