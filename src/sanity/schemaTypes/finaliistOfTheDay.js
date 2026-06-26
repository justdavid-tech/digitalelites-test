export default {
  name: 'finalistOfTheDay',
  title: 'Finalist of the Day',
  type: 'document',
  fields: [
    {
      name: 'finalist',
      title: 'Finalist',
      type: 'reference',
      to: [{ type: 'finalist' }]
    },
    {
      name: 'isActive',
      title: 'Is Active Today?',
      type: 'boolean',
      description: 'Turn ON for today\'s finalist. Only one should be active at a time.'
    },
    {
      name: 'dateFeautured',
      title: 'Date Featured',
      type: 'date'
    },
  ],
  preview: {
    select: {
      title: 'finalist.fullName',
      subtitle: 'dateFeautured',
      media: 'finalist.photo'
    }
  }
}