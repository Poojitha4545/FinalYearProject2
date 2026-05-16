import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const Api = createApi({
  reducerPath: 'Api',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api` }),
  endpoints: (build) => ({

    createRegistration: build.mutation({
      query: (registrationData) => ({
        url: '/registrations',
        method: 'POST',
        body: registrationData,
      }),
    }),


  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCreateRegistrationMutation } = Api