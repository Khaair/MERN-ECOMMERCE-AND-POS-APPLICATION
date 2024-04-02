import { baseUrl } from "../utils/api-url";

export const addUserHandler = async (fields: any) => {
  console.log("fff", fields);
  const res = await fetch(
    `${baseUrl}/save-user`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: fields?.name,
        email: fields?.email,
        phone: fields?.phone,
        nid: fields?.nid,
        dob: fields?.dob,
      }),
    }
  );
  return await res;
};


export const updateUserHandler = async (fields: any) => {
  console.log("update", fields);
  const res = await fetch(
    `${baseUrl}/update-user/${fields?.id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: fields?.name,
        email: fields?.email,
        phone: fields?.phone,
        nid: fields?.nid,
        dob: fields?.dob,
      }),
    }
  );
  return await res;
};

