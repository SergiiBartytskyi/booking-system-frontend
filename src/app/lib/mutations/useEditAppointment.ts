import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editAppointment } from "../api";
import { useRouter } from "next/navigation";
import { notify } from "../utils/notify";
import { handleAxiosError } from "../utils/handleAxiosError";

export const useEditAppointment = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const useEditAppointmentMutation = useMutation({
    mutationFn: editAppointment,

    onSuccess: () => {
      notify({ message: "Appointment successfully edited!", type: "success" });
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      router.replace("/appointments");
    },

    onError: handleAxiosError,
  });

  return {
    handleEdit: useEditAppointmentMutation.mutate,
    isEditAppointmentPending: useEditAppointmentMutation.isPending,
  };
};
