module.exports = {
  name: 'About Your Wedding',
  description: [
    'Tell us about you, your other, and what you can about your wedding.',
    'This information will help build all of your bots.'
  ],
  modules: [
    {
      name: 'your',
      fields: [
        {
          name: 'firstName',
          label: 'Your First Name',
          required: true,
          type: 'string'
        },
        {
          name: 'middleNameToggle',
          label: 'Your Middle Name',
          type: 'toggle',
          toggle: 'your.middleName'
        },
        {
          name: 'middleName',
          hidden: true,
          label: false,
          type: 'string'
        },
        {
          name: 'lastName',
          label: 'Your Last Name',
          required: true,
          type: 'string'
        },
        {
          name: 'gender',
          label: 'Your Gender',
          type: 'radio',
          values: [
            { label: 'Male', value: "male" },
            { label: 'Female', value: "female" },
            { label: 'Other', value: "other", showInput: true },
          ]
        },
        {
          name: 'photo',
          label: 'Add a photo of just you',
          type: 'image'
        }
      ],
    },
    {
      name: 'their',
      fields: [
        {
          name: 'firstName',
          label: 'Their First Name',
          required: true,
          type: 'string'
        },
        {
          name: 'middleNameToggle',
          label: 'Their Middle Name',
          type: 'toggle',
          toggle: 'their.middleName'
        },
        {
          name: 'middleName',
          hidden: true,
          label: false,
          type: 'string'
        },
        {
          name: 'lastName',
          label: 'Their Last Name',
          required: true,
          type: 'string'
        },
        {
          name: 'gender',
          label: 'Their Gender',
          type: 'radio',
          values: [
            { label: 'Male', value: "male" },
            { label: 'Female', value: "female" },
            { label: 'Other', value: "other", showInput: true },
          ]
        },
        {
          name: 'photo',
          label: 'Add a photo of just them',
          type: 'image'
        }
      ],
    },
    {
      name: 'yourMarriage',
      fields: [
        {
          name: 'firstName',
          label: 'Your First Name after Marriage',
          type: 'string',
          sideChecks: [{
            action: 'same',
            label: 'Same as before',
            target: 'your.firstName'
          }]
        },
        {
          name: 'lastName',
          label: 'Your Last Name after Marriage',
          type: 'string',
          sideChecks: [{
            action: 'same',
            label: 'Same as before',
            target: 'your.lastName'
          }]
        }
      ]
    },
    {
      name: 'theirMarriage',
      fields: [
        {
          name: 'firstName',
          label: 'Their First Name after Marriage',
          type: 'string',
          sideChecks: [{
            action: 'same',
            label: 'Same as before',
            target: 'their.firstName'
          }]
        },
        {
          name: 'theirLastNameMarriage',
          label: 'Their Last Name after Marriage',
          type: 'string',
          sideChecks: [{
            action: 'same',
            label: 'Same as before',
            target: 'their.lastName'
          }]
        }
      ]
    },
    {
      name: 'proposal',
      fields: [
        {
          name: 'location',
          label: 'Location of your proposal',
          type: 'string'
        },
        {
          name: 'date',
          label: 'Date of your wedding proposal',
          type: 'daterange'
        },
        {
          name: 'photo',
          label: 'Add a photo from your proposal',
          type: 'image'
        }
      ]
    },
    {
      name: 'wedding',
      fields: [
        {
          name: 'date',
          label: 'Date of your Wedding',
          type: 'date',
          sideChecks: [{
            action: 'dont-know',
            label: 'Don\'t Know Yet'
          }]
        },
        {
          name: 'time',
          label: 'Time of your Wedding',
          type: 'time',
          sideChecks: [{
            action: 'dont-know',
            label: 'Don\'t Know Yet'
          }]
        },
        {
          name: 'name',
          label: 'Name of your Wedding Venue',
          type: 'string',
          disableCheck: 'There won\'t be a wedding venue',
          sideChecks: [{
            action: 'dont-know',
            label: 'Don\'t Know Yet'
          }]
        },
        {
          name: 'address',
          label: 'Address of your Wedding Venue',
          type: 'string',
          sideChecks: [{
            action: 'dont-know',
            label: 'Don\'t Know Yet'
          }]
        },
        {
          name: 'photo',
          label: 'Add a photo of the wedding venue',
          type: 'image'
        }
      ]
    },
    {
      name: 'reception',
      fields: [
        {
          name: 'name',
          label: 'Name of your Reception Venue',
          type: 'string',
          disableCheck: 'There won\'t be a wedding venue',
          sideChecks: [
            {
              action: 'none',
              label: 'None'
            },
            {
              action: 'same',
              label: 'Same as Wedding Venue',
              target: 'wedding.name'
            },
          ]
        },
        {
          name: 'address',
          label: 'Address of your Reception Venue',
          type: 'string',
          sideChecks: [{
            action: 'dont-know',
            label: 'Don\'t Know Yet'
          }]
        },
        {
          name: 'photo',
          label: 'Add a photo of the reception venue',
          type: 'image'
        }
      ]
    },
    {
      name: 'honeymoon',
      fields: [
        {
          name: 'location',
          label: 'Location of your Honeymoon',
          type: 'string',
          disableCheck: 'There won\'t be a honeymoon',
          sideChecks: [{
            action: 'dont-know',
            label: 'Don\'t Know Yet'
          }]
        },
        {
          name: 'date',
          label: 'Date of your Honeymoon',
          type: 'daterange',
          sideChecks: [{
            action: 'dont-know',
            label: 'Don\'t Know Yet'
          }]
        },
        {
          name: 'photo',
          label: 'Add a photo of your honeymoon location',
          type: 'image'
        }
      ]
    },
    {
      name: 'bride',
      fields: [
        {
          name: 'motherFirstName',
          label: 'First Name of the Mother of the Bride',
          type: 'string'
        },
        {
          name: 'motherMiddleNameToggle',
          label: 'Add Middle Name',
          type: 'toggle',
          toggle: 'bride.motherMiddleName'
        },
        {
          name: 'motherMiddleName',
          hidden: true,
          label: false,
          type: 'string'
        },
        {
          name: 'motherlastName',
          label: 'Last Name of the Mother of the Bride',
          type: 'string'
        },
        {
          name: 'motherPhoto',
          label: 'Add a photo of just them',
          type: 'image'
        },
        {
          name: 'fatherFirstName',
          label: 'First Name of the Father of the Bride',
          type: 'string'
        },
        {
          name: 'fatherMiddleNameToggle',
          label: 'Add Middle Name',
          type: 'toggle',
          toggle: 'bride.fatherMiddleName'
        },
        {
          name: 'fatherMiddleName',
          hidden: true,
          label: false,
          type: 'string'
        },
        {
          name: 'fatherLastName',
          label: 'Last Name of the Father of the Bride',
          type: 'string'
        },
        {
          name: 'fatherPhoto',
          label: 'Add a photo of just them',
          type: 'image'
        },
        {
          name: 'motherFatherPhoto',
          label: 'Add a photo of the mother and father togehter',
          type: 'image'
        },
        {
          name: 'familyPhoto',
          label: 'Add a photo of you, your fiancée, and them all togehter',
          type: 'image'
        },
        {
          name: 'addAnotherMother',
          label: 'Add another mother of the bride',
          icon: 'add circle',
          type: 'link',
          action: 'show',
          target: 'brideAnotherMother'
        },
        {
          name: 'addAnotherFather',
          label: 'Add another father of the bride',
          icon: 'add circle',
          type: 'link',
          action: 'show',
          target: 'brideAnotherFather'
        }
      ]
    },
    {
      name: 'brideAnotherMother',
      hidden: true,
      fields: [
        {
          name: 'firstName',
          label: 'First Name of the Mother of the Bride',
          type: 'string'
        },
        {
          name: 'middleNameToggle',
          label: 'Add Middle Name',
          type: 'toggle',
          toggle: 'brideAnotherMother.middleName'
        },
        {
          name: 'middleName',
          hidden: true,
          label: false,
          type: 'string'
        },
        {
          name: 'lastName',
          label: 'Last Name of the Mother of the Bride',
          type: 'string'
        },
        {
          name: 'photo',
          label: 'Add a photo of just them',
          type: 'image'
        }
      ]
    },
    {
      name: 'brideAnotherFather',
      hidden: true,
      fields: [
        {
          name: 'firstName',
          label: 'First Name of the Father of the Bride',
          type: 'string'
        },
        {
          name: 'middleNameToggle',
          label: 'Add Middle Name',
          type: 'toggle',
          toggle: 'brideAnotherFather.middleName'
        },
        {
          name: 'middleName',
          hidden: true,
          label: false,
          type: 'string'
        },
        {
          name: 'lastName',
          label: 'Last Name of the Father of the Bride',
          type: 'string'
        },
        {
          name: 'photo',
          label: 'Add a photo of just them',
          type: 'image'
        }
      ]
    },
    {
      name: 'groom',
      fields: [
        {
          name: 'motherFirstName',
          label: 'First Name of the Mother of the Groom',
          type: 'string'
        },
        {
          name: 'motherMiddleNameToggle',
          label: 'Add Middle Name',
          type: 'toggle',
          toggle: 'groom.motherMiddleName'
        },
        {
          name: 'motherMiddleName',
          hidden: true,
          label: false,
          type: 'string'
        },
        {
          name: 'motherLastName',
          label: 'Last Name of the Mother of the Groom',
          type: 'string'
        },
        {
          name: 'motherPhoto',
          label: 'Add a photo of just them',
          type: 'image'
        },
        {
          name: 'fatherFirstName',
          label: 'First Name of the Father of the Groom',
          type: 'string'
        },
        {
          name: 'fatherMiddleNameToggle',
          label: 'Add Middle Name',
          type: 'toggle',
          toggle: 'groom.fatherMiddleName'
        },
        {
          name: 'fatherMiddleName',
          hidden: true,
          label: false,
          type: 'string'
        },
        {
          name: 'fatherLastName',
          label: 'Last Name of the Father of the Groom',
          type: 'string'
        },
        {
          name: 'fatherPhoto',
          label: 'Add a photo of just them',
          type: 'image'
        },
        {
          name: 'motherFatherPhoto',
          label: 'Add a photo of the mother and father togehter',
          type: 'image'
        },
        {
          name: 'familyPhoto',
          label: 'Add a photo of you, your fiancée, and them all togehter',
          type: 'image'
        },
        {
          name: 'addAnotherMother',
          label: 'Add another mother of the groom',
          icon: 'add circle',
          type: 'link',
          action: 'show',
          target: 'groomAnotherMother'
        },
        {
          name: 'addAnotherFather',
          label: 'Add another father of the groom',
          icon: 'add circle',
          type: 'link',
          action: 'show',
          target: 'groomAnotherFather'
        }
      ]
    },
    {
      name: 'groomAnotherMother',
      hidden: true,
      fields: [
        {
          name: 'firstName',
          label: 'First Name of the Mother of the Groom',
          type: 'string'
        },
        {
          name: 'middleName',
          label: false,
          type: 'string',
          enableCheck: 'Add Middle Name'
        },
        {
          name: 'middleNameToggle',
          label: 'Add Middle Name',
          type: 'toggle',
          toggle: 'groomAnotherMother.middleName'
        },
        {
          name: 'middleName',
          hidden: true,
          label: false,
          type: 'string'
        },
        {
          name: 'lastName',
          label: 'Last Name of the Mother of the Groom',
          type: 'string'
        },
        {
          name: 'photo',
          label: 'Add a photo of just them',
          type: 'image'
        }
      ]
    },
    {
      name: 'groomAnotherFather',
      hidden: true,
      fields: [
        {
          name: 'firstName',
          label: 'First Name of the Father of the Groom',
          type: 'string'
        },
        {
          name: 'middleNameToggle',
          label: 'Add Middle Name',
          type: 'toggle',
          toggle: 'groomAnotherFather.middleName'
        },
        {
          name: 'middleName',
          hidden: true,
          label: false,
          type: 'string'
        },
        {
          name: 'lastName',
          label: 'Last Name of the Father of the Groom',
          type: 'string'
        },
        {
          name: 'photo',
          label: 'Add a photo of just them',
          type: 'image'
        }
      ]
    },
    {
      name: 'maidOfHonor',
      fields: [
        {
          name: 'firstName',
          label: 'First Name of the Maid of Honor',
          type: 'string'
        },
        {
          name: 'middleNameToggle',
          label: 'Add Middle Name',
          type: 'toggle',
          toggle: 'maidOfHonor.middleName'
        },
        {
          name: 'middleName',
          hidden: true,
          label: false,
          type: 'string'
        },
        {
          name: 'lastName',
          label: 'Last Name of the Maid of Honor',
          type: 'string'
        },
        {
          name: 'photo',
          label: 'Add a photo of just them',
          type: 'image'
        },
        {
          name: 'photoWithYou',
          label: 'Add a photo of two of you togehter',
          type: 'image'
        },
        {
          name: 'addAnother',
          label: 'Add another Maid of Honor',
          icon: 'add circle',
          type: 'link',
          action: 'replicate'
        }
      ]
    },
    {
      name: 'bestMan',
      fields: [
        {
          name: 'firstName',
          label: 'First Name of the Best Man',
          type: 'string'
        },
        {
          name: 'middleNameToggle',
          label: 'Add Middle Name',
          type: 'toggle',
          toggle: 'bestMan.middleName'
        },
        {
          name: 'middleName',
          hidden: true,
          label: false,
          type: 'string'
        },
        {
          name: 'lastName',
          label: 'Last Name of the Best Man',
          type: 'string'
        },
        {
          name: 'photo',
          label: 'Add a photo of just them',
          type: 'image'
        },
        {
          name: 'photoWithYou',
          label: 'Add a photo of two of you togehter',
          type: 'image'
        },
        {
          name: 'addAnother',
          label: 'Add another Best Man',
          icon: 'add circle',
          type: 'link',
          action: 'replicate'
        }
      ]
    },
    {
      name: 'hasBridesmaid',
      fields: [
        {
          name: 'option',
          label: 'Will you have Bridesmaids?',
          type: 'boolean',
          toggle: 'bridesmaid',
        }
      ]
    },
    {
      name: 'bridesmaid',
      hidden: true,
      fields: [
        {
          name: 'firstName',
          label: 'First Name of the Bridesmaid',
          type: 'string'
        },
        {
          name: 'middleNameToggle',
          label: 'Add Middle Name',
          type: 'toggle',
          toggle: 'bridesmaid.middleName'
        },
        {
          name: 'middleName',
          hidden: true,
          label: false,
          type: 'string'
        },
        {
          name: 'lastName',
          label: 'Last Name of the Bridesmaid',
          type: 'string'
        },
        {
          name: 'photo',
          label: 'Add a photo of just them',
          type: 'image'
        },
        {
          name: 'photoWithYou',
          label: 'Add a photo of two of you togehter',
          type: 'image'
        },
        {
          name: 'addAnother',
          label: 'Add another Bridesmaid',
          icon: 'add circle',
          type: 'link',
          action: 'replicate'
        }
      ]
    },
    {
      name: 'hasGroomsmen',
      fields: [
        {
          name: 'option',
          label: 'Will you have Groomsmen?',
          type: 'boolean',
          toggle: 'groomsmen',
        }
      ]
    },
    {
      name: 'groomsmen',
      hidden: true,
      fields: [
        {
          name: 'firstName',
          label: 'First Name of the Groomsmen',
          type: 'string'
        },
        {
          name: 'middleNameToggle',
          label: 'Add Middle Name',
          type: 'toggle',
          toggle: 'groomsmen.middleName'
        },
        {
          name: 'middleName',
          hidden: true,
          label: false,
          type: 'string'
        },
        {
          name: 'lastName',
          label: 'Last Name of the Groomsmen',
          type: 'string'
        },
        {
          name: 'photo',
          label: 'Add a photo of just them',
          type: 'image'
        },
        {
          name: 'photoWithYou',
          label: 'Add a photo of two of you togehter',
          type: 'image'
        },
        {
          name: 'addAnother',
          label: 'Add another Groomsmen',
          icon: 'add circle',
          type: 'link',
          action: 'replicate'
        }
      ]
    },
    {
      name: 'hasFlowergirl',
      fields: [
        {
          name: 'option',
          label: 'Will you have Flower Girl?',
          type: 'boolean',
          toggle: 'flowergirl',
        }
      ]
    },
    {
      name: 'flowergirl',
      hidden: true,
      fields: [
        {
          name: 'firstName',
          label: 'First Name of the Flower Girl',
          type: 'string'
        },
        {
          name: 'middleNameToggle',
          label: 'Add Middle Name',
          type: 'toggle',
          toggle: 'flowergirl.middleName'
        },
        {
          name: 'middleName',
          hidden: true,
          label: false,
          type: 'string'
        },
        {
          name: 'lastName',
          label: 'Last Name of the Flower Girl',
          type: 'string'
        },
        {
          name: 'photo',
          label: 'Add a photo of just them',
          type: 'image'
        },
        {
          name: 'photoWithYou',
          label: 'Add a photo of two of you togehter',
          type: 'image'
        }
      ]
    },
    {
      name: 'hasRingbearer',
      fields: [
        {
          name: 'option',
          label: 'Will you have Ring Bearer?',
          type: 'boolean',
          toggle: 'ringbearer',
        }
      ]
    },
    {
      name: 'ringbearer',
      hidden: true,
      fields: [
        {
          name: 'firstName',
          label: 'First Name of the Ring Bearer',
          type: 'string'
        },
        {
          name: 'middleNameToggle',
          label: 'Add Middle Name',
          type: 'toggle',
          toggle: 'ringbearer.middleName'
        },
        {
          name: 'middleName',
          hidden: true,
          label: false,
          type: 'string'
        },
        {
          name: 'lastName',
          label: 'Last Name of the Ring Bearer',
          type: 'string'
        },
        {
          name: 'photo',
          label: 'Add a photo of just them',
          type: 'image'
        },
        {
          name: 'photoWithYou',
          label: 'Add a photo of two of you togehter',
          type: 'image'
        },
        {
          name: 'addAnother',
          label: 'Add another Ring Bearer',
          icon: 'add circle',
          type: 'link',
          action: 'replicate'
        }
      ]
    },
  ]
};


