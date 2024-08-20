// import { MenuItemAware, useMenus } from "@/core";
// import { useMyAuthorities } from "@/features/user";
// import { useMemo } from "react";
import { Navigate } from "react-router-dom";

export default function IndexPage() {
  // const [menus] = useMenus();
  // const authorities = useMyAuthorities();
  // const firstPage = useMemo(() => {
  //   /**
  //    * 从菜单列表中找出第一个已授权的页面
  //    *
  //    * TODO: 这里应该使用所有路由来查找
  //    * @param menus 菜单列表
  //    * @returns
  //    */
  //   const getFirstAuthorizedPage = (menus: MenuItemAware[]): string | undefined => {
  //     for (const menu of menus) {
  //       if (menu.path === "/") {
  //         continue;
  //       }

  //       if (
  //         menu.authorities?.length &&
  //         // 用户权限不满足路由权限的要求
  //         menu.authorities.some((authority) => authorities?.every((name) => name !== authority))
  //       ) {
  //         continue;
  //       }

  //       if (!menu.children?.length) {
  //         return menu.path;
  //       }

  //       const path = getFirstAuthorizedPage(menu.children);

  //       if (!path) {
  //         continue;
  //       }

  //       return path;
  //     }
  //   };

  //   return getFirstAuthorizedPage(menus) ?? "/forbidden";
  // }, [menus, authorities]);

  return <Navigate to={"/supply-chain/purchase-config/config"} />;
}
