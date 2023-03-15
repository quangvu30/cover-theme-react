const TableLoginHistory = ({ histories }) => {
  return (
    <Table>
      <thead className="table-light">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">IP Address</th>
          <th scope="col">Time</th>
        </tr>
      </thead>
      <tbody>
        {histories.map((history) => (
          <tr>
            <td>{history._id}</td>
            <td>{history.ipAddress}</td>
            <td>{history.time}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableLoginHistory;
