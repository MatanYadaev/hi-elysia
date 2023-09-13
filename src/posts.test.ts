import {describe, expect, test, setSystemTime} from 'bun:test'
import {Elysia} from "elysia";
import {posts} from "./posts";

describe('posts', () => {
  describe('POST /posts', () => {
    test('When the request is valid, it should return a post', async () => {
      // Arrange
      const app = new Elysia().use(posts)
      const request = new Request('http://localhost/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Hello',
          content: 'World',
        }),
      });
      setSystemTime(new Date('2021-01-01T00:00:00.000Z'))

      // Act
      const response = await app.handle(request)

      // Assert
      const responseBody = await response.json()
      expect(responseBody).toEqual({
        title: 'Hello',
        content: 'World',
        createdAt: '2021-01-01T00:00:00.000Z',
      });
      setSystemTime();
    })
  })
})