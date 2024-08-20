import { UserKeys, UserProfileProvider, userService, UserProfile } from "@/features/user";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { FC, PropsWithChildren, Suspense } from "react";
import { Await, Outlet, useAsyncValue, useLoaderData } from "react-router-dom";
import { AuthenticationFailed } from "./authentication-failed";

import S from "./authentication-guard.module.less";

export interface LoaderData {
  user: UserProfile;
}
/**
 * 身份认证拦截守卫
 *
 * 在其子组件加载前会先加载用户信息，用户信息是所有业务逻辑的前提
 *
 * 如果用户信息加载失败则无法进入子页面，身份认证失败会要重新登录，其他错误会展示错误信息并要求用户重试
 */
export const AuthenticationGuard: FC<PropsWithChildren> = () => {
  const initialData = useLoaderData() as LoaderData;
  return (
    <Suspense fallback={<FullSreenLoading></FullSreenLoading>}>
      <Await resolve={initialData.user} errorElement={<AuthenticationFailed />}>
        <InternalRoot></InternalRoot>
      </Await>
    </Suspense>
  );
};

const FullSreenLoading = () => {
  return (
    <Spin spinning size="large" delay={300} tip="正在加载用户信息..." wrapperClassName={S.override}>
      <div></div>
    </Spin>
  );
};

export const InternalRoot = () => {
  const initialUserData = useAsyncValue() as UserProfile;
  const { data } = useQuery({
    queryKey: UserKeys.PROFILE,
    queryFn: async () => {
      const data = await userService.getUserProfile();
      return data;
    },
    initialData: initialUserData,
    // 5 秒内有效，一般来说，已经通过 loader 加载到了用户信息，5秒内不会重复加载
    staleTime: 1000,
  });

  return (
    <UserProfileProvider value={data}>
      <Outlet></Outlet>
    </UserProfileProvider>
  );
};
