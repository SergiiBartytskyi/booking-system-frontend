import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCurrentUser } from "../api";
import { notify } from "../utils/notify";
import { handleAxiosError } from "../utils/handleAxiosError";

export const useEditUser = () => {
  const queryClient = useQueryClient();

  const useEditUserMutation = useMutation({
    mutationFn: editCurrentUser,

    onSuccess: () => {
      notify({
        message: "Successful user editing!",
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      queryClient.invalidateQueries({ queryKey: ["companies"] });

      queryClient.refetchQueries({ queryKey: ["currentUser"] });
      queryClient.refetchQueries({ queryKey: ["companies"] });
    },

    onError: handleAxiosError,
  });

  return {
    handleEdit: useEditUserMutation.mutateAsync,
    isEditUserPending: useEditUserMutation.isPending,
  };
};
