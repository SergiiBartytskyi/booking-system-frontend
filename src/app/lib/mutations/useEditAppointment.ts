import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editAppointment, IAppointment } from "../api";
import { useRouter } from "next/navigation";
import { notify } from "../utils/notify";
import { handleAxiosError } from "../utils/handleAxiosError";

export const useEditAppointment = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const useEditAppointmentMutation = useMutation({
    mutationFn: editAppointment,

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },

    onSuccess: (_, data) => {
      notify({
        message: "Appointment successfully edited!",
        type: "success",
      });

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

    onError: handleAxiosError,
  });

  return {
    handleEdit: useEditAppointmentMutation.mutate,
    isEditAppointmentPending: useEditAppointmentMutation.isPending,
  };
};
