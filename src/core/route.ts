import { UserProfile } from "@/features/user";
import { MenuCustomAuthority } from "@/layouts/authorization/custom-authorization";
import type { MenuItemType } from "antd/es/menu/interface";
import { atom, useAtom } from "jotai";
import { IndexRouteObject, NonIndexRouteObject } from "react-router-dom";
import { routes } from "../routes";

export const routesAtom = atom<RouteConfig[]>(routes);

export const useRouteConfig = () => useAtom(routesAtom);

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
  menu?: boolean | Omit<MenuItemType, "key">;

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
  menu?: boolean | "group" | Omit<MenuItemType, "key">;

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

export interface NonIndexRouteConfig extends NonIndexRouteObject {
  handle?: NonIndexRouteConfigHandle;
  children?: RouteConfig[];
}

export type RouteConfig = IndexRouteConfig | NonIndexRouteConfig;

export type RouteConfigHandle = IndexRouteConfigHandle | NonIndexRouteConfigHandle;

export interface LoaderData {
  user: UserProfile;
}
