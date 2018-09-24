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

  constructor(private cargaService: CargaService) {}

  getCarga(): void {
    console.log('Recibido: ' + this.cargaid);
  }

  changeListener($event) : void {
    this.readThis($event.target);
    /*let reader = new FileReader();
    if($event.target.files && $event.target.files.length > 0) {
      let file = $event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {

        console.log(reader.result);
      }
    }*/
      //console.log(file);
      //console.log(file.result);
      /*
    let inputEl: HTMLInputElement = this.inputEl.nativeElement;
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    if (fileCount > 0) { // a file was selected
      for (let i = 0; i < fileCount; i++) {
          formData.append('file[]', inputEl.files.item(i));
      }

      console.log(inputEl.files.item(0));
      this.cargaService.createEventos(inputEl.files.item(0))
      .subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
      );   */
      //console.log(inputEl.files.item(1));

      //this.http
      //    .post('http://your.upload.url', formData)
          // do whatever you do...
          // subscribe to observable to listen for response
  //}  
      
  }

  readThis(inputValue: any) : void {
    console.log('Leyendo archivo');
    var file:File = inputValue.files[0]; 
    var myReader:FileReader = new FileReader();
    
    var valueToSend;
    myReader.onloadend = function(e):string{
      // you can perform an action with readed data here
      //handler:HttpHandler = new HttpHandler();
      //http:HttpClient = new HttpClient(handler);
      console.log(myReader.result);
      return "test";
      //cargaService.createCursos(myReader.result)
      //.subscribe(
      //    () => this.onSaveComplete(),
      //    (error: any) => this.errorMessage = <any>error
      //);
    }

    var xxx = myReader.readAsText(file);
    //xxx = myReader.onloadend(file);
    console.log("Retornado " + xxx);
    
    
  }

  onSaveComplete(): void {
    console.log("Archivo cargado");
  }
}

   