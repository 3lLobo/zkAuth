import { createApi } from '@reduxjs/toolkit/query/react'
import { AddressAllDocument, AddressAllQuery, execute } from '../.graphclient'

const graphqlBaseQuery =
  () =>
    async ({ walletAddress }: { walletAddress: string }) => {
      console.log(`wallet: ${walletAddress}`)
      try {
        const result = await execute(AddressAllDocument, { walletAddress })
        return { data: result?.data }
      } catch (error) {
        return { error: { status: 500, data: error } }
      }
    }

export const graphApi2 = createApi({
  reducerPath: 'graphApi2',
  baseQuery: graphqlBaseQuery(),
  endpoints: (builder) => ({
    getAuth: builder.query({
      query: (walletAddress) => ({
        walletAddress,
      }),
      // transformResponse: (response) => {
      //   if (response.data.address) {
      //     return {
      //       ...response.data.address,
      //     }
      //   } else {
      //     return {
      //       authIncoming: [],
      //       authOutgoing: [],
      //     }
      //   }
      // },
    }),
  }),
})

export const { useGetAuthQuery } = graphApi2