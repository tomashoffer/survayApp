
export function getUsers(req: any, res: any) {
    try {
        const { cookieName } = req.cookies;
        if(!cookieName) throw new Error('No cookie was found')

        const cookie = JSON.parse(cookieName);
        console.log(cookie);
        const { name } = cookie;

        res.send(cookie);
    } catch (e) {
        console.log(e)
        res.status(400).send({error:"No cookie was found"})
    }
};
