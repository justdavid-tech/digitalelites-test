export default {
  name: 'finalist',
  title: 'Finalist Profile',
  type: 'document',
  fields: [
    // Basic Info
    { name: 'fullName', title: 'Full Name', type: 'string' },
    { name: 'nickname', title: 'Nickname', type: 'string' },
    {
  name: 'isFeatured',
  title: 'Featured (Show First)',
  type: 'boolean',
  description: 'Turn ON to pin this finalist to the top of the Finalists page.',
  initialValue: false,
},
    {
  name: 'slug',
  title: 'Slug',
  type: 'slug',
  options: {
    source: 'fullName',
    maxLength: 96,
  },
  description: 'Auto-generated from the full name. Click "Generate" after typing the name.'
},
    { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } },
    { name: 'gender', title: 'Gender', type: 'string',
      options: { list: ['Male', 'Female'], layout: 'radio' }
    },

    // Personal Info
    { name: 'birthday', title: 'Birthday', type: 'string' },
    { name: 'stateOfOrigin', title: 'State of Origin', type: 'string' },
    { name: 'relationshipStatus', title: 'Relationship Status', type: 'string' },
    { name: 'hobbies', title: 'Hobbies', type: 'string' },

    // Academic Info
    { name: 'favoriteCourse', title: 'Favorite Course', type: 'string' },
    { name: 'hardestCourse', title: 'Hardest Course', type: 'string' },
    { name: 'favoriteLecturer', title: 'Favorite Lecturer', type: 'string' },
    { name: 'mostStressfulLevel', title: 'Most Stressful Level', type: 'string' },

    // Fun Questions
    { name: 'classCrush', title: 'Class Crush', type: 'string' },
    { name: 'bestExperience', title: 'Best Experience', type: 'text' },
    { name: 'atbuInOneWord', title: 'ATBU In One Word', type: 'string' },
    { name: 'ifNotComputerEngineering', title: 'If Not Computer Engineering', type: 'string' },

    // Quote
    { name: 'personalQuote', title: 'Personal Quote', type: 'text' },

// Social Media
{
  name: 'socialMediaHandles',
  title: 'Social Media Handles',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        {
          name: 'platform',
          title: 'Platform',
          type: 'string',
          options: {
            list: [
              { title: 'Instagram', value: 'instagram' },
              { title: 'Facebook', value: 'facebook' },
              { title: 'X (Twitter)', value: 'twitter' },
              { title: 'LinkedIn', value: 'linkedin' },
              { title: 'TikTok', value: 'tiktok' },
              { title: 'YouTube', value: 'youtube' },
              { title: 'Threads', value: 'threads' },
              { title: 'Snapchat', value: 'snapchat' },
              { title: 'WhatsApp', value: 'whatsapp' },
              { title: 'Telegram', value: 'telegram' }
            ],
            layout: 'dropdown'
          }
        },
        {
          name: 'handle',
          title: 'Handle / Username',
          type: 'string',
          description: 'Example: @johndoe'
        }
      ],
      preview: {
        select: {
          title: 'platform',
          subtitle: 'handle'
        }
      }
    }
  ]
}
  ],

  preview: {
    select: { title: 'fullName', subtitle: 'nickname', media: 'photo' }
  }
}