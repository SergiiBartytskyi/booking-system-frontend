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
      notify({
        message: "Successful registration!",
        type: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
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
