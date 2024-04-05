export namespace V1 {
  export namespace GET {
    export interface Header {
      Authorization?: string;
      Cookie?: string;
    }
    
    export interface Response {
      status: string;
    }
  }
}
