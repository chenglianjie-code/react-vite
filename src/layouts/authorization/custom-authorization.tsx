// import { SystemSettings } from '@/features/storage';

/**
 * 自定义权限
 */
export enum MenuCustomAuthority {
  // 【调拨入库】：当【流程配置】选中“调拨签收流程2”，才可以看到【调拨入库】菜单
  调拨签收流程2 = "调拨签收流程2",
}

export const checkCustomAuthority = (authority: MenuCustomAuthority, data?: unknown) => {
  switch (authority) {
    case MenuCustomAuthority.调拨签收流程2:
      return checkTransferInbound(data);
    // 后续如果有新的自定义权限，可以在这里添加
    default:
      return false;
  }
};

/**
 * 检查调拨入库权限
 * @param data 仓库配置
 * @returns true：有权限，false：无权限
 */
const checkTransferInbound = (data) => {
  if (!data) {
    return false;
  }
  return data.transfer_work_flow === 2;
};
