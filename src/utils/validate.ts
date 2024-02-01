// 验证手机号是否正确
export const validatePhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^1[3456789]\d{9}$/;
    return phoneRegex.test(phoneNumber);
}