export const getURLFriendlyString = (string:string) => {
    const Regex = new RegExp(/\s+/g);
    const replaced = string.replace(Regex, '-');

    return replaced.toLocaleLowerCase();
};
