

export default async function aiModels() {
    const models = await fetch(`${process.env.OPEN_ROUTER_MODELS_API}`, {
        method: 'GET'
    });
    const modelsData = await models.json() as any;
    return modelsData.data;
}