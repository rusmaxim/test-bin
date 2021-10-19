const {
    LONGER_SIDE,
    SHORTER_SIDE
} = require('./price');

const validateParts = (parts) => {
    for (const [width, height] of parts) {
        if (!width || !height) {
            console.error("validateParts", "zero dimension of the part");
            return false;
        }
    }

    return true
}

module.exports = {
    validateParts
}