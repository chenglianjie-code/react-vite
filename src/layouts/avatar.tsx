import { Avatar, AvatarProps } from "antd";
import clsx from "clsx";
import { FC } from "react";

export const UserAvatar: FC<AvatarProps> = (props) => {
  return <Avatar {...props} className={clsx("bg-white", props.className)} src={props.src} />;
};
