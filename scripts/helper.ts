import crypto from "crypto";

const getLittleEndian = (bigEndian: string): string => {
    const result = [];
    let len = bigEndian.length - 2;
    while (len >= 2) {
        result.push(bigEndian.substring(len, 2));
        len -= 2;
    }
    // Return haxadecimal number without `0x`
    return result.join("");
};
export { getLittleEndian };
