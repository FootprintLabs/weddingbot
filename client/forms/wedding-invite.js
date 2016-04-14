module.exports = {
  id: 'wedding-invite',
  name: 'Wedding Invite',
  description: [
    'Tell us about you, your other, and what you can about your wedding.',
    'This information will help build all of your bots.'
  ],
  modules: [
    {
      name: 'your',
      type: 'form',
      fields: [
        {
          name: 'yourFirstName',
          label: 'Your First Name',
          required: true,
          type: 'string'
        },
        {
          name: 'yourLastName',
          label: 'Your Last Name',
          required: true,
          type: 'string'
        },
        {
          name: 'yourPhoto',
          label: 'Add a photo of just you',
          type: 'image'
        }
      ],
    },
    {
      name: 'intro',
      type: 'message',
      label: 'The Intro',
      text: 'Hi, this is <first name of bride> and <first name of groom>.\n' +
        'On <date of proposal>, <first name of groom> asked and <first name of bride> said "<response to wedding proposal>."\n' +
        'So, we’re getting married and we’d love for you to be there!',
      fields: [
        {
          name: 'brideFirstName',
          label: 'First name of the bride',
          pattern: 'first name of bride',
          type: 'string',
          value: 'Ciara'
        },
        {
          name: 'groomFirstName',
          label: 'First name of the groom',
          pattern: 'first name of groom',
          type: 'string',
          value: 'Chris'
        },
        {
          name: 'proposalDate',
          label: 'Proposal Date',
          pattern: 'date of proposal',
          type: 'string',
          value: 'June 20, 2016'
        },
        {
          name: 'proposalResponse',
          label: 'Proposal Response',
          pattern: 'response to wedding proposal',
          type: 'string',
          value: 'Yes'
        }
      ]
    },
    {
      name: 'delay1',
      type: 'delay',
      value: 15,
      fields: []
    },
    {
      name: 'redo',
      type: 'message',
      label: 'Introduction the Redo',
      text: 'We’re going to ask you a series of questions next.\n' +
        'To re-type any response, just text message the word “redo”.',
      fields: []
    },
    {
      name: 'delay2',
      type: 'delay',
      value: 5,
      fields: []
    },
    {
      name: 'question1',
      type: 'question',
      label: 'Acquiring the name',
      text: 'First question, what’s your first and your last name?',
      fields: []
    },
    {
      name: 'delay3',
      type: 'delay',
      value: 3,
      fields: []
    },
    {
      name: 'response1',
      type: 'response',
      text: 'Record <USER RESPONSE 1> to <QUESTION 1>',
      fields: []
    },
    {
      name: 'delay4',
      type: 'delay',
      value: 3,
      fields: []
    },
    {
      name: 'message2',
      type: 'message',
      label: 'After USER RESPONSE 1 to MESSAGE 2',
      text: 'Got it!',
      fields: []
    },
    {
      name: 'delay5',
      type: 'delay',
      value: 3,
      fields: []
    },
    {
      name: 'message3',
      type: 'message',
      label: 'Your Story',
      text: 'We met in <date couple met> while Chris was living in East Palo Alto and Ciara in San Francisco.\n' +
        'OkCupid and a night out at The Saloon brought us together."',
      fields: [
        {
          name: 'youMetDate',
          label: 'Date you met',
          pattern: 'date couple met',
          type: 'string',
          value: '23 April, 2019'
        },
      ]
    },
  ]
};
