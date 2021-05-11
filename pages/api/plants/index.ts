import { NextApiRequest, NextApiResponse } from "next"

import json from '../../../config/server.json';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(json);
}