import { API_BASE_URL } from '@/const/const';
import { Directory, Note } from '@/lib/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  tagTypes: ['Directory', 'Note'],
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getMainDirectory: builder.query<Directory, undefined>({
      query: () => '/directories/main',
      providesTags: ['Directory'],
    }),
    getNote: builder.query<Note, { _id: string | undefined }>({
      query: ({ _id }) => `/notes/${_id}`,
      providesTags: ['Note'],
    }),
    addNote: builder.mutation<Note, Omit<Note, '_id'> & { parentDirectoryId?: string }>({
      query: ({ ...body }) => ({
        url: `/notes`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Directory'],
    }),
    updateNote: builder.mutation<Note, Note>({
      query: ({ ...note }) => ({
        url: `/notes/${note._id}`,
        method: 'PATCH',
        body: note,
      }),
      invalidatesTags: ['Note'],
    }),
  }),
});

export const { useGetMainDirectoryQuery, useGetNoteQuery, useAddNoteMutation, useUpdateNoteMutation } = mainApi;
