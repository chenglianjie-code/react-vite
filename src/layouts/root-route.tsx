import { FC, useEffect } from "react";
import debug from "debug";
import { Outlet } from "react-router-dom";
import { QueryErrorResetBoundary } from "@tanstack/react-query";

const log = debug("router");

export const RootRoute: FC = () => {
  useEffect(() => {
    log("渲染根路由组件");
  }, []);

  return (
    <QueryErrorResetBoundary>
      <Outlet></Outlet>
    </QueryErrorResetBoundary>
  );
};
