import { API_BASE_URL } from '@/const/const';
import { Directory, Note } from '@/lib/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getNoteById: builder.query<Note, string>({
      query: (id: string) => `/note/${id}`,
    }),
    addNoteToDirectory: builder.mutation<Note, { note: Omit<Note, 'id'>; directoryId?: string }>({
      query: ({ ...body }) => ({
        url: `note`,
        method: 'POST',
        body,
      }),
    }),
    getAllNotes: builder.query<Note[], undefined>({
      query: () => '/notes',
    }),
    getMainDirectory: builder.query<Directory, undefined>({
      query: () => '/main-directory',
    }),
  }),
});

export const { useGetNoteByIdQuery, useGetMainDirectoryQuery, useAddNoteToDirectoryMutation } = mainApi;
