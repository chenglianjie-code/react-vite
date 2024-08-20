export interface PasswordCredentialDto {
  phone: string;

  password: string;
}

export interface TokenDto {
  /**
   * Token 类型
   */
  token_type: string;
  /**
   * 过期时间
   */
  expires_in: string;
  /**
   * Token
   */
  access_token: string;
  /**
   * 刷新 Token 时效
   */
  refresh_token: string;
}
export interface UserProfile {
  id: number;
  /**
   * 用户名称
   */
  name: string;
  /**
   * 手机号码
   */
  phone: string;
  /**
   * 邮箱
   */
  email: string;
  /**
   * 外部代号
   */
  number: string;
  /**
   * 是否在职
   */
  is_publish: number;
  /**
   * 是否显示水印
   */
  is_watermark: number;
  /**
   * 权限
   *
   * 包含当前用户所拥有权限的权限码集合
   */
  permissions?: string[];
  /**
   * 所属部门
   */
  // departments: Department[];
  /**
   * 用户偏好设置
   */
  // settings: UserPreference;
}
