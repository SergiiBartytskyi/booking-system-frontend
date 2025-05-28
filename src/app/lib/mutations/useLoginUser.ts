import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginUser } from "../api";

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const useLoginUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      router.replace("/appointments");
    },
  });

  return {
    handleLogin: useLoginUserMutation.mutate,
    isPending: useLoginUserMutation.isPending,
    error: useLoginUserMutation.error,
  };
};
