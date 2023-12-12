export const objetToQueryString = <T extends object>(obj: T) => {
    const params = new URLSearchParams();
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            params.append(key, obj[key] as string);
        }
    }

    return params.toString();
};

export default objetToQueryString;
