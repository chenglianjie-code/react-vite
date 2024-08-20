import { atom, useAtom } from "jotai";
// import { Link, LinkProps, useMatch } from "react-router-dom";
// import { RouteConfig } from "./route";

export type MenuItemAware = {
  path?: string;
  authorities?: string[];
  children?: MenuItemAware[];
};

// export interface MenuItem extends MenuItemType {
//   path?: string;
//   authorities?: string[];
//   children: undefined;
//   customauthority?: MenuCustomAuthority;
// }

// export interface SubMenu extends SubMenuType {
//   path?: string;
//   children: Array<MenuConfig>;
//   authorities?: string[];
//   customauthority?: MenuCustomAuthority;
// }

// export interface MenuItemGroup extends MenuItemGroupType {
//   children: Array<MenuConfig>;
//   authorities?: string[];
//   customauthority?: MenuCustomAuthority;
// }

// export type MenuConfig = MenuItem | SubMenu | MenuItemGroup;
export type MenuConfig = any;

export const menusAtom = atom<MenuConfig[]>([]);

export const useMenus = () => {
  return useAtom(menusAtom);
};
