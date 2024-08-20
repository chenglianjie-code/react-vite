import axios from "axios";
import { PasswordCredentialDto, TokenDto, UserProfile } from "./user.dto";

export class UserService {
  private TOKEN_KEY = "token";

  /**
   * 登录
   * @param dto 用户密码凭证
   * @returns
   */
  async login(dto: PasswordCredentialDto): Promise<TokenDto> {
    // 模拟接口
    return new Promise(function (resolve) {
      setTimeout(() => {
        resolve({
          token_type: "Bearer",
          expires_in: "54225",
          access_token: "access_token",
          refresh_token: "refresh_token",
        });
      }, 3000);
    });
    const { data } = await axios.post<TokenDto>("api/login", dto);
    return data;
  }

  /**
   * 获取用户信息
   * @returns 用户信息
   */
  async getUserProfile(): Promise<UserProfile> {
    // 模拟接口
    return new Promise(function (resolve) {
      setTimeout(() => {
        resolve({
          id: 9530,
          name: "胡碧波",
          phone: "18384259431",
          number: "009530",
          is_publish: 1,
          email: "130@qq.com",
          is_watermark: 1,
          permissions: ["purchase_custom_edit"],
        });
      }, 500);
    });
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_KEY) || "";
  }

  /**
   * 获取 Token 的元信息，去除了签名部分
   * @returns
   */
  getTokenMeta() {
    const token = this.getToken();
    if (!token) {
      return;
    }
    const [header, payload] = token.split(".");
    return [header, payload].join(".");
  }

  clearToken() {
    this.setToken("");
  }
}

export const userService = new UserService();
