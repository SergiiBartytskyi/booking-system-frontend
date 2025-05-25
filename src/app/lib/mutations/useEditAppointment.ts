import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editAppointment } from "../api";
import { useRouter } from "next/navigation";

export const useEditAppointment = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const useEditAppointmentMutation = useMutation({
    mutationFn: editAppointment,

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },

    onSuccess: (_, appointmentId) => {
      const appointments = queryClient.getQueriesData({
        queryKey: ["appointments"],
      });

      if (appointments) {
        queryClient.setQueryData(["appointments"], (oldData: any) => {
          if (!oldData) return [];
          return oldData.filter((a: any) => a.id !== appointmentId);
        });
      }

      router.replace("/appointments");
    },
  });

  return {
    handleEdit: useEditAppointmentMutation.mutate,
    isPending: useEditAppointmentMutation.isPending,
    isSuccess: useEditAppointmentMutation.isSuccess,
    error: useEditAppointmentMutation.error,
  };
};
