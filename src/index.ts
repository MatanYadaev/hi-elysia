import {Elysia} from "elysia";
import {swagger} from '@elysiajs/swagger'
import {posts} from "./posts";

const app = new Elysia()
  .use(swagger({
    documentation: {
      info: {
        title: 'Elysia',
        version: '1.0.0',
      },
    }
  }))
  .get("/", () => "Hello Elysia")
  .use(posts)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
