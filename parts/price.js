const { default: axios } = require('axios');
const BinPacking3D = require('binpackingjs').BP3D;
const { Item, Bin, Packer } = BinPacking3D;

const PRICE_URL = "http://localhost:3001/getprice/pallet";

const LONGER_SIDE = 1200; //mm
const SHORTER_SIDE = 1000; //mm

const PART_HEIGHT = 10; //mm

const QUARTER_HEIGHT = 600; //mm
const HALF_HEIGHT = 1000; //mm
const FULL_HEIGHT = 1800; // mm

const calculateNumberOfPalletes = (parts) => {
    let packer = new Packer();
    for (const [width, height] of parts) {
        packer.addBin(new Bin("Pallete", LONGER_SIDE, SHORTER_SIDE, FULL_HEIGHT, 1));
        packer.addItem(new Item("Item 1", width, height, PART_HEIGHT, 0));
    }

    packer.pack();

    if (packer.items.length) {
        throw new Error("There are unpacked items")
    }

    if (packer.unfitItems.length) {
        throw new Error("There are unfit items")
    }
    return packer.bins.filter(({ items }) => items.length !== 0).length;
}

const calculatePrice = async (parts) => {
    const numberOfPallets = calculateNumberOfPalletes(parts);
    const [provider, price] = await fetchPrice(numberOfPallets);
    return [provider, price, numberOfPallets];
}

const fetchPrice = async (numberOfPallets) => {
    const response = await axios.post(PRICE_URL, {
        countryCode: 'GB',
        postalCode: 'PE20 3PW',
        pallets: numberOfPallets,
    })

    if (!response || response.status >= 300) {
        console.error(response.status, response.data);
        throw new Error("Failed to fetch price");
    }

    const { data } = response;

    if (!data || !data.totalCost || !data.totalCost.value) {
        throw new Error("Response doesn't contain value");
    }

    if (!data.provider) {
        throw new Error("Response doesn't contain provider");
    }

    return [data.provider, data.totalCost.value];
}

module.exports = {
    LONGER_SIDE,
    SHORTER_SIDE,
    calculateNumberOfPalletes,
    calculatePrice
}