module.exports = {
  name: 'Wedding Invite',
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
          name: 'lastName',
          label: 'Your Last Name',
          required: true,
          type: 'string'
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
          name: 'lastName',
          label: 'Their Last Name',
          required: true,
          type: 'string'
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
          sideCheck: {
            action: 'same',
            label: 'Same as before',
            target: 'your.firstName'
          }
        },
        {
          name: 'lastName',
          label: 'Your Last Name after Marriage',
          type: 'string',
          sideCheck: {
            action: 'same',
            label: 'Same as before',
            target: 'your.lastName'
          }
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
          sideCheck: {
            action: 'same',
            label: 'Same as before',
            target: 'their.firstName'
          }
        },
        {
          name: 'theirLastNameMarriage',
          label: 'Their Last Name after Marriage',
          type: 'string',
          sideCheck: {
            action: 'same',
            label: 'Same as before',
            target: 'their.lastName'
          }
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
          sideCheck: {
            action: 'dont-know',
            label: 'Don\'t Know Yet'
          }
        },
        {
          name: 'time',
          label: 'Time of your Wedding',
          type: 'time',
          sideCheck: {
            action: 'dont-know',
            label: 'Don\'t Know Yet'
          }
        },
        {
          name: 'name',
          label: 'Name of your Wedding Venue',
          type: 'string',
          disableCheck: 'There won\'t be a wedding venue',
          sideCheck: {
            action: 'dont-know',
            label: 'Don\'t Know Yet'
          }
        },
        {
          name: 'address',
          label: 'Address of your Wedding Venue',
          type: 'string',
          sideCheck: {
            action: 'dont-know',
            label: 'Don\'t Know Yet'
          }
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
          sideCheck: {
            action: 'dont-know',
            label: 'Don\'t Know Yet'
          }
        },
        {
          name: 'address',
          label: 'Address of your Reception Venue',
          type: 'string',
          sideCheck: {
            action: 'dont-know',
            label: 'Don\'t Know Yet'
          }
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
          sideCheck: {
            action: 'dont-know',
            label: 'Don\'t Know Yet'
          }
        },
        {
          name: 'date',
          label: 'Date of your Honeymoon',
          type: 'daterange',
          sideCheck: {
            action: 'dont-know',
            label: 'Don\'t Know Yet'
          }
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
        }
      ]
    },
    {
      name: 'brideAnotherMother',
      hidden: true,
      link: 'Add another mother of the bride',
      fields: [
        {
          name: 'firstName',
          label: 'First Name of the Mother of the Bride',
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
      link: 'Add another father of the bride',
      fields: [
        {
          name: 'firstName',
          label: 'First Name of the Father of the Bride',
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
        }
      ]
    },
    {
      name: 'groomAnotherMother',
      link: 'Add another mother of the groom',
      hidden: true,
      fields: [
        {
          name: 'firstName',
          label: 'First Name of the Mother of the Groom',
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
      link: 'Add another father of the groom',
      hidden: true,
      fields: [
        {
          name: 'firstName',
          label: 'First Name of the Father of the Groom',
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
        }
      ]
    },
    {
      name: 'anotherMaidOfHonor',
      link: 'Add another Maid of Honor',
      hidden: true,
      fields: [
        {
          name: 'firstName',
          label: 'First Name of the Maid of Honor',
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
        }
      ]
    },
    {
      name: 'anotherBestMan',
      link: 'Add another Best Man',
      hidden: true,
      fields: [
        {
          name: 'firstName',
          label: 'First Name of the Best Man',
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
        }
      ]
    },
    {
      name: 'bridesmaid',
      fields: [
        {
          name: 'option',
          label: 'Will you have Bridesmaids?',
          type: 'boolean',
          toggle: 'bridesmaid.howMany',
        },
        {
          name: 'howMany',
          hidden: true,
          label: 'How many Bridesmaids will you have?',
          type: 'number'
        }
      ]
    },
    {
      name: 'flowergirl',
      fields: [
        {
          name: 'option',
          label: 'Will you have Flower Girl?',
          type: 'boolean',
          toggle: 'flowergirl.howMany',
        },
        {
          name: 'howMany',
          hidden: true,
          label: 'How many Flower Girls will you have?',
          type: 'number'
        }
      ]
    }
  ]
};


