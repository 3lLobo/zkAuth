import { createApi } from '@reduxjs/toolkit/query/react'
import { request, gql, ClientError } from 'graphql-request'


const graphqlBaseQuery =
  ({ baseUrl }: { baseUrl: string }) =>
    async ({ body }: { body: string }) => {
      try {
        const result = await request(baseUrl, body)
        return { data: result }
      } catch (error) {
        if (error instanceof ClientError) {
          return { error: { status: error.response.status, data: error } }
        }
        return { error: { status: 500, data: error } }
      }
    }

export const graphApi = createApi({
  reducerPath: 'graphApi',
  baseQuery: graphqlBaseQuery({
    baseUrl: 'https://api.thegraph.com/subgraphs/name/3llobo/zkauthtotp',
  }),
  endpoints: (builder) => ({
    getAuth: builder.query({
      query: (walletAddress) => ({
        body: gql`
        #graphql
        query AddressAll(${walletAddress}: ID) {
          address(id: ${walletAddress}) {
            authIncoming(orderBy: requestId, orderDirection: desc) {
              created
              requestId
              id
              authData {
                created
                genTime
                totp5
                id
                totp6Hash
              }
              requestee {
                address
              }
              requestor {
                address
              }
              status {
                id
                validationTime
                isValid
                hasResponse
              }
            }
            authOutgoing(orderBy: requestId, orderDirection: desc) {
              authData {
                id
                totp6Hash
                totp5
                genTime
                created
              }
              created
              id
              requestId
              requestee {
                address
              }
              requestor {
                address
              }
              status {
                id
                validationTime
                isValid
                hasResponse
              }
            }
          }
        }
        `,
      }),
      transformResponse: (response) => {
        // return response.data
        if (response.data.address) {
          return {
            ...response.data.address,
          }
        } else {
          return {
            authIncoming: [],
            authOutgoing: [],
          }
        }
      },
    }),
  }),
})

export const { useGetAuthQuery } = graphApi