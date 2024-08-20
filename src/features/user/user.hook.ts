import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import * as UserKeys from "./user.keys";
import { PasswordCredentialDto } from "./user.dto";
import { userService } from "./user.service";
import { useUserProfile } from "./user-context";

/**
 * 用户登录 Hook
 * @returns
 */
export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: PasswordCredentialDto) => {
      return userService.login(data);
    },
  });
};
/**
 * 当用户登出后需要清理用户信息缓存
 */
export const useAutoClearProfile = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.removeQueries({
      queryKey: UserKeys.PROFILE,
      exact: true,
    });
  }, [queryClient]);
};

/**
 * 获取我的权限码
 * @returns
 */
export function useMyAuthorities(): string[] | undefined {
  const { permissions } = useUserProfile();

  return permissions;
}
