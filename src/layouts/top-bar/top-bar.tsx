import { Button, Dropdown, MenuProps, Tooltip } from "antd";
import { FC } from "react";
import { IconFont } from "@/components";
import { Brand, Logo } from "./brand";
import logoImage from "./logo.png";
import { TopMenu } from "./top-menu";
import { UserAvatar } from "../avatar";

const enum UserMenuKey {
  ChangePassword = "changepassword",
  Logout = "logout",
}

const menuItems: MenuProps["items"] = [
  {
    key: UserMenuKey.ChangePassword,
    label: "修改密码",
  },
  {
    key: UserMenuKey.Logout,
    label: "安全退出",
  },
];
/**
 * 边栏宽度
 */
export const SIDER_WIDTH = 170;

/**
 * 收起后的边栏宽度
 */
export const COLLAPSED_SIDER_WIDTH = 60;
export const TopBar: FC = () => {
  const onClickUserMenu: MenuProps["onClick"] = () => {
    // switch (info.key) {
    //   case UserMenuKey.ChangePassword:
    //     onChangePassword();
    //     break;
    //   case UserMenuKey.Logout:
    //     onLogout();
    //     break;
    //   default:
    //     console.warn("未知的用户菜单项");
    //     break;
    // }
  };
  const a: string = "false";
  const b = "false3";
  const brandAreaWidth = b === a ? COLLAPSED_SIDER_WIDTH : SIDER_WIDTH;

  return (
    <div className="-ml-5 flex items-center text-white">
      <div className="overflow-hidden pl-4 transition-all duration-200" style={{ width: brandAreaWidth }}>
        <Brand small={false} logo={<Logo src={logoImage} />}>
          PPP
        </Brand>
      </div>
      <TopMenu />
      <div className="mr-5 flex items-center gap-4">
        <Tooltip placement="bottom" title="水印管理">
          <Button
            type="text"
            size="small"
            icon={<IconFont type="icon-shuiyinguanli" className="!text-xl text-white"></IconFont>}
            onClick={() => {}}
          ></Button>
        </Tooltip>

        <Tooltip placement="bottom" title="打印插件下载">
          <Button
            aria-label="下载打印插件"
            type="link"
            size="small"
            icon={<IconFont type="icon-fujian" className="!text-xl text-white hover:text-white"></IconFont>}
          ></Button>
        </Tooltip>
      </div>
      <div className="flex items-center">
        <Dropdown trigger={["click"]} menu={{ items: menuItems, onClick: onClickUserMenu }}>
          <div className="inline-flex cursor-pointer items-center">
            <UserAvatar />
            <div className="ml-2 max-w-[128px] overflow-hidden text-ellipsis whitespace-nowrap">{"jimmy"}</div>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};
