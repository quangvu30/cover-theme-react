import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Table,
} from "reactstrap";
import BreadCrumb from "@/Components/Common/BreadCrumb";
import PreviewCardHeader from "@/Components/Common/PreviewCardHeader";
import UiContent from "@/Components/Common/UiContent";
import Link from "next/link";
import TableUser from "@/Components/Common/TableUsers";
import { getListUser } from "@/helpers/backend_request";

const UserManagement = () => {
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    getListUser().then((res) => {
      setListUser(res.data?.data);
      console.log(listUser);
    });
  }, []);
  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="General" pageTitle="UserManagement" />
          <Row>
            <Col xl={12}>
              <Card>
                <PreviewCardHeader title="Users" />
                <CardBody>
                  <div className="live-preview">
                    <div className="table-responsive table-card">
                      <TableUser
                        className="align-middle table-nowrap mb-0"
                        listUser={listUser}
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UserManagement;
