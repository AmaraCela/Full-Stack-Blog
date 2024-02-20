import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credenitals => ({
                url: '/login',
                method: 'POST',
                body: {...credenitals}
            })
        }),
        
    })
})

export const {useLoginMutation} = userApiSlice