import {Elysia, t} from "elysia";

const PostSchema = t.Object({
  title: t.String({
    minLength: 3,
  }),
  content: t.String({
    minLength: 3,
  }),
  createdAt: t.String({
    format: 'date-time',
  }),
});

const CreatePostSchema = t.Pick(PostSchema, ['title', 'content'])

export const posts = new Elysia({prefix: '/posts'})
  .model('post', PostSchema)
  .post('/', ({body}) => {
    if (body.title === 'error') throw new Error('error')

    return {
      ...body,
      createdAt: new Date().toISOString(),
    }
  }, {
    body: CreatePostSchema,
    response: {
      200: 'post',
      400: t.Object({
        message: t.String(),
      }),
    },
    detail: {
      summary: 'Create a post',
      operationId: 'createPost',
      tags: ['posts'],
    },
  })