const func = require('./handlers-utilities');
const { stock, customers } = require("./promo");

const newOrder = (req, res) => {
    const {order, size, givenName, surname, email, address, city, province, postcode, country} = req.body;

    const orderCheck = validateOrder(givenName, surname, email, address, country, order, size);
    res.json({status: orderCheck, error: orderCheck});
};



// Validation
const validateOrder = (givenName, surname, email, address, country, order, size) => {
    const name = {givenName: givenName, surname: surname};
    if (func.customerExist(name, customers))
        return 'repeat-customer';
    if (customers.filter(customer => { return func.compareData(email, customer.email)}).length > 0)
        return 'repeat-customer';
    if (customers.filter(customer => { return func.compareData(address, customer.address)}).length > 0)
        return 'repeat-customer';      
    return validateCountry(country);
};

const validateCountry = (country, order, size) => {
    if (country.toLowerCase() !== 'canada')
        return 'undeliverable';
    return validateStock(order, size);
}

const validateStock = (order, size) => {
    let item;
    switch (order) {
        case 'bottle':
            item = stock.bottles;
            break;
        case 'shirt':
            return validateStock(size);
        case 'socks':
            item = stock.socks;
            break;
        case 'small':
            item = stock.shirt.small;
            break;
        case 'medium':
            item = stock.shirt.medium;
            break;
        case 'large':
            item = stock.shirt.large;
            break;
        case 'extralarge':
            item = stock.shirt.xlarge;
            break;
        default:
            return 'unavailable';
    }
    
    if (item > 0)
        return 'success';
    else      
        return 'unavailable';

}

module.exports = { newOrder };