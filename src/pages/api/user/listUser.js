import { getServerSession } from "next-auth/next";
import * as _ from "lodash";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getAllUser } from "@/backend/modules/users/user.controller";
import { dbConnect } from "@/backend/config/database";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  const session = await getServerSession(req, res, authOptions);
  switch (method) {
    case "GET":
      if (session?.user?.role === "admin") {
        const listUsers = await getAllUser();
        return res.status(200).json({ success: true, data: listUsers });
      }
      break;
  }

  res.send({
    error: "You must be signed in to view the protected content on this page.",
  });
}
