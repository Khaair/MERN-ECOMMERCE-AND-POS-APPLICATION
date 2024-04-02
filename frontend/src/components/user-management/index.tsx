import { useEffect, useState } from "react";
import Layout from "../../layout";
import { baseUrl } from "../../utils/api-url";
import axios from "axios";
import ListLoading from "../preloader/list";
import UserList from "./list";
import AddUser from "./add";
function UserManagement() {
  const [data, setData] = useState<any>({
    loading: true,
    data: null,
  });
  const fetchdata = async () => {
    try {
      const res = await axios.get(`${baseUrl}/show-user`);
      if (res?.status === 200) {
        setData({
          loading: false,
          data: res?.data,
        });
      } else {
        setData({
          loading: true,
          data: null,
        });
      }
    } catch (err) {
      console.log(err, "error");
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchData = () => {
    fetchdata();
  };

  const fetchSetData = () => {
    fetchdata();
  };

  return (
    <Layout>
      <div className="bg-[white] p-5 rounded-lg min-screen-height">
        {data?.loading ? (
          <ListLoading />
        ) : (
          <>
            <AddUser fetch={fetchData} />
            <UserList
              fetchSetData={fetchSetData}
              fetchdata={fetchdata}
              data={data?.data}
            />
          </>
        )}
      </div>
    </Layout>
  );
}

export default UserManagement;
