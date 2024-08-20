import { FC } from 'react';
import { Exception } from './exception';
import forbiddenImage from './forbidden.svg';

export const Forbidden: FC = () => {
  return (
    <Exception
      image={forbiddenImage}
      title="权限不足"
      description="您暂无该页面查看的权限，请联系管理员"
    ></Exception>
  );
};
