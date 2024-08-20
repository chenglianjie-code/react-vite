import { useMemo } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { MenuConfig } from "./menu";
import { useMenus } from "@/core";

export const useSideMenus = (): MenuConfig[] => {
  const [menus] = useMenus();
  const location = useLocation();
  const activeTopMenu = useMemo(() => {
    const result = menus.find((menu) => {
      if (!("path" in menu)) {
        return false;
      }

      return isMatchPath(menu, location.pathname);
    });

    return result;
  }, [menus, location]);

  if (!activeTopMenu) {
    return [];
  }

  if (!("children" in activeTopMenu)) {
    return [];
  }

  return activeTopMenu.children ?? [];
};

export const useActiveMenus = (menus: MenuConfig[]) => {
  const location = useLocation();

  const activeMenus = useMemo(
    () => Array.from(generateActiveMenu(menus, location.pathname)).map((menu) => menu.key as string),
    [menus, location]
  );

  return activeMenus;
};

function* generateActiveMenu(menus: MenuConfig[], pathname: string): Generator<MenuConfig | any> {
  for (const menu of menus) {
    if (!("path" in menu)) {
      continue;
    }

    if (!isMatchPath(menu, pathname)) {
      continue;
    } else {
      yield menu;
    }

    if (!("children" in menu)) {
      continue;
    }

    if (!menu.children) {
      continue;
    }

    const menus = generateActiveMenu(menu.children, pathname);
    yield* menus;
  }
}

function isMatchPath(menu: MenuConfig, pathname: string) {
  if (!("path" in menu)) {
    return false;
  }

  if (!menu.path) {
    return false;
  }

  const match = matchPath({ path: menu.path, end: false }, pathname);

  return !!match;
}
