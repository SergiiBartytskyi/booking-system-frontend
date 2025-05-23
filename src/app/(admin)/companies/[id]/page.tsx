import UserCard from "@/app/components/companyCard";
import { getBusinessUser, IBusinessUser } from "@/app/lib/api";
import getQueryClient from "@/app/lib/utils/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: { id: string };
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["companies", id],
    queryFn: () => getBusinessUser(id),
  });

  // const company = queryClient.getQueryData(["companies", id]) as IBusinessUser;
  // if (!company) {
  //   notFound();
  // }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="max-w-xl mx-auto p-6 border rounded-lg shadow-md mt-6">
        <h1 className="text-2xl font-bold mb-4">{company.name}</h1>
        <p className="text-gray-600 mb-2">{company.email}</p>
        <p className="text-gray-500">
          Зареєстрований: {new Date(company.createdAt).toLocaleDateString()}
        </p>

        <div className="mt-6">
          {/* тут буде форма для вибору дати і кнопка "Забронювати" */}
          <form>
            <label className="block mb-2 font-semibold" htmlFor="date">
              Оберіть дату:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="border rounded p-2 mb-4 w-full"
              required
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Забронювати
            </button>
          </form>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default Page;
