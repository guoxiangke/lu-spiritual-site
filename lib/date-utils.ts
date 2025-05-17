/**
 * 获取UTC+8时区的当前日期
 * @returns 返回UTC+8时区的Date对象
 */
export function getUTC8Date(): Date {
  // 获取当前UTC时间
  const now = new Date()

  // 获取UTC时间的毫秒数
  const utcTime = now.getTime()

  // 获取当前时区与UTC的时差（分钟）
  const localTimezoneOffset = now.getTimezoneOffset()

  // UTC+8时区比UTC快8小时，即480分钟
  const utc8TimezoneOffset = -480

  // 计算本地时区与UTC+8的时差（毫秒）
  const offsetMillis = (localTimezoneOffset - utc8TimezoneOffset) * 60 * 1000

  // 调整时间到UTC+8
  const utc8Time = utcTime + offsetMillis

  // 创建新的Date对象
  return new Date(utc8Time)
}

/**
 * 获取UTC+8时区的当前日期（只包含年月日，不包含时分秒）
 * @returns 返回UTC+8时区的Date对象，时间部分被设置为0
 */
export function getUTC8DateOnly(): Date {
  const utc8Date = getUTC8Date()
  // 创建一个新的日期对象，只包含年月日
  return new Date(utc8Date.getFullYear(), utc8Date.getMonth(), utc8Date.getDate())
}

/**
 * 格式化日期为MMDD格式
 * @param month 月份（1-12）
 * @param day 日期（1-31）
 * @returns 格式化后的字符串，如"0101"
 */
export function formatDateMMDD(month: number, day: number): string {
  return `${month.toString().padStart(2, "0")}${day.toString().padStart(2, "0")}`
}

/**
 * 检查日期是否在未来（基于UTC+8时区）
 * 注意：这个函数会将传入的日期与当前日期进行比较，如果传入的日期大于当前日期，则认为是未来日期
 * @param year 年份
 * @param month 月份（1-12）
 * @param day 日期
 * @returns 如果日期在未来则返回true，否则返回false
 */
export function isFutureDateUTC8(year: number, month: number, day: number): boolean {
  // 获取UTC+8的当前日期（只包含年月日）
  const utc8Today = getUTC8DateOnly()

  // 创建要检查的日期（只包含年月日）
  const dateToCheck = new Date(year, month - 1, day)

  // 比较日期，如果dateToCheck大于utc8Today，则是未来日期
  return dateToCheck > utc8Today
}

/**
 * 检查日期是否是今天（基于UTC+8时区）
 * @param year 年份
 * @param month 月份（1-12）
 * @param day 日期
 * @returns 如果日期是今天则返回true，否则返回false
 */
export function isTodayUTC8(year: number, month: number, day: number): boolean {
  const utc8Now = getUTC8Date()
  return day === utc8Now.getDate() && month === utc8Now.getMonth() + 1 && year === utc8Now.getFullYear()
}

/**
 * 获取UTC+8时区的当前日期的MMDD格式
 * @returns 当前日期的MMDD格式字符串
 */
export function getCurrentDateMMDD(): string {
  const utc8Now = getUTC8Date()
  const month = utc8Now.getMonth() + 1
  const day = utc8Now.getDate()
  return formatDateMMDD(month, day)
}
