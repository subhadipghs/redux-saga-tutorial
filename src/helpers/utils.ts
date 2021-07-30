/**
 * Generate action types object
 * @param type - the types of action as string constants
 * @returns object containing the action types
 */
export const createActionTypes = (type: string[]) : Record<string, string> => {
  return type.reduce((prev, current) => {
    return {
      ...prev,
      [`${current.toUpperCase().replace("-", "_")}`]: current
    };
  }, {});
}

/**
 * Check if the running on browser environment
 */
export const isBrowserEnv : boolean = typeof window !== "undefined"


/**
 * Check if running on production environment
 */
export const isProductionEnv = process.env.NODE_ENV === "production"

/**
 * API Request manager
 */
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