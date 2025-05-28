import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editAppointment, IAppointment } from "../api";
import { useRouter } from "next/navigation";

export const useEditAppointment = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const useEditAppointmentMutation = useMutation({
    mutationFn: editAppointment,

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },

    onSuccess: (_, data) => {
      const appointments = queryClient.getQueriesData({
        queryKey: ["appointments"],
      });

      if (appointments) {
        queryClient.setQueryData<IAppointment[]>(
          ["appointments"],
          (oldData) => {
            if (!oldData) return [];
            return oldData.map((a) =>
              a._id === data.appointmentId ? { ...a, ...data } : a
            );
          }
        );
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
