

export const createActionTypes = (type: string[]) : Record<string, string> => {
  return type.reduce((prev, current) => {
    return {
      ...prev,
      [`${current.toUpperCase().replace("-", "_")}`]: current
    };
  }, {});
}


export class ApiRequest {

  static instance = new ApiRequest()
  
  static getInstance() {
    if (!ApiRequest.instance) {
      ApiRequest.instance = new ApiRequest()
    }
    return ApiRequest.instance
  }

  public async get(url: string, headers?: Record<string, any>) {
    const abort = new AbortController()
    
    return await this.toJson(await fetch(url, {
      method: "GET",
      signal: abort.signal,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    }))

  }

  public async toJson(response: Response) {
    return await response.json()
  }
  
}