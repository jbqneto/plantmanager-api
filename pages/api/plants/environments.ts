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
  
  const environments = json.plants_environments;

  environments.sort((a, b) => {
    if (a.title > b.title) {
      return 1;
    } else if (a.title < b.title) {
      return -1;
    } else {
      return 0;
    }
  });

  res.status(200).json(environments);
}