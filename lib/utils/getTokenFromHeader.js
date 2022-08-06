export default function(req){

    try {
     
        const headers = req.headers;
        const authorization = headers['authorization'];
        const splitted = authorization.split(" ");
        const token = splitted[1];
        return token;

    } catch (err) {
        console.log(err);
        return null;
    }

};