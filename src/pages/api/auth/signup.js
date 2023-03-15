import _ from "lodash";

import { createUser } from "@/backend/modules/users/user.controller";
import { dbConnect } from "@/backend/config/database";

export default async function handler(req, res) {
  const { method } = req;
  console.log(req.body);

  await dbConnect();
  if (method == "POST") {
    try {
      const user = await createUser(req.body);

      if (_.isError(user)) {
        return res.status(400).json({ success: false, error: user.message });
      }
      return res.status(201).json({ success: true, data: user });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  }
  return res.status(400).json({ success: false });
}
