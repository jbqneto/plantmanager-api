import { NextApiRequest, NextApiResponse } from "next"

import json from '../../../config/server.json';

export default (req: NextApiRequest, res: NextApiResponse) => {
  let { plants } = json;
  const page = req.query._page;
  const limit = req.query._limit || 10;

  plants.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    } else if (a.name < b.name) {
      return -1;
    } else {
      return 0;
    }
  });

  if (page) {
    const ini = (Number(page) - 1) * Number(limit);
    plants = plants.splice(ini, Number(limit));
  }

  res.status(200).json(plants);
}