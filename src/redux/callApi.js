import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = "testtoken";

export const callApi = createApi({
  reducerPath: "callApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.skilla.ru/mango/",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getCall: build.query({
      query: ({ dateStart, dateEnd, inOut, sort }) => ({
        url:
          inOut === "all"
            ? `/getList?date_start=${dateStart}&date_end=${dateEnd}&sort_by=${sort}`
            : `/getList?date_start=${dateStart}&date_end=${dateEnd}&in_out=${inOut}&sort_by=${sort}`,
        method: "POST",
      }),
    }),
    getRecord: build.query({
      query: ({ recordId, partnershipId }) => ({
        url: `/getRecord?record=${recordId}&partnership_id=${partnershipId}`,

        method: "POST",
        responseHandler: (response) => response.blob(),

        headers: {
          "Content-Type": "audio/mpeg",
        },
      }),
      transformResponse: (response) => {
        return URL.createObjectURL(response);
      },
    }),
  }),
});

export const { useGetCallQuery, useGetRecordQuery } = callApi;
