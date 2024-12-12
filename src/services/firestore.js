const { Firestore } = require("@google-cloud/firestore");

const storeData = async (id, data) => {
    try {
        const db = new Firestore();
        const predictCollections = db.collection('predictions');
        await predictCollections.doc(id).set(data);  
        console.error("Error storing data: ", error); 
        throw new Error('Failed to store data');
    }
    catch (error) {
        console.error("Error storing data: ", error);  
        throw new Error('Failed to store data');
    }
}

const getData = async () => {
    try {
        const db = new Firestore();
        const snapshotPredictions = await db.collection('predictions').get(); 
        const histories = snapshotPredictions.docs.map((doc) => ({
            id: doc.id,
            history: doc.data()  
        }));
        return histories;
    } catch (error) {
        console.error("Error fetching data: ", error);  
        throw new Error('Failed to fetch data');
    }
}

module.exports = { storeData, getData };
