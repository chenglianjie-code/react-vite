import { useSideMenus } from "../menu.hook";
import { Layout } from "antd";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { FC } from "react";
import { SideMenu } from "./side-menu";
import { Trigger } from "./trigger";

/**
 * 按电脑记住收起状态
 */
const collapsedAtom = atomWithStorage("sidebar.collapsed", false);

export const SideBar: FC = () => {
  const [collapsed, setCollapsed] = useAtom(collapsedAtom);
  const menus = useSideMenus();
  if (menus.length === 0) {
    return null;
  }

  return (
    <Layout.Sider theme="light" collapsed={collapsed} width={170} collapsedWidth={60}>
      <div className="flex flex-col h-full">
        <Trigger
          collapsed={collapsed}
          onToggle={() => {
            setCollapsed((value) => !value);
          }}
        />
        <SideMenu menus={menus} collapsed={collapsed} />
      </div>
    </Layout.Sider>
  );
};
