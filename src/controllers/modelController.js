const { predict } = require('../services/inferenceService'); // Pastikan predict function sudah benar
const { storeData, getData } = require('../services/firestore'); // Pastikan fungsi firestore sudah benar
const nanoid = require('nanoid');

const colorCode = {
    black: 0,
    brown: 1,
    red: 2,
    orange: 3,
    yellow: 4,
    green: 5,
    blue: 6,
    violet: 7,
    gray: 8,
    white: 9,
    gold: 'tolerance',
    silver: 'tolerance'
};

const calculateResistorValue = (bands) => {
    if (bands.length === 4) {
        const digit1 = colorCode[bands[0].toLowerCase()];
        const digit2 = colorCode[bands[1].toLowerCase()];
        const multiplier = colorCode[bands[2].toLowerCase()];
        const value = (digit1 * 10 + digit2) * Math.pow(10, multiplier);
        return value;
    } else if (bands.length === 5) {
        const digit1 = colorCode[bands[0].toLowerCase()];
        const digit2 = colorCode[bands[1].toLowerCase()];
        const multiplier = colorCode[bands[2].toLowerCase()];
        const tolerance = colorCode[bands[4].toLowerCase()];
        const value = (digit1 * 10 + digit2) * Math.pow(10, multiplier);
        return { value, tolerance };
    }
    return null;
};

const predictResistor = async (req, res) => {
    const { image } = req; 
    const { model } = req.app.locals; 

    if (!image) {
        return res.status(400).json({ message: 'No image uploaded' });
    }

    try {
        const [result] = await predict(model, image.buffer); 

        const id = nanoid(16); 
        const createdAt = new Date().toISOString();
        let responseMessage = '';
        let bands = [];
        let resistorValue = null;
        let suggestion = '';

        if (result.isResistor) {
            bands = result.bands;
            resistorValue = calculateResistorValue(bands);
            responseMessage = 'Gambar adalah resistor';
            suggestion = `Resistor dengan nilai: ${resistorValue.value || resistorValue} Ohms`;
        } else {
            responseMessage = 'Gambar bukan resistor';
            suggestion = 'Coba kirim gambar resistor yang jelas';
        }

        const data = {
            id,
            result: responseMessage,
            bands: bands.join(', '),
            resistorValue: resistorValue.value || resistorValue,
            suggestion,
            createdAt,
        };

        await storeData(id, data);

        return res.status(201).json({
            status: 'success',
            message: 'Image prediction has been successfully processed',
            data,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getHistory = async (req, res) => {
    try {
        const histories = await getData();
        return res.status(200).json({
            status: 'success',
            data: histories,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { predictResistor, getHistory };
