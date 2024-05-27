import { API_BASE_URL } from '@/const/const';
import { Directory, Note } from '@/lib/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getMainDirectory: builder.query<Directory, undefined>({
      query: () => '/directories/main',
    }),
    addNoteToDirectory: builder.mutation<Note, { note: Omit<Note, 'id'>; directoryId?: string }>({
      query: ({ ...body }) => ({
        url: `notes`,
        method: 'POST',
        body,
      }),
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

export const { useGetMainDirectoryQuery, useAddNoteToDirectoryMutation, useUpdateNoteMutation } = mainApi;
