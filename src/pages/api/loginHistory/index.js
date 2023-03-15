import { getServerSession } from "next-auth/next";
import * as _ from "lodash";

import { dbConnect } from "@/backend/config/database";
import { getLoginHistory } from "@/backend/modules/loginHistory/loginHistory.controller";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
  const {
    method,
    query: { page, limit, email },
  } = req;
  console.log(email);

  const session = await getServerSession(req, res, authOptions);
  await dbConnect();
  switch (method) {
    case "GET":
      const user = session?.user;
      console.log(user.role);
      if (email === undefined) {
        const getLoginHistoryDto = {
          page: Number(page),
          limit: Number(limit),
          email: user.email,
        };
        const loginHistories = await getLoginHistory(getLoginHistoryDto);
        if (_.isError(loginHistories)) {
          return res
            .status(400)
            .json({ success: false, error: loginHistories.message });
        }
        return res.status(200).json({ success: true, data: loginHistories });
      } else {
        const getLoginHistoryDto = {
          page: Number(page),
          limit: Number(limit),
          email: String(email),
        };
        const loginHistories = await getLoginHistory(getLoginHistoryDto);
        if (_.isError(loginHistories)) {
          return res
            .status(400)
            .json({ success: false, error: loginHistories.message });
        }
        return res.status(200).json({ success: true, data: loginHistories });
      }
  }
  res.status(400).json({ success: false });
}
