import Express from "express";
export const json = Express.json();

import Cors from "cors";
export const cors = Cors({
    origin: true,
    optionsSuccessStatus: 200,
    // some legacy browsers (IE11, various SmartTVs) choke on 204
});

