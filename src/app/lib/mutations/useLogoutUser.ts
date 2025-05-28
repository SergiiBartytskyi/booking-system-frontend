import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearSession } from "../utils/clearSession";
import { useRouter } from "next/navigation";
import { logout } from "../api";
import { notify } from "../utils/notify";
import { handleAxiosError } from "../utils/handleAxiosError";

export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      notify({
        message: "User logout successful!",
        type: "success",
      });
      queryClient.clear();
      clearSession();
      router.push("/auth/signin");
    },

    onError: handleAxiosError,
  });

  return {
    handleLogout: logoutMutation.mutate,
    isLogoutPending: logoutMutation.isPending,
  };
};
