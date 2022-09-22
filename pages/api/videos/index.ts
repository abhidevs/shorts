import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { allVideosQuery } from "../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const query = allVideosQuery();
    const data = await client.fetch(query);

    res.status(200).json(data);
  } else if (req.method === "POST") {
    const document = req.body;
    client.create(document).then(() => res.status(201).json("Video Created"));
  }
}
