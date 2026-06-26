export default {
  name: 'countdown',
  title: 'Countdown',
  type: 'document',
  fields: [
    {
      name: 'graduationDate',
      title: 'Graduation Date',
      type: 'datetime',
      description: 'Set the exact graduation date and time. The website will count down to this.'
    },
    {
      name: 'graduationMessage',
      title: 'Graduation Message',
      type: 'text',
      description: 'Message displayed below the countdown timer. e.g. The end of one journey marks the beginning of another.'
    },
  ],
  preview: {
    select: {
      title: 'graduationMessage',
      subtitle: 'graduationDate'
    }
  }
}