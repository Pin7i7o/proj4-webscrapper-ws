//Builds a custom url to match website standards
exports.buildUrl = (km, fromYear, toYear, fromPrice, toPrice, url) => {
    let newUrl = url;

    if (fromYear !== "null") {
        newUrl += `/desde-${fromYear}`;
    }

    newUrl += '?search%5Bfilter_enum_fuel_type%5D=electric';

    if (toYear !== "null") {
        newUrl += `&search%5Bfilter_float_first_registration_year%3Ato%5D=${toYear}`;
    }

    if (km !== "null") {
        newUrl += `&search%5Bfilter_float_mileage%3Ato%5D=${km}`;
    }

    if (fromPrice !== "null") {
        newUrl += `&search%5Bfilter_float_price%3Afrom%5D=${fromPrice}`;
    }

    if (toPrice !== "null") {
        newUrl += `&search%5Bfilter_float_price%3Ato%5D=${toPrice}`;
    }

    newUrl += '&search%5Border%5D=created_at_first%3Adesc';

    return newUrl;
}
