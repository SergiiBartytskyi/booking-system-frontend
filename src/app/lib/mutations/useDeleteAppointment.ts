import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAppointment } from "../api";

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();

  const deleteAppointmentMutation = useMutation({
    mutationFn: deleteAppointment,

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
    },
  });

  return {
    handleDelete: deleteAppointmentMutation.mutate,
    isPending: deleteAppointmentMutation.isPending,
    isSuccess: deleteAppointmentMutation.isSuccess,
    error: deleteAppointmentMutation.error,
  };
};
