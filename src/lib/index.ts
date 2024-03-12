


export function timeString(distance: number | undefined, long = false) {
    if(distance == undefined) return undefined;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const d = long ? (days != 1 ? " days " : " day ") : "d ";
    const h = long ? (hours != 1 ? " hours " : " hour ") : "h ";
    const m = long ? (minutes != 1 ? " minutes " : " minute ") : "m ";
    const s = long ? (seconds != 1 ? " seconds " : " second ") : "s ";

    const daysS = days > 0 ? days+d : "";
    const hoursS = hours > 0 ? hours+h : "";
    const minutesS = minutes > 0 ? minutes+m : "";
    const and = (long && (daysS || hoursS || minutesS)) ? "and " : "";
    const secondsS = seconds+s;

    return daysS + hoursS + minutesS + and + secondsS;
}

export function isNearWan(now?: Date) {
    const d = now ? now : new Date();
    if(d.getUTCDay() === 5) {
        return d.getUTCHours() > 20;
    } else if(d.getUTCDay() === 6) {
        return d.getUTCHours() <= 11;
    } else {
        return false;
    }
}



export type ShopifyProduct = {
    id: number,
    title: string,
    handle: string,
    body_html: string,
    published_at: string,
    created_at: string,
    updated_at: string,
    vendor: "LTTStore",
    product_type: string,
    tags: string[],
    images: ProductImage[]
}
export type ProductImage = {
    id: number,
    created_at: string,
    position: number,
    updated_at: string,
    product_id: number,
    src: string,
    width: number,
    height: number
}