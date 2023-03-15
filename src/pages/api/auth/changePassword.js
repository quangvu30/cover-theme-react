import * as _ from "lodash";

import { dbConnect } from "@/backend/config/database";
import {
  changePassword,
  resetPassword,
} from "@/backend/modules/users/user.controller";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case "PUT":
      const userChange = await changePassword(req.body);
      if (_.isError(userChange)) {
        return res
          .status(400)
          .json({ success: false, error: userChange.message });
      }
      return res.status(200).json({ success: true, data: userChange });
    case "PATCH":
      const { email } = req.body;
      const userReset = await resetPassword(email);
      if (_.isError(userReset))
        return res
          .status(400)
          .json({ success: false, error: userReset.message });
      return res.status(200).json({ success: true, data: userReset });
  }
  res.status(400).json({ success: false });
}
