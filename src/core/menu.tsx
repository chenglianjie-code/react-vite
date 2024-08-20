import { MenuCustomAuthority } from "@/layouts/authorization/custom-authorization";
import type { MenuItemGroupType, MenuItemType, SubMenuType } from "antd/es/menu/interface";
import { atom, useAtom } from "jotai";
import { Link, LinkProps, useMatch } from "react-router-dom";
import { RouteConfig } from "./route";

export type MenuItemAware = {
  path?: string;
  authorities?: string[];
  children?: MenuItemAware[];
};

export interface MenuItem extends MenuItemType {
  path?: string;
  authorities?: string[];
  children: undefined;
  customauthority?: MenuCustomAuthority;
}

export interface SubMenu extends SubMenuType {
  path?: string;
  children: Array<MenuConfig>;
  authorities?: string[];
  customauthority?: MenuCustomAuthority;
}

export interface MenuItemGroup extends MenuItemGroupType {
  children: Array<MenuConfig>;
  authorities?: string[];
  customauthority?: MenuCustomAuthority;
}

export type MenuConfig = MenuItem | SubMenu | MenuItemGroup;

function toArray(value?: string | string[]): string[] {
  return value == null ? [] : Array.isArray(value) ? value : [value];
}

export function* generateMenus(routes: RouteConfig[], basePath = "/"): Generator<MenuConfig> {
  for (const route of routes) {
    const path = (basePath + (route.path ?? ""))
      // 移除多余的起始斜杠，只保留1个
      .replace(/^\/+/, "/")
      // 移除末尾斜杆
      .replace(/\/+$/, "");

    let menuItem: MenuConfig | undefined;

    // 路由配置中包含菜单字段的才认为可能是菜单
    if (route.handle && "menu" in route.handle) {
      if (route.handle.menu === "group") {
        menuItem = {
          key: path + (!route.path ? "$group" : ""),
          type: "group",
          label: route.handle.name,
          path,
          children: [],
          authorities: toArray(route.handle.authority),
          customauthority: route.handle.customAuthority,
        } satisfies MenuItemGroup & MenuItemAware;
      } else if (route.handle.menu) {
        const menu = typeof route.handle.menu === "boolean" ? {} : route.handle.menu;

        menuItem = {
          key: path + (!route.path ? "$submenu" : ""),
          label: menu.label ?? route.handle.name,
          path,
          icon: menu.icon,
          children: void 0,
          authorities: toArray(route.handle.authority),
          customauthority: route.handle.customAuthority,
        } satisfies MenuConfig & MenuItemAware;
      }
    }

    // 没有子路由就可以结束了
    if (menuItem && !route.children) {
      menuItem.label = <ReloadableLink to={path}>{menuItem.label ?? route.handle?.name}</ReloadableLink>;
      yield menuItem;
      continue;
    }

    if (!route.children) {
      continue;
    }

    const menusGenerator = generateMenus(route.children, path + "/");

    // 当前路由配置不是菜单的话，那就把子路由的菜单项当作这一级的子菜单
    if (!menuItem) {
      yield* menusGenerator;
      continue;
    }

    const subMenus = Array.from(menusGenerator);

    if (subMenus.length) {
      (menuItem as SubMenu | MenuItemGroup).children = subMenus;
    } else {
      menuItem.label = <ReloadableLink to={path}>{menuItem.label ?? route.handle?.name}</ReloadableLink>;
    }

    yield menuItem;
  }
}

export const menusAtom = atom<MenuConfig[]>([]);

export const useMenus = () => {
  return useAtom(menusAtom);
};

interface ReloadableLinkProps extends Omit<LinkProps, "to"> {
  to: string;
}

/**
 * 实现点击菜单刷新的功能
 *
 * 只有在当前页面的情况下才会触发刷新，否则还是正常的路由跳转逻辑
 */
const ReloadableLink = (props: ReloadableLinkProps) => {
  const match = useMatch(props.to);

  return (
    <Link
      {...props}
      onClick={() => {
        if (!match) {
          return;
        }

        window.location.reload();
      }}
    ></Link>
  );
};
