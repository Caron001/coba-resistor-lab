const tfjs = require('@tensorflow/tfjs-node');

const loadModel = async () => {
    const model_url = 'https://storage.googleapis.com/submissionmlgc-bucket-leonard/model/model.json';
    try {
        return await tfjs.loadGraphModel(model_url);  
    } catch (error) {
        console.error('Error loading model:', error);
        throw new Error('Failed to load model');
    }
}

const predict = async (model, image) => {
    try {
        const tensor = tfjs.node
            .decodeImage(image)  
            .resizeNearestNeighbor([224, 224])  
            .expandDims() 
            .toFloat() 
            .div(tfjs.scalar(255));  

        const result = await model.predict(tensor).data(); 
        return result;
    } catch (error) {
        console.error('Error during prediction:', error);
        throw new Error('Prediction failed');
    }
}

module.exports = { loadModel, predict };