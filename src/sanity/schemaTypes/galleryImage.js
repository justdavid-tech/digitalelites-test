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
          'Class Activities'
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
      media: 'image'
    }
  }
}