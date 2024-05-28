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
      providesTags: ['Directory', 'Note'],
    }),
    addNote: builder.mutation<Note, Omit<Note, '_id'> & { parentDirectoryId?: string }>({
      query: ({ ...body }) => ({
        url: `notes`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Note'],
    }),
    updateNote: builder.mutation<Note, { note: Partial<Note>; id: string }>({
      query: ({ id, ...body }) => ({
        url: `notes/${id}`,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const { useGetMainDirectoryQuery, useAddNoteMutation, useUpdateNoteMutation } = mainApi;
