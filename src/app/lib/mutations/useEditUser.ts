import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCurrentUser } from "../api";

export const useEditUser = () => {
  const queryClient = useQueryClient();

  const useEditUserMutation = useMutation({
    mutationFn: editCurrentUser,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      queryClient.invalidateQueries({ queryKey: ["companies"] });

      queryClient.refetchQueries({ queryKey: ["currentUser"] });
      queryClient.refetchQueries({ queryKey: ["companies"] });
    },
  });

  return {
    handleEdit: useEditUserMutation.mutateAsync,
    isPending: useEditUserMutation.isPending,
    isSuccess: useEditUserMutation.isSuccess,
    error: useEditUserMutation.error,
  };
};
