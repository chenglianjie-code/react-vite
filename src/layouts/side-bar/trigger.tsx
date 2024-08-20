import { MenuIcon } from '@/components';
import { Menu } from 'antd';
import { FC } from 'react';

import clsx from 'clsx';
import S from './side-menu.module.less';

export interface TriggerProps {
  collapsed: boolean; // 左侧面板状态 展开(true) or 折叠(false)
  onToggle?: (collapsed: boolean) => void;
}

export const Trigger: FC<TriggerProps> = (props) => {
  return (
    <Menu
      mode="inline"
      className="flex-none pt-2"
      rootClassName={clsx(S.override, S.trigger)}
      items={[
        {
          key: 'toggle',
          label: props.collapsed ? '展开面板' : '折叠面板',
          icon: props.collapsed ? (
            <MenuIcon type="icon-cebiandaohang-zhankai" />
          ) : (
            <MenuIcon type="icon-cebiandaohang-shouqi" />
          ),
        },
      ]}
      selectable={false} // 是否允许选中
      onClick={() => {
        props.onToggle?.(!props.collapsed);
      }}
      inlineIndent={12}
    />
  );
};
