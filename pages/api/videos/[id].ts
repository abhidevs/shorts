import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { videoDetailQuery } from "../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    const query = videoDetailQuery(id);

    const [data] = await client.fetch(query);
    console.log(data);

    res.status(200).json(data);
  }
}
