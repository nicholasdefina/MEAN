import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';


@Component
  ({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })

export class AppComponent implements OnInit {
  title = 'Restful Tasks API part 34';
  tasks = [];
  foundtask={};
  taskid;
  newTask: any;
  updates: any;

  //params
  num: number; 
  randNum: number;
  string: string;
  first_name: string;
  loggedIn: boolean;


  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.newTask = {title: "", description: ""}
    this.updates = {title:"", description:""}
  }

  getTaskById(taskid){
    let observable=this._httpService.getTaskById(taskid);
    observable.subscribe(data=>{
      this.foundtask=data["task"];   //data goes back to app.component.ts . under the else statement our key/value is {task:task}
      console.log(this.foundtask)
    })
  }

  taskUpdate(taskid, updates){
    let observable=this._httpService.taskUpdate(taskid,this.updates);
    observable.subscribe(data=>{
      console.log(data)
      this.updates={title: "", description: ""};
    })
  }

  delete(taskid){
    let observable=this._httpService.delete(taskid);
    observable.subscribe(data=>{
      console.log(data);
    })
  }

  onButtonClick(): void {
    console.log(`Click is working.`)
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log("Got our tasks!", data)
      this.tasks = data['tasks'];
      console.log(this.tasks);
    });

  }

  Create(): void{
    console.log("create button works")
    let observable= this._httpService.addTask(this.newTask);
    observable.subscribe(data => {
      console.log("Created single task", data)
      this.newTask={title: "", description: ""};
      console.log(this.newTask);
    })
  }

  onSubmit(): void {
    console.log(`Display Click is working.`)
    let observable = this._httpService.getTaskById(this.taskid);
    observable.subscribe(data => {
      console.log("Got single task!", data)
      this.newTask = data['tasks'];
      console.log(this.tasks);
    });
  }

  onButtonClickParam(num:Number): void{
    console.log(`Click event works with num param ${num}`)
  }

  onButtonClickParam2(num:Number, string: String): void{
    console.log(`Click event works with num param ${num} and string param ${string}`)
  }

  onButtonClickEvent(event:any): void{
    console.log(`Click event works event:  ${event}`)
  }

  // getTasksFromService() {
  //   let observable = this._httpService.getTasks();
  //   observable.subscribe(data => {
  //     console.log("Got our tasks!", data)
  //     this.tasks = data['tasks'];
  //     console.log(this.tasks);
  
  //   })
  // }
}


