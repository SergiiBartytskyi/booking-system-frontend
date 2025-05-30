import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { registerUser } from "../api";
import { notify } from "../utils/notify";
import { handleAxiosError } from "../utils/handleAxiosError";

export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const useLRegisterUserMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });

      notify({
        message: "Successful registration!",
        type: "success",
      });

      router.replace("/appointments");
    },
    onError: handleAxiosError,
  });

  return {
    handleSignup: useLRegisterUserMutation.mutate,
    isPending: useLRegisterUserMutation.isPending,
  };
};
