import { apiSlice } from "../../app/api/apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    order: builder.mutation({
      query: (credentials) => ({
        url: "/order",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["Order"],
      providesTags: ["Order"],
    }),

    allOrders: builder.query({
      query: () => ({
        url: "/order/all-orders",
      }),
      invalidatesTags: ["Order"],
      providesTags: ["Order"],
    }),

    getLest: builder.query({
      query: () => ({
        url: "/order/get-order",
      }),
      invalidatesTags: ["Order"],
      providesTags: ["Order"],
    }),
  }),
});

export const { useOrderMutation, useAllOrdersQuery, useGetLestQuery } =
  orderApiSlice;
