import urlsSchema from "../../schemas/urlsSchema.js";
import formatError from "../../utils/formatError.js";

export default async function(req, res, next){

    const { error } = urlsSchema.validate(req.body);
    if(error) return res.status(422).send(formatError(error));

    next();

};