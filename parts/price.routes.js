const { validateParts } = require("./parts");
const { calculatePrice } = require("./price");

const priceRoutes = (app) => {
    app.post('/price', (req, res) => {
        const { body } = req;
        if (!body || !body.parts || !Array.isArray(body.parts)) {
            console.error("No parts");
            return res.status(500).send("Wrong request");
        }

        if (!validateParts(body.parts)) {
            console.error("Validation of the parts error");
            return res.status(500).send("Wrong request");
        }

        calculatePrice(body.parts)
            .then(([provider, cost, pallets]) => {
                res.status(200).json({
                    cost,
                    provider,
                    pallets,
                })
            })
            .catch((err) => {
                console.error("Calculation error", err);
                res.status(500).send("Wrong request")
            })
    })
}

module.exports = {
    priceRoutes
}