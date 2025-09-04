import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

// 定义 Location 接口
interface Location {
    addressLine1?: string;
    addressLine2?: string;
    county?: string;
    cityOrTown?: string;
    state?: string;
    zipCode?: string;
}

// 根据location 计算合并后的地址
export const formatAddress = (location: Location): string => {
    if (!location) return "暂未提供";

    // 第一部分：街道地址 (addressLine1 + addressLine2)
    const streetParts = [location.addressLine1, location.addressLine2].filter(Boolean);
    const street = streetParts.length > 0 ? streetParts.join(" ") : "";

    // 第二部分：城市、州、邮编
    const cityParts = [
        location.cityOrTown ? `${location.cityOrTown},` : "",
        location.state,
        location.zipCode
    ].filter(Boolean);
    const cityStateZip = cityParts.length > 0 ? cityParts.join(" ") : "";

    // 合并街道和城市部分
    const fullAddress = [street, cityStateZip].filter(Boolean).join(", ");

    return fullAddress.length > 0 ? fullAddress : "暂未提供";
};

/**
 * 数字千分位转换 1500 -> 1.5k，1500000 -> 1.5M
 * @param count
 * @returns
 */
export const countTransK = (count: number) => {
    if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + 'M'
    }
    if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'K'
    }
    return count.toString()
}

// 解析日期格式
dayjs.extend(customParseFormat);

const FORMATS = ['YYYY-MM-DD', 'MM/DD/YYYY']; // 可按需扩充
const FALLBACK = 'N/A'; // 解析失败时的默认值
/**
 * 将多种日期字符串格式转换为 'YYYY-MM-DD'。
 * @param date 需解析的日期字符串
 * @returns 格式化后的日期，或 'N/A' 表示无效/空值
 */
export const formatDate = (date: string | Date): string => {
    if (!date) return FALLBACK;

    // 如果是 ISO 字符串或 Date 对象 → 用 dayjs 默认解析方式
    if (typeof date === 'string' && date.includes('T')) {
        const parsed = dayjs(date); // 不传格式，不用 strict 模式
        return parsed.isValid() ? parsed.format('YYYY-MM-DD') : FALLBACK;
    }

    if (date instanceof Date) {
        const parsed = dayjs(date);
        return parsed.isValid() ? parsed.format('YYYY-MM-DD') : FALLBACK;
    }

    // 否则使用格式匹配（严格模式）
    const parsed = dayjs(date, FORMATS, undefined, true);
    return parsed.isValid() ? parsed.format('YYYY-MM-DD') : FALLBACK;
};