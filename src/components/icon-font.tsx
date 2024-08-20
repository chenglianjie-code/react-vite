import { createFromIconfontCN } from "@ant-design/icons";
import { ComponentProps, FC } from "react";

export const IconFont = createFromIconfontCN({
  scriptUrl: "//",
});

export const MenuIcon: FC<ComponentProps<typeof IconFont>> = (props) => (
  <IconFont style={{ fontSize: 20 }} {...props} />
);
