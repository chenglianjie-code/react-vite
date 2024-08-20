/* eslint-disable @typescript-eslint/no-explicit-any */
import { IndexRouteObject, NonIndexRouteObject, defer } from "react-router-dom";
import { MenuIcon } from "@/components";
import { RootRoute, AuthenticationGuard } from "./layouts";
import { NotFound } from "./components";
import { MainLayout } from "./layouts";
import { queryClient } from "@/core";
import { UserKeys, userService } from "@/features/user";
// import type { MenuItemType } from "antd/es/menu/hooks/useItems";
/**
 * 自定义权限
 */
export enum MenuCustomAuthority {
  // 【调拨入库】：当【流程配置】选中“调拨签收流程2”，才可以看到【调拨入库】菜单
  调拨签收流程2 = "调拨签收流程2",
}

export interface NonIndexRouteConfigHandle {
  /**
   * 路由名称
   *
   * 会用在标签页标题和菜单标题中
   */
  name?: string;

  /**
   * 菜单配置
   */
  //   menu?: boolean | "group" | Omit<MenuItemType, "key">;
  menu?: boolean | "group" | Omit<any, "key">;

  /**
   * 路由权限配置
   */
  authority?: string | string[];

  /**
   * 自定义权限
   * eg:【调拨入库】：当【流程配置】选中“调拨签收流程2”，才有此权限
   */
  customAuthority?: MenuCustomAuthority;
}
export interface IndexRouteConfigHandle {
  /**
   * 路由名称
   *
   * 会用在标签页标题和菜单标题中
   */
  name?: string;
  /**
   * 菜单配置
   */
  //   menu?: boolean | Omit<MenuItemType, "key">;
  menu?: boolean | Omit<any, "key">;

  /**
   * 路由权限配置
   */
  authority?: string | string[];

  /**
   * 自定义权限
   * eg:【调拨入库】：当【流程配置】选中“调拨签收流程2”，才有此权限
   */
  customAuthority?: MenuCustomAuthority;
}
export interface IndexRouteConfig extends IndexRouteObject {
  handle?: IndexRouteConfigHandle;
}
export interface NonIndexRouteConfig extends NonIndexRouteObject {
  handle?: NonIndexRouteConfigHandle;
  children?: RouteConfig[];
}
export type RouteConfig = IndexRouteConfig | NonIndexRouteConfig;

export const routes: RouteConfig[] = [
  {
    element: <RootRoute />,
    children: [
      {
        path: "/user",
        async lazy() {
          const { default: Component } = await import("@/pages/login");
          return { Component };
        },
      },
      {
        path: "/",
        element: <AuthenticationGuard />,
        loader: () => {
          return defer({
            user: queryClient.fetchQuery({
              queryKey: UserKeys.PROFILE,
              queryFn: () => {
                return userService.getUserProfile();
              },
            }),
          });
        },
        // 只在第一次加载的时候才需要触发 loader，避免[一些场景下](https://reactrouter.com/en/main/route/should-revalidate)重复执行 loader 导致页面切换卡顿的问题
        shouldRevalidate: () => false,
        children: [
          {
            element: <MainLayout />,
            children: [
              // {
              //   index: true,
              //   element: <Navigate to="/dashboard" replace />,
              // },
              // {
              //   path: "dashboard",
              //   async lazy() {
              //     const { default: Component } = await import("@/pages/index");
              //     return { Component };
              //   },
              //   handle: {
              //     name: "首页",
              //   },
              // },
              {
                path: "/supply-chain",
                handle: {
                  name: "供应链",
                  menu: true,
                },
                children: [
                  {
                    path: "purchase-config",
                    handle: {
                      name: "采购配置",
                      menu: { icon: <MenuIcon type="icon-jichupeizhi" /> },
                    },
                    children: [
                      {
                        path: "config",
                        async lazy() {
                          const { default: Component } = await import("@/pages/supply-chain/config");
                          return { Component };
                        },
                        handle: {
                          name: "采购配置",
                          menu: true,
                          authority: "purchase_custom_edit",
                        },
                      },
                      // {
                      //   path: "custom-category",
                      //   async lazy() {
                      //     const { default: Component } = await import("./purchasing-config/custom-category");
                      //     return { Component };
                      //   },
                      //   handle: {
                      //     name: "自定义分类",
                      //     menu: true,
                      //     authority: CustomCategoryPermissions.READ,
                      //   },
                      // },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "/*",
        element: <NotFound />,
      },
    ],
  },
];
