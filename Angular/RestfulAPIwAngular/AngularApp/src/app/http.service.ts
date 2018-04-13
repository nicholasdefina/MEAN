import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) {
    console.log("WE ARE CONSTRUCTING&%&#%*#%&#*%") 
      // this.oneTask();
    // this.newTask();
    // this.deleteTask();
  }




  getTasks(){
    // Return the observable to wherever the getTasks method was invoked.
    return this._http.get('/tasks');
  }
  
  getTaskById(taskid){
    //our http rsponse is an observable, store it in the variable tempObservable
    console.log("Taskbyid is at service")
    console.log(taskid)
    return this._http.get(`/viewtask/${taskid}`);
  }

  addTask(newTask){
    return this._http.post('/addTask', newTask)
  }

  taskUpdate(taskid, updates){
    return this._http.put(`/viewtask/${taskid}`, updates)
  }

  delete(taskid){
    return this._http.delete(`/viewtask/${taskid}`)
  }

}
  // newTask(){
//   //our http rsponse is an observable, store it in the variable tempObservable
//   let tempObservable = this._http.get('/api/tasks');


//   //subscribe to our observable and provide the code we would like to do with our data from the response
//   tempObservable.subscribe(data => console.log("Added new task!", data));
// }


// deleteTask(){
//   //our http rsponse is an observable, store it in the variable tempObservable
//   let tempObservable = this._http.get('/api/tasks');


//   //subscribe to our observable and provide the code we would like to do with our data from the response
//   tempObservable.subscribe(data => console.log("Got our tasks!", data));
// }



//   //subscribe to our observable and provide the code we would like to do with our data from the response
//   tempObservable.subscribe(data => console.log("Got our tasks!", data));
// }




