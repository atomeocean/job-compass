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