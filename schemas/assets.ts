export default {
  title: 'Assets',
  name: 'assets',
  type: 'document',
  fields: [
    {
      name: 'image',
      type: 'image',
      title: 'Image',
    },
    {
      name: 'attribution',
      type: 'string',
      title: 'Attribution',
    },
    {
      title: 'Section',
      name: 'section',
      type: 'reference',
      to: [{type: 'section'}],
      options: {
        disableNew: true,
      },
    },
  ],
}
