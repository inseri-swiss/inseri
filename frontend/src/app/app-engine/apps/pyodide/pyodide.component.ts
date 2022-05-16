import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pyodide',
  templateUrl: './pyodide.component.html',
  styleUrls: ['./pyodide.component.scss']
})
export class PyodideComponent implements OnInit {

  @Input()
  param1: string = ""
  @Input()
  hash: string = ""

  isPending = false
  pyodideWorker: Worker
  output: string = ""
  input: string =
`# input 'param1' is available as variable param1
`
  editor_opt = {fontSize: "12pt"}
  constructor() {}

  ngOnInit(): void {
    this.output = `app hash ${this.hash}`
    this.pyodideWorker = new Worker(new URL('./py.worker', import.meta.url));

    this.pyodideWorker.onmessage = (event) => {
      const { data } = event;

      if(data?.kind == "RESULT"){
        this.output = data?.res + "\n" + this.output
      }
      else {
        this.output = data?.res + "\n" + this.output
      }
      this.isPending = false
    }
  }

  runCode(){
    this.isPending = true
    this.pyodideWorker.postMessage({
      python: this.input,
      param1: this.param1
    })
  }

}

