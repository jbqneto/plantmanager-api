import { NextApiRequest, NextApiResponse } from "next"
import Cors from 'cors';

import server from '../../../config/server.json';
import corsMiddleware from '../../../config/corsMiddleware';

const json = {...server};

const cors = corsMiddleware(
  Cors({
    methods: ['GET', 'OPTIONS'],
  })
);

export default async (req: NextApiRequest, res: NextApiResponse) => {

  await cors(req, res);
  
  let { plants } = json;
  const {_page, _limit} = req.query;

  const page = (_page !== undefined) ? Number(_page) : 1;
  const limit = (_limit !== undefined) ? Number(_limit) : 10;

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
    const end = (limit < plants.length) ? limit : plants.length;
    const ini = (Number(page) - 1) * Number(limit);
    plants = plants.splice(ini, end);
  }

  res.status(200).json(plants);
}