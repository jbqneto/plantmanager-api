import { NextApiRequest, NextApiResponse } from "next"
import Cors from 'cors';

import json from '../../../config/server.json';
import corsMiddleware from '../../../config/corsMiddleware';

const cors = corsMiddleware(
  Cors({
    methods: ['GET', 'OPTIONS'],
  })
);

export default async (req: NextApiRequest, res: NextApiResponse) => {

  await cors(req, res);
  
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