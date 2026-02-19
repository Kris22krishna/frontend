export function generateReceiptId() {
    const prefix = "SKILL";

    const now = new Date();
    const timestamp = now.toISOString()
        .replace(/[-:.TZ]/g, "");


    const randomPart = crypto.getRandomValues(new Uint32Array(2))
        .reduce((acc, val) => acc + val.toString(36), "");

    return `${prefix}${timestamp}${randomPart}`.toUpperCase();
}