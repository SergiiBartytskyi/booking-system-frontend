import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { addAppointment } from "../api";
import { notify } from "../utils/notify";
import { handleAxiosError } from "../utils/handleAxiosError";

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createAppointmentMutation = useMutation({
    mutationFn: addAppointment,

    onSuccess: () => {
      notify({
        message: "The appointment successfully created!",
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      router.replace("/appointments");
    },

    onError: handleAxiosError,
  });

  return {
    handleCreate: createAppointmentMutation.mutate,
    isPending: createAppointmentMutation.isPending,
  };
};
