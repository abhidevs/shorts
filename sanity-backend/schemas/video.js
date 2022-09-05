export default {
    name: 'video',
    title: 'Video',
    type: 'document',
    fields: [
      {
        name: 'description',
        title: 'Description',
        type: 'string',
      },
      {
        name: 'video',
        title: 'Video',
        type: 'file',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'userId',
        title: 'User Id',
        type: 'string',
      },
      {
        name: 'postedBy',
        title: 'Posted By',
        type: 'postedBy',
      },
      {
        name: 'likes',
        title: 'Likes',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [{ type: 'user' }],
          },
        ],
      },
      {
        name: 'comments',
        title: 'Comments',
        type: 'array',
        of: [{ type: 'comment' }],
      },
      {
        name: 'topic',
        title: 'Topic',
        type: 'string',
      },
    ],
  };