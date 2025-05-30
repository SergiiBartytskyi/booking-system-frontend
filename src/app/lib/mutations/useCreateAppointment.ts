import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { addAppointment, IAppointment } from "../api";
import { notify } from "../utils/notify";
import { handleAxiosError } from "../utils/handleAxiosError";

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createAppointmentMutation = useMutation({
    mutationFn: addAppointment,

    onSuccess: (newAppointment) => {
      queryClient.setQueryData<IAppointment[]>(["appointments"], (oldData) => {
        if (!oldData) return [newAppointment];
        return [...oldData, newAppointment];
      });

      queryClient.invalidateQueries({ queryKey: ["appointments"] });

      notify({
        message: "The appointment successfully created!",
        type: "success",
      });

      router.replace("/appointments");
    },

    onError: handleAxiosError,
  });

  return {
    handleCreate: createAppointmentMutation.mutate,
    isPending: createAppointmentMutation.isPending,
  };
};
