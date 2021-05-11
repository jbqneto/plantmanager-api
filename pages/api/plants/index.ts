import { NextApiRequest, NextApiResponse } from "next"

import server from '../../../config/server.json';

const json = {...server};

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(json);
}