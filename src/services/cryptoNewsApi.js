import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const cryptoNewsHeaders = {
    'x-rapidapi-key': 'f23f5e54f5msh8f099d6e8ab7e5cp1f8817jsn456f2d371fa4',
    'x-rapidapi-host': 'real-time-news-data.p.rapidapi.com'
}


const baseUrl = 'https://real-time-news-data.p.rapidapi.com';

const createRequest = (url) => ({ url,  headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ keyword , count  }) => createRequest(`/search?query=${keyword}&limit=${count}&time_published=anytime&country=US&lang=en`
),
        }),
    }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;