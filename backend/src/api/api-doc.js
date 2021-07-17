module.exports = {
  swagger: '2.0',

  host: 'test-host',
  // all routes will now have /v1 prefixed.
  basePath: '/v1',

  info: {
    title: 'Birdie Test API',
    version: '1.0.0',
  },

  definitions: {
    Error: {
      additionalProperties: true,
    },
    Event: {
      properties: {
        name: {
          type: 'string',
        },
        // friends: {
        //   type: 'array',
        //   items: {
        //     $ref: '#/definitions/Event',
        //   },
        // },
      },
      required: ['name'],
    },
  },

  // paths are derived from args.routes.  These are filled in by fs-routes.
  paths: {},

  // tags is optional, and is generated / sorted by the tags defined in your path
  // docs.  This API also defines 2 tags in operations: "creating" and "fooey".
  tags: [
    // {name: 'creating'} will be inserted by ./api-routes/users.js
    // {name: 'fooey'} will be inserted by ./api-routes/users/{id}.js
    { description: 'Care Events', name: 'events' },
  ],
};
