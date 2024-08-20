import { Button } from "antd";
import { FC } from "react";

import { Exception } from "@/components";

export const AuthenticationFailed: FC = () => {
  const action = <RefreshButton></RefreshButton>;
  return <Exception title="发生未知错误" description={"发生错误了"} action={action}></Exception>;
};

export const RefreshButton: FC = () => {
  return (
    <Button
      type="primary"
      onClick={() => {
        window.location.reload();
      }}
    >
      刷新
    </Button>
  );
};
