// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import app from './_router'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  app(req, res)
}
