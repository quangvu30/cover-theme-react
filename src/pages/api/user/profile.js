import * as _ from "lodash";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getUser, updateUser } from "@/backend/modules/users/user.controller";
import { dbConnect } from "@/backend/config/database";

export default async function handler(req, res) {
  const { method } = req;
  const session = await getServerSession(req, res, authOptions);
  await dbConnect();
  switch (method) {
    case "GET":
      if (session) {
        const user = await getUser(session?.user?.email || "");
        if (_.isError(user)) {
          return res.status(400).json({ success: false, error: user.message });
        }

        return res.status(200).json({ success: true, data: user });
      }
      break;
    case "PUT":
      const user = await updateUser(req.body);
      if (_.isError(user)) {
        return res.status(400).json({ success: false, error: user.message });
      }
      return res.status(200).json({ success: true, data: user });
  }

  res.send({
    error: "You must be signed in to view the protected content on this page.",
  });
}
