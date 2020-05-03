import wrap_payload from "./jwt";

export default async function apiRequest(
  endpoint,
  method = "GET",
  payload = null
) {
  const url = "http://localhost:3000";

  let headers = null;
  if (method !== "POST" && method !== "PUT") {
  } else {
    payload = wrap_payload(payload);
  }

  try {
    if (method !== "POST" && method !== "PUT") {
      const response = await fetch(`${url}/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${wrap_payload({})}`,
        },
        method,
      });
      const data = await response.json();
      return data;
    } else {
      const response = await fetch(`${url}/${endpoint}`, {
        method,
        body: payload,
      });
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.log(err);
  }
}
