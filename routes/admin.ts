import { Router, type RequestHandler } from "express";
import { userAuth as auth, adminAuth } from "../middleware/authMiddleware";
import aiModels from "../aiModels";
import { db } from "../prisma/prisma";

const adminRouter = Router();

adminRouter.get('/refresh-models', adminAuth as RequestHandler, async (req, res) => {
    try {
        const models = await aiModels() as any;
        const reqModels = models.filter((model: any) => {
            const promptPrice = model.pricing.prompt;
            const completionPrice = model.pricing.completion;
            if (promptPrice === '0' && completionPrice === '0') {
                return true;
            }
            return false;
        })
        const modelsToInsert = reqModels.map((model: any) => {
            return {
                model_id: model.id,
                canonical_slug: model.canonical_slug,
                name: model.name,
                description: model.description || '',
                context_length: model.context_length || 0,
                pricing: model.pricing
            }
        })
        const llmModels = await db.lLMModels.createMany({
            data: modelsToInsert,
            skipDuplicates: true
        })

        res.status(200).json(`${llmModels.count} models refreshed successfully`);
        // res.status(200).json(reqModels);
        return;
    }
    catch (err) {
        console.log('Error in refreshing models', err);
        res.status(500).json('Error in refreshing models');
        return;
    }

});



export default adminRouter;