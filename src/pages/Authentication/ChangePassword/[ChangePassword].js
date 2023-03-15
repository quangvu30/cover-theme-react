import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Label,
  Input,
  Form,
} from "reactstrap";

import avatar from "@/assets/images/users/avatar-1.jpg";
import {
  getChangePassword,
  putChangePassword,
} from "@/helpers/backend_request";
import { signOut } from "next-auth/react";

const UserProfile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState();
  const { ChangePassword } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await putChangePassword(userData);
    if (res.data?.success) {
      alert("Change password success");
      signOut({ callbackUrl: "/Authentication/Login" });
    } else {
      alert("Some thing wrong: ", res.data?.error);
    }
  };

  useEffect(() => {
    getChangePassword({ token: ChangePassword })
      .then((res) => {
        setUserData({ ...res.data?.data, token: ChangePassword });
      })
      .catch();
  }, [ChangePassword]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="mx-3">
                      <img
                        src={avatar.src}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{userData?.name || "Admin"}</h5>
                        <p className="mb-1">Email : {userData?.email}</p>
                        <p className="mb-0">Id : {userData?._id}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Change Password</h4>

          <Card>
            <CardBody>
              <Form className="form-horizontal" onSubmit={handleSubmit}>
                <div className="form-group">
                  <Label className="form-label">New Password</Label>
                  <Input
                    name="first_name"
                    onChange={({ target }) => {
                      setUserData({ ...userData, newPassword: target.value });
                    }}
                    className="form-control"
                    placeholder="Enter new password"
                    type="text"
                  />
                </div>
                <div className="text-center mt-4">
                  <Button type="submit" color="danger">
                    Change Password
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UserProfile;
