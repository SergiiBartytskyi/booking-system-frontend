import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { addAppointment } from "../api";

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createAppointmentMutation = useMutation({
    mutationFn: addAppointment,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      router.replace("/appointments");
    },
  });

  return {
    handleCreate: createAppointmentMutation.mutate,
    isPending: createAppointmentMutation.isPending,
    error: createAppointmentMutation.error,
  };
};
