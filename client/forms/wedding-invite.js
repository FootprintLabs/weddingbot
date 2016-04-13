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
    }
  ]
};
