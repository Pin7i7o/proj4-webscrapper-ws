require('dotenv').config();

const allowedDomains = process.env.ALLOWED_DOMAINS.split(',');
const allowedPathPrefix = process.env.ALLOWED_PATH_PREFIX;

exports.urlValidation = (url) => {
    try {
        const isValid = new URL(url);
        const isDomainAllowed = allowedDomains.includes(isValid.hostname);
        const isPathAllowed = isValid.pathname.startsWith(allowedPathPrefix);
        return isDomainAllowed && isPathAllowed;
    } catch (err) {
        return false;
    }
}