import type { CodegenConfig } from '@graphql-codegen/cli'

const args = process.argv.slice(2)
const isDownload = args.includes('--download')

const DEFAULT_GRAPHQL_ENDPOINT = 'http://127.0.0.1:19323/graphql'
const SCHEMA_SNAPSHOT = './src/__generated__/schema.graphql'

const graphqlEndpoint =
  process.env.REVO_ADMIN_GRAPHQL_ENDPOINT ??
  (process.env.REVO_ADMIN_GRAPHQL_TARGET
    ? `${process.env.REVO_ADMIN_GRAPHQL_TARGET}/graphql`
    : DEFAULT_GRAPHQL_ENDPOINT)

const scalars = {
  DateTime: 'string',
  JSON: 'unknown',
}

const disablePlugin = {
  add: {
    content: ['/* eslint-disable */', '/* prettier-ignore */'],
  },
}

const config: CodegenConfig = {
  overwrite: true,
  schema: isDownload ? graphqlEndpoint : SCHEMA_SNAPSHOT,
  documents: ['src/**/*.graphql'],
  ignoreNoDocuments: false,
  generates: {
    ...(isDownload
      ? {
          [SCHEMA_SNAPSHOT]: {
            plugins: ['schema-ast'],
            config: {
              includeDirectives: true,
            },
          },
        }
      : {
          './src/__generated__/graphql-request.ts': {
            plugins: [disablePlugin, 'typescript', 'typescript-operations', 'typescript-graphql-request'],
            config: {
              rawRequest: false,
              skipTypename: true,
              scalars,
            },
          },
        }),
  },
}

export default config
