

export default async function aiModels() {
    try {
        console.log(process.env.OPEN_ROUTER_MODELS_API, '<OPEN_ROUTER_MODELS_API');
        const models = await fetch(`${process.env.OPEN_ROUTER_MODELS_API}`, {
            method: 'GET'
        });
        const modelsData = await models.json() as any;
        return modelsData.data;
    }
    catch (err) {
        console.log(err, 'Err in aiModels')
        return [];
    }
}
// trigger