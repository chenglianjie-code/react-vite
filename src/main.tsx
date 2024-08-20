import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/core";
import { ErrorBoundary } from "@sentry/react";
import { Exception } from "@/components";
// 浏览器支持检测组件
import { BrowserCompatibility } from "@/components/browser-compatibility";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// 路由配置
import { routes } from "./routes";
import "./index.css";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserCompatibility>
    <ErrorBoundary fallback={<Exception title="对不起，出现未知的错误" description="请联系管理员"></Exception>}>
      <ConfigProvider locale={zhCN}>
        <QueryClientProvider client={queryClient}>
          <React.StrictMode>
            <RouterProvider router={router}></RouterProvider>
          </React.StrictMode>
          <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
        </QueryClientProvider>
      </ConfigProvider>
    </ErrorBoundary>
  </BrowserCompatibility>
);
