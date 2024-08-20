/**
 * 分页描述
 */
export interface PageLink {
  active: boolean;
  label: string;
  url: string | null;
}

/**
 * 分页元数据
 */
export interface PageMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
  /**
   * 用于分页时的的总数
   *
   * ES 之类的搜索引擎有最大分页限制，这个字段用来计算分页数
   */
  page_total: number;
}

/**
 * 分页数据
 */
export interface Page<TData> {
  data: TData[];
  meta: PageMeta;
  links: PageLink[];
}

export interface PaginationDto {
  /**
   * 页码
   */
  page: number;
  /**
   * 分页大小
   */
  per_page?: number;
}

/**
 * 主键
 */
export type PrimaryKey = number;

/**
 * ISO8601时间格式的字符串
 *
 * @example '1970-01-01T00:00:00.000Z'
 */
export type ISO8601String = string;

/**
 * 本地时间的字符串
 *
 * @example '1970-01-01 00:00:00'
 */
export type LocalDateString = string;

/**
 * JSON 字符串
 */
export type JSONString = string;

/**
 * Comma-Separated Values，逗号分隔的值
 */
export type CSVString = string;

/**
 * Base64 编码的字符串
 */
export type Base64String = string;

export enum BooleanNumber {
  True = 1,
  False = 0,
}

export interface Pagination {
  /**
   * 页码
   */
  pageNumber: number;

  /**
   * 条数
   */
  pageSize?: number;
}

export type Pageable<T> = T & Pagination;

export type Nullable<T> = T | null;

export type Nullish<T> = T | null | undefined;

export type WithId<T, TIdName extends string = 'id'> = T & {
  [K in any as TIdName]: PrimaryKey;
};

/**
 * 各种选项的通用类型定义
 */
export interface Option<T extends PrimaryKey | string = PrimaryKey> {
  id: T;
  /**
   * 名称
   */
  title: string;
  /**
   * 是否启用
   */
  enabled?: boolean;
}
export interface Options {
  value: PrimaryKey | string;
  /**
   * 名称
   */
  label: string;
  /**
   * 是否启用
   */
  disabled?: boolean;
}

export type NumberRangeTuple = [
  number | null | undefined,
  number | null | undefined,
];

/**
 * 带颜色属性的选项
 */
export interface ColorfulOption {
  id: PrimaryKey;
  /**
   * 名称
   */
  title: string;
  /**
   * 选项颜色
   */
  color: string;
}

export interface LogsResponseData {
  id: PrimaryKey;
  // 操作属性id
  action_id: number;
  // 操作属性名称
  action_desc: string;
  // 日志内容
  description: string;

  model_id: string;
  operator_user_id: number;
  // 操作人名称
  operator_user_name: string;
  // 操作人外部代号
  operator_user_number: string;
  created_at_gmt: ISO8601String;
  updated_at_gmt: ISO8601String;
}
