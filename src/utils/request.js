import wrap_payload from './jwt';

export default async function apiRequest(endpoint, method = "GET", payload = null) {
    const url = 'http://localhost:3000';

    let headers = null
    if (method !== "POST" && method !== "PUT") {
        headers = {
            'Authorization': `Bearer ${wrap_payload({})}`
        } 
    } else {
        payload = wrap_payload(payload);
    }

    try {
        const response = await fetch(`${url}/${endpoint}`, {
          headers,
          data: payload
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}