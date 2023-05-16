import { Elysia } from 'elysia'
import { yoga } from '@elysiajs/graphql-yoga'

import { createYoga, createSchema } from 'graphql-yoga'
import { useGraphQlJit } from '@envelop/graphql-jit'

const app = new Elysia()
    .get('/', () => 'Hello Elysia')
    .use(
        yoga({
            path: '/graphql',
            yoga: createYoga({
                schema: createSchema({
                    typeDefs: `
                        type Query {
                            hi: String
                        }
                `,
                    resolvers: {
                        Query: {
                            hi: () => 'Hi from Elysia'
                        }
                    }
                }),
                plugins: [useGraphQlJit]
            })
        })
    )
    .listen(3000)

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
