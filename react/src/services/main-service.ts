import { API_BASE_URL } from '@/const/const';
import { Directory, Note } from '@/lib/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getNoteById: builder.query<Note, string>({
      query: (id: string) => `/notes/${id}`,
    }),
    getAllNotes: builder.query<Note[], undefined>({
      query: () => '/notes',
    }),
    getMainDirectory: builder.query<Directory, undefined>({
      query: () => '/main-directory',
    }),
  }),
});

export const { useGetNoteByIdQuery, useGetMainDirectoryQuery } = mainApi;
