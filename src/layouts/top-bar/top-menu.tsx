// import { Menu, MenuProps } from "antd";
import { FC } from "react";

// import S from "./top-menu.module.less";

export const TopMenu: FC = () => {
  // const [menus] = useMenus();

  // const topMenus = useMemo<MenuProps["items"]>(() => {
  //   // 这里将顶部菜单的子菜单改成 group 的样式，而不是 SubMenu 的样式
  //   return menus.map<MenuItem | SubMenu>((menuItem) => {
  //     if ("children" in menuItem && menuItem.children) {
  //       const subMenuItems = menuItem.children.map((subMenuItem) => {
  //         return {
  //           ...subMenuItem,
  //           type: "group",
  //         };
  //       });

  //       return {
  //         ...menuItem,
  //         children: subMenuItems,
  //       } as SubMenu;
  //     } else {
  //       return menuItem as MenuItem;
  //     }
  //   });
  // }, [menus]);

  // const activeMenus = useActiveMenus(menus);

  return (
    <div className="flex-auto">
      top menu
      {/* <Menu rootClassName={S.override} theme="dark" mode="horizontal" selectedKeys={activeMenus} items={topMenus} /> */}
    </div>
  );
};
