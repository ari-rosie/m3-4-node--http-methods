const { customers } = require("./promo");

const checkName = (name, dataName) => {
    if (name.surname === dataName.surname) 
        if (name.givenName === dataName.givenName) return true;
    else
        return false;
};

const customerExist = (name, database) => {
    let flag = false;
    database.forEach(data => {
        if (checkName(name, data))
            flag = true;        
    });
    return flag;
};


const compareData = (orderData, database,) => {
    if (orderData === database)
        return true;
    else
        return false;
}


module.exports = { checkName, customerExist, compareData };