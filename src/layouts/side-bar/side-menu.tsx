import { Menu } from "antd";
import { FC, useEffect, useMemo, useState } from "react";

import { useActiveMenus } from "../menu.hook";
import S from "./side-menu.module.less";

export interface SideMenuProps {
  collapsed?: boolean;
  menus: any[];
}

export const SideMenu: FC<SideMenuProps> = (props) => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const activeMenus = useActiveMenus(props.menus);

  const menusWithOffset = useMemo(() => {
    return props.menus.map((item) => {
      if ("children" in item) {
        return {
          ...item,
          popupOffset: [8, 0],
        } as any;
      }

      return item;
    });
  }, [props.menus]);

  useEffect(() => {
    if (props.collapsed) {
      return;
    }

    // 要等展开的动画走完了以后再切换，否则动画会有问题
    setTimeout(() => {
      setOpenKeys((keys) => [...new Set([...keys, ...activeMenus])]);
    }, 300);
  }, [activeMenus, props.collapsed]);

  return (
    <Menu
      rootClassName={S.override}
      className="flex-auto w-full overflow-auto overflow-x-hidden"
      selectedKeys={activeMenus}
      openKeys={openKeys}
      onOpenChange={(keys) => {
        setOpenKeys(keys);
      }}
      mode="inline"
      items={menusWithOffset}
      inlineIndent={12}
    />
  );
};
