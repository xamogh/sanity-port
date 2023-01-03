export default {
  name: 'skill',
  type: 'document',
  title: 'Skills',
  fields: [
    {
      title: 'Languages',
      type: 'object',
      name: 'languages',
      fields: [
        {
          title: 'Name',
          name: 'name',
          type: 'array',
          of: [{type: 'string'}],
        },
      ],
    },
    {
      title: 'Tools and Frameworks',
      type: 'object',
      name: 'tools_and_frameworks',
      fields: [
        {
          title: 'Name',
          name: 'name',
          type: 'array',
          of: [{type: 'string'}],
        },
      ],
    },
  ],
}
