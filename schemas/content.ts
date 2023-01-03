export default {
  name: 'content',
  type: 'document',
  title: 'Contents',
  fields: [
    {
      title: 'Content',
      name: 'content',
      type: 'string',
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
