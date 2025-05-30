import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../api";
import { useRouter } from "next/navigation";
import { clearSession } from "../utils/clearSession";
import { notify } from "../utils/notify";
import { handleAxiosError } from "../utils/handleAxiosError";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,

    onSuccess: () => {
      queryClient.clear();

      clearSession();

      notify({
        message: "User deletion successful!",
        type: "success",
      });

      router.replace("/auth/signin");
    },

    onError: handleAxiosError,
  });

  return {
    handleDelete: deleteUserMutation.mutate,
    isDeleteUserPending: deleteUserMutation.isPending,
  };
};
