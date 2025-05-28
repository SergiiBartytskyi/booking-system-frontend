import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAppointment, IAppointment } from "../api";
import { useRouter } from "next/navigation";
import { notify } from "../utils/notify";
import { handleAxiosError } from "../utils/handleAxiosError";

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteAppointmentMutation = useMutation({
    mutationFn: deleteAppointment,

    onSuccess: (_, appointmentId) => {
      notify({
        message: "The appointment deleted successfully!",
        type: "success",
      });
      queryClient.setQueryData<IAppointment[]>(["appointments"], (oldData) => {
        if (!oldData) return [];
        return oldData.filter((a) => a._id !== appointmentId);
      });

      queryClient.invalidateQueries({ queryKey: ["appointments"] });

      router.replace("/appointments");
    },

    onError: handleAxiosError,
  });

  return {
    handleDelete: deleteAppointmentMutation.mutate,
    isDeletePending: deleteAppointmentMutation.isPending,
  };
};
