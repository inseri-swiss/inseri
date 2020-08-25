import {Component, Input, Output, OnChanges } from '@angular/core';
import { DataListViewInAppQueryService } from './services/query.service';
import {DisplayedCollumnsService, DataCell, SettingsService, OriginalColumnService} from './data-list-view-services/table-data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'data-list-view',
  templateUrl: './data-list-view.component.html'
})

export class DataListViewComponent implements OnChanges {
  @Input() appInputQueryMapping: any;
  @Input() hash: string;
  @Input() queryResponse?: any;
  @Input() dataListSettings?: any; // DataListViewSettings;
  @Input() query?: string;
  @Output() dataListSettingsOut: any;
  @Output() tableData: Array<any>; // table data passed to table component. Equals the generatedData once this is finished.
  generatedData: Array<DataCell> = []; // data

  mustSetArray = false;
  dataArrays = [];
  displaySettings: boolean; // weather the settings are displayed above the table or not
  displaySettingsChange: Subscription; // change is triggered from within the table component, so we subscribe to that

  constructor(private dataService: DataListViewInAppQueryService,
              private displayedCollumnsService: DisplayedCollumnsService,
              private settingsService: SettingsService,
              private originalColumnService: OriginalColumnService
              ) {

    this.displaySettingsChange = this.settingsService.settingsOpenStateChange.subscribe(oState => this.displaySettings = oState);
  }

  ngOnChanges() {
    if (typeof this.dataListSettings === 'string') {
      this.dataListSettingsOut = JSON.parse( this.dataListSettings as any );
    } else {this.dataListSettingsOut = this.dataListSettings; }
    if (this.dataListSettingsOut && this.dataListSettingsOut.pathToDataArray !== '' ) {
       this.onGetData(); } else {
      if (this.dataListSettingsOut && this.dataListSettingsOut.jsonType === 'sparql') {
        this.dataListSettingsOut.pathToDataArray = 'results.bindings';
      } else {
        if (this.queryResponse ) {
          this.getArraysFromJson(this.queryResponse);
          this.mustSetArray = true;
        }
      }
    }

  }

  generateTableData(responseData: any, depth: number) {
    // returns the array at the node defined by pathToArray variable (path string with dot notation)
    const dataArray =  this.dataListSettingsOut.pathToDataArray.split('.').reduce((a, b) => a[b], responseData);
    this.createGenericData(dataArray);
  }

  createGenericData(dataArray: Array<any>) {
    if (this.dataListSettingsOut.jsonType === 'sparql') {
      this.tableData = dataArray;
    } else {
      let length = 0;
      for (const entry of dataArray) {
        this.flattenAndAssignObjects(entry, length);
        length += 1;
      } this.tableData = this.generatedData;
    }

  }

  /*
  appendEntryToTabledata(ResponseEntry: any, depth: number, length: number, pathCompare?: Array<string>) {
    // recursive method for getting the actual values from nested jsons
    // and appending them to the tabledata. Allowed values are strings,
    // numbers, symbols and booleans. Objects can not be used here). If it is an object,
    // it will try to flatten that by calling this very method recursively.
    for (const column of this.dataListSettingsOut.columns.columnMapping) {
      if (typeof ResponseEntry[column.path[depth]] !== 'object' &&
        typeof ResponseEntry[column.path[depth]] !== 'undefined' ) {
        // checks if the path of a recursive function call is the same as in the column
        // generated by the for of loop. This is necessary if more than one column may have the same segment names
        // but in different depths / paths.
        if (pathCompare === undefined || pathCompare === column.path) {
          this.append(ResponseEntry[column.path[depth]], column.name, length);
        }
      } else if (typeof ResponseEntry[column.path[depth]] === 'object') {
        this.appendEntryToTabledata(ResponseEntry[column.path[depth]], depth + 1, length, column.path);
      }
    }
  }

  append(entry: string, name: string, length: number) {
    // is appending the collected values to the tabledata
    if (this.generatedData[length] === undefined) {
      this.generatedData[length] = {};
    }
    this.generatedData[length][name] = entry;
    if (this.generatedData.length === this.queryResponse.length) {
      this.tableData = this.generatedData;
    }
  }

*/

  flattenAndAssignObjects(input, length, reference?, output?) {
    // FLATTENS the objects completely and assigns the result to generatedData.
    output = output || {};
    for (let key of Object.keys(input)) {
      const value = input[key];
      if (reference) {
        key = reference + '.' + key;
      }
      if (typeof value === 'object' && value !== null) {
        this.flattenAndAssignObjects(value, length, key, output);
      } else {
        output[key] = new DataCell(value, 'literal', '');
      }
    }
    this.generatedData[length] = output;
  }

  getArraysFromJson(input, reference?, output?) {
    output = output || '';
    // FLATTENS the objects completely and assigns the result to generatedData.
    for (const key of Object.keys(input))  {
      const value = input[key];
      if (reference && Array.isArray(value)) {
        if (output !== '') {output = reference + '.' + key; } else {output = key; }
        if ( this.dataArrays.indexOf(output) === -1 ) { // if the path is not yet in dataArrays
          this.dataArrays.push(output); }
      }
      if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
        if (output !== '') {output = output + '.' + key; } else {output = key; }
        this.getArraysFromJson(value, key, output);
      }
      if (!reference && Array.isArray(value)) {
        if ( this.dataArrays.indexOf(value) === -1 ) { // if the path is not yet in dataArrays
          this.dataArrays.push(value); }
      }
    }
  }


  // GET the data - either by a passed input from another app/service or by a passed query
  private onGetData() {
    if ( this.dataListSettingsOut.inputMode === 'query' ) {
      this.getTableDataFromQuery(this.query);
      }
    if ( this.dataListSettingsOut.inputMode === 'input') {
        const originalColumns = this.displayedCollumnsService.setInitialDisplayedColumns(this.dataListSettingsOut, this.queryResponse);
        this.generateTableData(this.queryResponse, 0);
      } else { console.log('Wrong dataListSettings definition for --> \"inputmode: ' + this.dataListSettingsOut.inputMode +
      '\" allowed are: input, query'); }
    }

  private getTableDataFromQuery(query) {
    this.dataService.getData( this.query ).subscribe(data => {
      const responseData: any = data;
      this.queryResponse = responseData.results.bindings;
      this.generateTableData(this.queryResponse, 0);
      const originalColumns = this.displayedCollumnsService.setInitialDisplayedColumns(this.dataListSettingsOut, this.queryResponse);
      this.originalColumnService.setOriginalDisplayedColumns(originalColumns);
    });
  }
}
