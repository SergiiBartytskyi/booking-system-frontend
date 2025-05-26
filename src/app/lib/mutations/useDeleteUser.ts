import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAppointment, deleteUser } from "../api";
import { useRouter } from "next/navigation";
import { clearSession } from "../utils/clearSession";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,

    onSuccess: () => {
      queryClient.clear();

      clearSession();

      router.push("/auth/signin");
    },
  });

  return {
    handleDelete: deleteUserMutation.mutate,
    isPending: deleteUserMutation.isPending,
    isSuccess: deleteUserMutation.isSuccess,
    error: deleteUserMutation.error,
  };
};
