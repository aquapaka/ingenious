import { API_BASE_URL } from '@/const/const';
import { Directory, Note, Tag, User } from '@/lib/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../app/store';
import {
  CreateDirectoryData,
  CreateNoteData,
  CreateTagData,
  LoginData,
  RegisterData,
  UpdateDirectoryData,
  UpdateNoteData,
  UpdateTagData,
} from './api-types';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  tagTypes: ['User', 'Directory', 'Note'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders(headers, api) {
      const state = api.getState() as RootState;
      const userToken = state.auth.userToken;

      if (userToken) {
        headers.set('authorization', `Bearer ${userToken}`);
        return headers;
      }
    },
  }),
  endpoints: (builder) => ({
    // -------------------------------------------------------------------------------------
    // Users & Auth
    login: builder.mutation({
      query: (body: LoginData) => ({
        url: '/auth/login',
        method: 'POST',
        body,
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['User'],
    }),
    registerUser: builder.mutation({
      query: (body: RegisterData) => ({
        url: '/users/register',
        method: 'POST',
        body,
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['User'],
    }),
    getUserData: builder.query<User, void>({
      query: () => '/users/self',
      providesTags: ['User'],
    }),
    // -------------------------------------------------------------------------------------
    // Directories
    getUserDirectories: builder.query<Directory[], void>({
      query: () => '/directories/self',
      providesTags: ['Directory'],
    }),
    addDirectory: builder.mutation<Directory, CreateDirectoryData>({
      query: ({ ...body }) => ({
        url: '/directories',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    updateDirectory: builder.mutation<Directory, { id: string; directory: UpdateDirectoryData }>({
      query: ({ id, directory }) => ({
        url: `/directories/${id}`,
        method: 'PATCH',
        body: directory,
      }),
      invalidatesTags: ['User', 'Directory'],
    }),
    deleteDirectory: builder.mutation<Directory, string>({
      query: (id) => ({
        url: `directories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User', 'Directory'],
    }),
    // ---------------------------------------------------------------------------------------
    // Tags
    addTag: builder.mutation<Tag, CreateTagData>({
      query: ({ ...body }) => ({
        url: '/tags',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    updateTag: builder.mutation<Tag, { id: string; tag: UpdateTagData }>({
      query: ({ id, tag }) => ({
        url: `/tags/${id}`,
        method: 'PATCH',
        body: tag,
      }),
      invalidatesTags: ['User', 'Note'],
    }),
    deleteTag: builder.mutation<Tag, { id: string }>({
      query: ({ id }) => ({
        url: `/tags/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User', 'Note'],
    }),
    // ---------------------------------------------------------------------------------------
    // Notes
    getNote: builder.query<Note, string>({
      query: (id) => `/notes/${id}`,
      providesTags: ['Note'],
    }),
    addNote: builder.mutation<Note, CreateNoteData>({
      query: ({ ...body }) => ({
        url: `/notes`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    updateNote: builder.mutation<Note, { id: string; note: UpdateNoteData }>({
      query: ({ id, note }) => ({
        url: `/notes/${id}`,
        method: 'PATCH',
        body: note,
      }),
      invalidatesTags: ['User', 'Note'],
    }),
    deleteNote: builder.mutation<Note, string>({
      query: (id) => ({
        url: `notes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User', 'Note'],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginMutation,
  useGetUserDataQuery,
  useGetNoteQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
  useAddDirectoryMutation,
  useUpdateDirectoryMutation,
  useDeleteDirectoryMutation,
  useAddTagMutation,
  useDeleteTagMutation,
  useUpdateTagMutation,
  useGetUserDirectoriesQuery,
} = mainApi;
