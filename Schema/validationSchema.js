const z= require('zod');

const valSchema= z.object({
    name:z.string().min(2),
    description:z.string().min(10),
    price:z.number(),
    // image:Buffer
})
const updateValSchema=z.object({
    name:z.string().optional(),
    description:z.string().optional(),
    price:z.number().optional()
})
module.exports={valSchema,updateValSchema};