// Make the `request` function generic
async function request<TResponse>(
  url: string,
  config: RequestInit = {},
): Promise<TResponse> {
  const response = await fetch(url, config);

  if (response.status < 200 || response.status >= 300) {
    // An error occurred with the requst, through a general error for now
    throw new Error('Failed to fetch');
  }

  // The provided json response has syntax error with trailing comman (,) at the end
  // We will use response.text to get plain response and fix it first
  // The following regex will remove the trailing slash after the last item
  try {
    const regex = /,+(\r\n|\n|\r)+(\s+)+]/gm;
    let body = await response.text();
    body = body.replace(regex, ']');
    
    const data = JSON.parse(body);
    return data as TResponse;
  } catch (err) {
    // Another error happened while parsing the response json
    throw new Error('Failed to fetch: Invalid JSON');
  }
}

export {
  request,
}
