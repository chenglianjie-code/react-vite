import { createContext, useContext } from "react";
import { UserProfile } from "./user.dto";

export const UserProfileContext = createContext<UserProfile | null>(null);

export function useUserProfile(optional?: boolean): UserProfile;
export function useUserProfile(optional: true): UserProfile | null;
export function useUserProfile(optional?: boolean): UserProfile | null {
  const profile = useContext(UserProfileContext);

  if (profile) {
    return profile;
  }

  if (!optional) {
    console.error("请先获取用户信息");
    // throw "请先获取用户信息";
  }

  return null;
}

export const UserProfileProvider = UserProfileContext.Provider;
