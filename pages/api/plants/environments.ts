import { NextApiRequest, NextApiResponse } from "next"

import json from '../../../config/server.json';

export default (req: NextApiRequest, res: NextApiResponse) => {
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