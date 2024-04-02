import moment from "moment";

const Invoice = ({ getSelectedData, cart, calculateTotalPrice }: any) => {
  return (
    <div className="flex justify-center items-center mt-5">
      <div>
        <div className="text-center mb-3">
          <h2 className="text-base font-bold">MARTVILL</h2>
          <h5>City Hall Park Path</h5>
          <h5>Dhaka</h5>
          <h5>Bangladesh</h5>
          <div>--------------------- RETAIL INVOICE ---------------------</div>

          <div className="flex justify-between">
            <div>
              <h3>Invoice Id: {getSelectedData?.id}</h3>
            </div>
            <div className="ml-2">
              <h3>Customer Name: {getSelectedData?.name}</h3>
            </div>
          </div>

          <div className="flex justify-between">
            <div>
              <h3>Date: {moment(Date.now()).format("LLL")}</h3>
            </div>
            <div className="ml-2">
              <h3>Phone: {getSelectedData?.phone}</h3>
            </div>
          </div>
        </div>

        <table id="customers">
          <thead>
            <tr>
              <th>SL</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart?.map((item: any, index: any) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.title}</td>
                  <td>{item?.quantity}</td>
                  <td>${item?.price}</td>
                  <td>${item?.price * item?.quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="text-end">
          <h2 className="text-lg mr-4">
            Sub Total: ${calculateTotalPrice?.()}
          </h2>
          ---------------------
          <h2 className="text-lg mr-4">
            Cash Paid: ${calculateTotalPrice?.()}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
