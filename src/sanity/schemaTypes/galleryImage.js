export default {
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string'
    },
    {
      name: 'isFunny',
      title: 'Funny Image / Meme?',
      type: 'boolean',
      description: 'Toggle ON if this is a funny image, meme, or friendly banter to roast your mates!',
      initialValue: false
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          'Department Events',
          'Project Defense',
          'Sign Out',
          'Casual Moments',
          'Convocation',
          'Class Activities',
          'Funny Moments / Memes',
          'Friendly Banter'
        ],
        layout: 'dropdown'
      }
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date'
    },
  ],
  preview: {
    select: {
      title: 'caption',
      subtitle: 'category',
      media: 'image',
      isFunny: 'isFunny'
    },
    prepare({ title, subtitle, media, isFunny }) {
      return {
        title: title || 'Untitled Image',
        subtitle: subtitle || (isFunny ? 'Funny / Meme' : 'Gallery Image'),
        media
      }
    }
  }
}