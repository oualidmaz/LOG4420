import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';

@Injectable()
export class DataService {

  protected baseUrl:string;

  private options = new RequestOptions(
    { 
      headers: new Headers({ 'Content-Type': 'application/json' }), 
      withCredentials: true ,
      method:RequestMethod.Get,
    }
  );
  constructor(private http:Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.feedbackMessage || error);
  }
  get(url?:string){

    this.options.method = RequestMethod.Get;
    
    return this.http.get(`${this.baseUrl}${url||""}`,this.options)
    .map(response => response.json())
    .catch(this.handleError);
  }
  post(url?:string, data?:any){
    this.options.method = RequestMethod.Post;
    return this.http.post(`${this.baseUrl}`,data, this.options)
                    .catch(err=>this.handleError(err));
  }
  put(url?:string, data?:any){
    this.options.method = RequestMethod.Put;
    return this.http.put(`${this.baseUrl}${url||""}`,data,this.options)
    .map(response => response.json())
    .catch(this.handleError);
  }
  delete(url?:string){
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options=new RequestOptions(
    //   { 
    //     headers:headers, 
    //     withCredentials: true ,
    //   });
    this.options.method = RequestMethod.Delete;
    return this.http.delete(`${this.baseUrl}${url||""}`,this.options)
    .map(response => response.json())
    .catch(this.handleError);
  }


}
