import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearSession } from "../utils/clearSession";
import { useRouter } from "next/navigation";
import { logout } from "../api";

export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      clearSession();
      router.push("/auth/signin");
    },
  });

  return {
    handleLogout: logoutMutation.mutate,
  };
};
