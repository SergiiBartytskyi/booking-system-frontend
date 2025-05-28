import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { registerUser } from "../api";

export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const useLRegisterUserMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
      router.replace("/appointments");
    },
  });

  return {
    handleSignup: useLRegisterUserMutation.mutate,
    isPending: useLRegisterUserMutation.isPending,
    error: useLRegisterUserMutation.error,
  };
};
