import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginUser } from "../api";
import { notify } from "../utils/notify";
import { handleAxiosError } from "../utils/handleAxiosError";

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const useLoginUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });

      notify({
        message: "Successful login!",
        type: "success",
      });

      router.replace("/appointments");
    },
    onError: handleAxiosError,
  });

  return {
    handleLogin: useLoginUserMutation.mutate,
    isPending: useLoginUserMutation.isPending,
  };
};
