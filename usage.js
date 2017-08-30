const usage = [
  {
    header: 'Password Strength MEAN App',
    content: 'A MEAN App that measures the strength of passwords.'
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'server',
        typeLabel: '[underline]{server}',
        description: 'Starts the nodejs server'
      },
      {
        name: 'db',
        description: '???'
      },
      {
        name: 'verbose',
        description: 'Displays additional details as to what the app is doing'
      },
      {
        name: 'help',
        description: 'Print this usage guide'
      }
    ]
  }
]

module.exports = usage;