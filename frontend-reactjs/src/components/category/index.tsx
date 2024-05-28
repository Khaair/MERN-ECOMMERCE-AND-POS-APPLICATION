import { useCallback, useEffect, useState } from "react";
import ListLoading from "../preloader/list";
import List from "./list";
import Add from "./add";
import {  fetchAdminCategoryListHandler } from "../../api/category";
import { limitCount } from "../../utils/api-url";
import { useLocation } from "react-router-dom";
import PaginatedDataTable from "./test";
function CategoryManagement() {
  const loc = useLocation();
  const [limit] = useState<number>(limitCount);
  const [data, setData] = useState<any>({
    loading: true,
    data: null,
  });


  const fetchData: () => Promise<void> = useCallback(async () => {
    if (true) {
      await setData({ loading: true, data: null });
      await fetchAdminCategoryListHandler(limit, loc?.search).then((res) => {
        if (res?.status === 200) {
          setData({
            loading: false,
            data: res?.data,
          });
        } else {
          setData({
            loading: false,
            data: null,
          });
        }
      });
    }
  }, [limit, loc?.search]);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, window.scrollTo(0, 0)]);

  // const fetch = ()=>{
  //   fetchData()
  // }



  return (
    <div className="bg-[white] p-5 rounded-lg min-screen-height">
      {data?.loading ? (
        <ListLoading />
      ) : (
        <>
          <Add fetch={fetchData}/>
          {/* <PaginatedDataTable/> */}
          <List data={data?.data} />
        </>
      )}
    </div>
  );
}

export default CategoryManagement;
