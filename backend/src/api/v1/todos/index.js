// Showing that you don't need to have apiDoc defined on methodHandlers.
module.exports = () => {
  const operations = {
    GET,
  };

  function GET(req, res, next) {
    res.status(200).json([
      { id: 0, message: "First todo" },
      { id: 1, message: "Second todo" },
    ]);
  }

  GET.apiDoc = {
    description: "Fetch a new user.",
    tags: ["care"],
    parameters: [
      // {  
      //   in: "body",
      //   name: "todo",
      //   schema: {
      //     $ref: "#/definitions/User",
      //   },
      // },
    ],
    summary: "Fetch todos.",
    operationId: "getTodos",
    responses: {
      200: {
        description: "List of todos.",
        schema: {
          type: "array",
          items: {
            $ref: "#/definitions/User",
          },
        },
      },
    },
  };
  return operations;
};
