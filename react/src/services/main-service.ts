import { API_BASE_URL } from '@/const/const';
import { Directory, Note } from '@/lib/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RegisterData } from './api-types';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  tagTypes: ['Directory', 'Note'],
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (body: RegisterData) => ({
        url: '/users/register',
        method: 'POST',
        body,
      }),
    }),
    // -------------------------------------------------------------------------------------
    // Directories
    getMainDirectory: builder.query<Directory, undefined>({
      query: () => '/directories/main',
      providesTags: ['Directory'],
    }),
    addDirectory: builder.mutation<
      Directory,
      Omit<Directory, '_id' | 'directories' | 'notes'> & { parentDirectoryId?: string }
    >({
      query: ({ ...body }) => ({
        url: '/directories',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Directory'],
    }),
    updateDirectory: builder.mutation<Directory, Partial<Directory>>({
      query: ({ ...directory }) => ({
        url: `/directories/${directory._id}`,
        method: 'PATCH',
        body: directory,
      }),
      invalidatesTags: ['Note', 'Directory'],
    }),
    deleteDirectory: builder.mutation<Directory, string>({
      query: (id) => ({
        url: `directories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Directory', 'Note'],
    }),
    // ---------------------------------------------------------------------------------------
    // Notes
    getNote: builder.query<Note, string | undefined>({
      query: (id) => (id ? `/notes/${id}` : ''),
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
    updateNote: builder.mutation<Note, Partial<Note>>({
      query: ({ ...note }) => ({
        url: `/notes/${note._id}`,
        method: 'PATCH',
        body: note,
      }),
      invalidatesTags: ['Note', 'Directory'],
    }),
    deleteNote: builder.mutation<Note, string>({
      query: (id) => ({
        url: `notes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Directory', 'Note'],
    }),
  }),
});

export const {
  useGetMainDirectoryQuery,
  useAddDirectoryMutation,
  useDeleteDirectoryMutation,
  useGetNoteQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
  useUpdateDirectoryMutation,
  useRegisterUserMutation,
} = mainApi;
