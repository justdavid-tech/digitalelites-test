export default {
  name: 'galleryVideo',
  title: 'Gallery Video',
  type: 'document',
  fields: [
    {
      name: 'video',
      title: 'Video',
      type: 'file',
      options: { accept: 'video/*' }
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
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
      title: 'Funny Video / Banter?',
      type: 'boolean',
      description: 'Toggle ON if this is a funny video, banter, or humorous clip!',
      initialValue: false
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          'Project Defense',
          'Department Events',
          'Convocation',
          'Student Highlights',
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
      media: 'thumbnail',
      isFunny: 'isFunny'
    },
    prepare({ title, subtitle, media, isFunny }) {
      return {
        title: title || 'Untitled Video',
        subtitle: subtitle || (isFunny ? 'Funny Video / Banter' : 'Gallery Video'),
        media
      }
    }
  }
}