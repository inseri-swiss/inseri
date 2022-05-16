import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pyodide',
  templateUrl: './pyodide.component.html',
  styleUrls: ['./pyodide.component.scss']
})
export class PyodideComponent implements OnInit {

  pyodideWorker: Worker
  output: string = ""
  input: string = ""
  editor_opt = {fontSize: "12pt"}
  constructor() {}

  ngOnInit(): void {
    this.pyodideWorker = new Worker(new URL('./py.worker', import.meta.url));

    this.pyodideWorker.onmessage = (event) => {
      const { data } = event;

      if(data?.kind == "RESULT"){
        this.output = data?.res + "\n" + this.output
      }
      else {
        this.output = data?.res
      }
    }
  }

  runCode(){
    this.pyodideWorker.postMessage({
      python: this.input
    })
  }

}

