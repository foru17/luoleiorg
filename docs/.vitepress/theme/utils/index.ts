export function formatDate(d: any, fmt = "yyyy-MM-dd hh:mm:ss") {
  if (!(d instanceof Date)) {
    d = new Date(d);
  }
  const o: any = {
    "M+": d.getMonth() + 1, // 月份
    "d+": d.getDate(), // 日
    "h+": d.getHours(), // 小时
    "m+": d.getMinutes(), // 分
    "s+": d.getSeconds(), // 秒
    "q+": Math.floor((d.getMonth() + 3) / 3), // 季度
    S: d.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      `${d.getFullYear()}`.substr(4 - RegExp.$1.length),
    );
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length),
      );
  }
  return fmt;
}

export function getFaviconUrl(domain: string) {
  return `https://img.is26.com/https://static.is26.com/favicon/${domain}/w=32`;
}

export function getOriginalImage(url: string) {
  return `https://img.is26.com/${url}`;
}

export function getPreviewImage(url: string) {
  return `https://img.is26.com/${url}/w=800`;
}

export function getBannerImage(url: string) {
  return `https://img.is26.com/${url}/w=800`;
}

export function getArticleLazyImage(url: string) {
  return `https://img.is26.com/${url}/w=1200`;
}

export function getArticleBlurImage(url: string) {
  return `https://img.is26.com/${url}/w=800,blur=10`;
}

export function getFormatNumber(num: number) {
  // 给数字加上逗号分隔符，例如：12345678 => 12,345,678
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function isCurrentWeek(date: Date, target?: Date) {
  const now = target || new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const oneDay = 1000 * 60 * 60 * 24;
  const nowWeek = today.getDay();
  // 本周一的时间
  const startWeek =
    today.getTime() - (nowWeek === 0 ? 6 : nowWeek - 1) * oneDay;
  return +date >= startWeek && +date <= startWeek + 7 * oneDay;
}

export function formatShowDate(date: Date | string) {
  const source = date ? +new Date(date) : +new Date();
  const now = +new Date();
  const diff = now - source > 0 ? now - source : 60 * 1000;
  const oneSeconds = 1000;
  const oneMinute = oneSeconds * 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;
  const oneWeek = oneDay * 7;
  const oneMonth = oneDay * 30;
  const oneYear = oneDay * 365;
  // if (diff < oneMinute) {
  //   return `${Math.floor(diff / oneSeconds)}秒前`;
  // }
  // if (diff < oneHour) {
  //   return `${Math.floor(diff / oneMinute)}分钟前`;
  // }
  if (diff < oneDay) {
    return `今天`;
  }
  if (diff < oneWeek) {
    return `${Math.floor(diff / oneDay)}天前`;
  }
  if (diff < oneMonth) {
    return `${Math.floor(diff / oneWeek)}周前`;
  }
  if (diff < oneYear) {
    const months = Math.floor(diff / oneMonth);
    if (months > 0) {
      return `${months}月前`;
    }
  }

  const years = Math.floor(diff / oneYear);
  if (years > 0 && years < 3) {
    return `${years}年前`;
  } else {
    return formatDate(new Date(date), "yyyy-MM-dd");
  }
}
