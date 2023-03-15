import { useEffect, useState } from "react";
import { Table, Modal, ModalBody, ModalHeader, Button } from "reactstrap";
import Link from "next/link";

import TableLoginHistory from "./TableLoginHistory";
import { getLoginHistory } from "@/helpers/backend_request";

const TableUser = ({ listUser }) => {
  const [modal_large, setmodal_large] = useState(false);
  var email = "";
  function tog_large() {
    setmodal_large(!modal_large);
  }
  return (
    <>
      {/* Large Modal */}
      <Modal
        size="lg"
        isOpen={modal_large}
        toggle={() => {
          tog_large();
        }}
      >
        <ModalHeader
          className="modal-title fw-bold"
          id="myLargeModalLabel"
          toggle={() => {
            tog_large();
          }}
        >
          User's History
        </ModalHeader>
        <ModalBody>{/* <TableLoginHistory histories={} /> */}</ModalBody>
        <div className="modal-footer">
          <Link
            href="#"
            className="btn btn-link link-success fw-medium"
            onClick={() => setmodal_large(false)}
          >
            <i className="ri-close-line me-1 align-middle"></i> Close
          </Link>
        </div>
      </Modal>
      <Table>
        <thead className="table-light">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Email</th>
            <th scope="col">Name</th>
            <th scope="col">Birthday</th>
            <th scope="col">Role</th>
            <th scope="col" style={{ width: "150px" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {listUser.map((user) => (
            <tr>
              <td>{user._id}</td>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.birthday}</td>
              <td>
                <span className="badge bg-success">{user.role}</span>
              </td>
              <td>
                <button
                  onClick={() => tog_large()}
                  type="button"
                  className="btn btn-sm btn-light"
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default TableUser;
