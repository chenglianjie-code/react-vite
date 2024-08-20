import { Button } from "antd";
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Exception } from "./exception";
import notfoundImage from "./notfound.svg";

export interface NotFoundProps {
  description?: string;
  action?: ReactNode;
}

export const NotFound: FC<NotFoundProps> = (props) => {
  return (
    <Exception
      image={notfoundImage}
      title={<span className="text-7xl">404</span>}
      description="对不起，您访问的页面不存在"
      action={
        <Link to="/user">
          <Button type="primary">回到首页</Button>
        </Link>
      }
      {...props}
    ></Exception>
  );
};
