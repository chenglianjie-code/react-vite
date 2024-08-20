import { Layout } from "antd";
import clsx from "clsx";
import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { SideBar } from "./side-bar";
import { TopBar } from "./top-bar";
import { useMyAuthorities } from "@/features/user";
import { Forbidden } from "@/components";
import { useRouteConfig, generateMenus, useMenus } from "@/core";
import { filterTreeNodes } from "@/utils";
import S from "./main-layout.module.less";
// import { checkCustomAuthority } from './authorization/custom-authorization';

export const MainLayout: FC = () => {
  const [routes] = useRouteConfig();
  const [menus, setMenus] = useMenus();
  const authorities = useMyAuthorities();
  console.log("变化之后又骂menus", menus);
  useEffect(() => {
    const menus = Array.from(generateMenus(routes));
    const authorizedMenus = filterTreeNodes(
      menus,
      (menu) => {
        if (!menu.authorities?.length) {
          return true;
        }
        const authorized = !!authorities?.some((name) => {
          return !!menu.authorities?.includes(name);
        });
        // 新增自定义权限校验
        // if (menu?.customauthority) {
        //   const customAuthorized = checkCustomAuthority(menu.customauthority, systemSettings);
        //   return authorized && customAuthorized;
        // }
        return authorized;
      },
      { treeShaking: true }
    );
    console.log("authorizedMenus", authorizedMenus);
    setMenus(authorizedMenus);
  }, [routes, setMenus, authorities]);
  const authorized = true;
  return (
    <Layout className={clsx("h-full", S.override)}>
      {/* 版本更新通知 */}
      {/* <VersionNotification></VersionNotification> */}
      <Layout.Header>
        <TopBar></TopBar>
      </Layout.Header>
      <Layout className="flex-row">
        <SideBar />
        {authorized ? (
          <Outlet></Outlet>
        ) : (
          <Layout.Content className="h-full">
            <Forbidden></Forbidden>
          </Layout.Content>
        )}
      </Layout>
    </Layout>
  );
};
