import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAppointment, IAppointment } from "../api";
import { useRouter } from "next/navigation";

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteAppointmentMutation = useMutation({
    mutationFn: deleteAppointment,

    onSuccess: (_, appointmentId) => {
      queryClient.setQueryData<IAppointment[]>(["appointments"], (oldData) => {
        if (!oldData) return [];
        return oldData.filter((a) => a._id !== appointmentId);
      });

      queryClient.invalidateQueries({ queryKey: ["appointments"] });

      router.push("/appointments");
    },
  });

  return {
    handleDelete: deleteAppointmentMutation.mutate,
    isPending: deleteAppointmentMutation.isPending,
    isSuccess: deleteAppointmentMutation.isSuccess,
    error: deleteAppointmentMutation.error,
  };
};
