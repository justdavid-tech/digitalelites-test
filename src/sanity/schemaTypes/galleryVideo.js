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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          'Project Defense',
          'Department Events',
          'Convocation',
          'Student Highlights'
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
      media: 'thumbnail'
    }
  }
}