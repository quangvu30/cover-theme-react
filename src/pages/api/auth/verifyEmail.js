import * as _ from "lodash";

import { dbConnect } from "@/backend/config/database";
import { activeAccout } from "@/backend/modules/users/user.controller";

export default async function handler(req, res) {
  const { method } = req;
  console.log(req.body);

  await dbConnect();
  if (method === "POST") {
    const { token } = req.body;
    const user = await activeAccout(token);
    if (_.isError(user)) {
      res.status(400).json({ success: false, error: user.message });
      return;
    }

    res.status(200).json({ success: true, data: user });
    return;
  }
  res.status(400).json({ success: false });
}
