import clsx from "clsx";
import { Input, Button, message } from "antd";
import { Navigate, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./index.module.less";
import { useAutoClearProfile } from "@/features/user";
import { useLogin, userService } from "@/features/user";

export default function Login() {
  useAutoClearProfile();
  const login = useLogin();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { unauthenticated?: boolean } | null;

  if (state?.unauthenticated) {
    // 如果 state 中包含 unauthenticated 的字段则弹出提示
    // WHY: ErrorBoundry 会多次抛出错误，导致如果在 ErrorBoundry 中提示的话会出现重复提示
    message.error("身份认证失效，请重新登录");
    return <Navigate to={location.pathname + location.search + location.hash} state={state} />;
  }
  return (
    <div className={styles["container"]}>
      <div className="flex h-full flex-row">
        <div className={styles["logo"]}></div>
        <div className={clsx(styles["form"], "flex flex-col items-center justify-center")}>
          <div className="w-4/5 max-w-[480px]">
            <div className="font-bold mb-4 text-4xl">账号密码登录</div>
            <div className="mb-4">
              <Input size="small" type="text" placeholder="请输入账号" />
            </div>
            <div className="mb-4">
              <Input size="small" type="text" placeholder="请输入密码" />
            </div>
            <div>
              <Button
                size="large"
                type="primary"
                className="w-full"
                loading={login.isPending}
                onClick={async () => {
                  const res = await login.mutateAsync({
                    phone: "18328385011",
                    password: "123456",
                  });
                  userService.setToken(`${res.token_type} ${res.access_token}`);
                  // 现在没有任何页面会提供 from 参数
                  // WHY: 页面中使用 history.back 回到上级页面，如果上级页面为登录页，此时用户会以为被踢出系统
                  // 使用 replace 仍不能解决这个问题，如果第一次加载页面时，Token 过期，此时会被自动踢回登录页
                  // 此时，登录页是一个页面，history.back 返回的还是登录页

                  // 统一交互规范基本要求，编辑/新增/详情，应该在新tab打开
                  // 基于以上原因，全部替换 history.back，统一使用 navigate 的方式，返回指定地址，避免该问题
                  const from = searchParams.get("from") ?? "";
                  navigate(from || "/", { replace: true });
                }}
              >
                进入系统
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
