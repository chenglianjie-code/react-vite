import { Result } from 'antd';
import { FC, PropsWithChildren, useEffect } from 'react';
import chromeImage from './chrome.png';
import edgeImage from './edge.png';
import firefoxImage from './firefox.png';

/**
 * 浏览器版本兼容列表的正则表达式
 *
 * 兼容一下浏览器版本（Nx 默认支持的浏览器版本）
 * | Browser | Version |
 * | ------- | ------- |
 * | chrome  | 61      |
 * | edge    | 16      |
 * | firefox | 60      |
 * | ios     | 10.3    |
 * | node    | 13.2    |
 * | opera   | 48      |
 * | safari  | 11      |
 * | samsung | 8.2     |
 *
 * 使用 [browserslist-useragent-regexp](https://www.npmjs.com/package/browserslist-useragent-regexp) 根据根目录的 .browserslistrc 配置文件使用以下生成
 *
 * ```sh
 * pnpm dlx browserslist-useragent-regexp --allowHigherVersions
 * ```
 */
const browsersRegex =
  /Edge?\/(1[6-9]|[2-9]\d|\d{3,})(\.\d+|)(\.\d+|)|Firefox\/([6-9]\d|\d{3,})\.\d+(\.\d+|)|Chrom(ium|e)\/(6[1-9]|[7-9]\d|\d{3,})\.\d+(\.\d+|)([\d.]+$|.*Safari\/(?![\d.]+ Edge\/[\d.]+$))|Maci.+ Version\/(1[1-9]|[2-9]\d|\d{3,})\.\d+([,.]\d+|)( \(\w+\)|)( Mobile\/\w+|) Safari\/|Chrome.+OPR\/(4[89]|[5-9]\d|\d{3,})\.\d+\.\d+|(CPU[ +]OS|iPhone[ +]OS|CPU[ +]iPhone|CPU IPhone OS|CPU iPad OS)[ +]+(10[._]([3-9]|\d{2,})|(1[1-9]|[2-9]\d|\d{3,})[._]\d+)([._]\d+|)|SamsungBrowser\/(8\.([2-9]|\d{2,})|(9|\d{2,})\.\d+)/;

const isSupportedBrowsers = browsersRegex.test(navigator.userAgent);

export const BrowserCompatibility: FC<PropsWithChildren> = (props) => {
  useEffect(() => {
    if (isSupportedBrowsers) {
      return;
    }

    console.warn('对不起，暂不支持您当前所使用的浏览');
  }, []);

  if (isSupportedBrowsers) {
    return props.children;
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Result
        title="对不起，暂不支持您当前所使用的浏览器"
        subTitle={
          <div className="mt-8">
            <div>为了您能够获得完整的功能体验，请下载最新的浏览器</div>
            <div className="mt-8 flex items-end justify-center">
              <Browser
                href="https://www.microsoft.com/zh-cn/edge/download"
                icon={edgeImage}
              >
                微软浏览器
              </Browser>
              <Browser
                href="https://www.google.com/intl/zh-CN/chrome/"
                icon={chromeImage}
              >
                谷歌浏览器
              </Browser>
              <Browser href="https://www.firefox.com.cn/" icon={firefoxImage}>
                火狐浏览器
              </Browser>
            </div>
          </div>
        }
      ></Result>
    </div>
  );
};

interface BrowserProps {
  icon: string;
  href: string;
}

const Browser: FC<PropsWithChildren<BrowserProps>> = (props) => {
  return (
    <div className="ml-16 flex flex-col items-center first:ml-0">
      <a href={props.href}>
        <img
          className="h-16 w-16 object-contain"
          src={props.icon}
          alt="浏览器图标"
        />
      </a>
      <div className="mt-4 text-gray-900">{props.children}</div>
    </div>
  );
};
