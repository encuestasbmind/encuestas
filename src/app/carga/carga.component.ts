import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CargaService } from './carga.service';
import { HttpClient, HttpErrorResponse , HttpHeaders, HttpHandler} from '@angular/common/http';

@Component({
  templateUrl: './carga.component.html'
})
export class CargaComponent {
  
  public pageTitle = 'Reporte';

  @ViewChild('fileInput') inputEl: ElementRef;

  cargaid:string;
  errorMessage: string;

  constructor(private cargaService: CargaService, 
              private elem: ElementRef) {}

  getCarga(): void {
    console.log('Recibido: ' + this.cargaid);
  }

  changeListener($event) : void {
      
    let inputEl: HTMLInputElement = this.inputEl.nativeElement;
    let fileCount: number = inputEl.files.length;
    
    let files = this.elem.nativeElement.querySelector('#selectFile').files;
    let file = files[0];
    console.log(file);
    let formData = new FormData();
    if (fileCount > 0) { 
      formData.append('user_file', inputEl.files.item(0));
      console.log(inputEl.files.item(0));
      console.log('FormData ' + formData);
      console.log('FormDataGet ' + formData.get('user_file').toString);
      this.cargaService.createEventos(formData)
      .subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
      );   
      
    }  
      
  }

  readThis(inputValue: any) : void {
    console.log('Leyendo archivo');
    var file:File = inputValue.files[0]; 
    var myReader:FileReader = new FileReader();
    
    var valueToSend;
    myReader.onloadend = function(e):string{

      console.log(myReader.result);
      return "test";

    }

    var xxx = myReader.readAsText(file);
    console.log("Retornado " + xxx);
    
    
  }

  onSaveComplete(): void {
    console.log("Archivo cargado");
    this.errorMessage = 'El archivo se cargo correctamente';
  }

  public uploadImage(): void {
    let files = this.elem.nativeElement.querySelector('#selectFile').files;
    let formData = new FormData();
    let file = files[0];
    console.log("File " + file);
    formData.append('user_file', file, file.name);
    this.cargaService.createEventos(formData)
    .subscribe(
        () => this.onSaveComplete(),
        //(error: any) => this.errorMessage = <any>error
        (error: any) => this.errorMessage = 'El archivo se cargo correctamente'
    ); 

  }
}

   