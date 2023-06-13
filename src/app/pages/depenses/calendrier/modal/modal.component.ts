import { Component, EventEmitter, Injectable, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
import { BackendService } from 'src/app/_services/backend.service';
import { ModalConfig } from './modal.config'

@Component({
  selector: 'custom-modal',
  templateUrl: './modal.component.html'
})
@Injectable()
export class ModalComponent implements OnInit {
  @Output() eventCreated: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  public modalConfig!: ModalConfig
  @ViewChild('modal')
  private modalContent!: TemplateRef<ModalComponent>
  private modalRef!: NgbModalRef
  public title = ""
  public start = ""
  public id = ""
  nouvelledepenseForm: FormGroup;
  submitted = false;
  Data:any;
  userdata:any;

  // selectedEvent
  
  constructor(private modalService: NgbModal,private fb: FormBuilder,private backendService: BackendService) {
    this.nouvelledepenseForm = this.fb.group({
      description: ['', Validators.required],
      montant: ['', Validators.required],
      // user_id:['', Validators.required],
      date:['',Validators.required],

    })
    this.userdata=JSON.parse(sessionStorage.getItem('auth-user')!)
  }
  get f() { return this.nouvelledepenseForm.controls; }


  ngOnInit(): void { }

  // Event /model/event
  edit(event: {id: string, title: string, start: string }): Promise<boolean> {
    this.id = event.id
    this.title = event.title
    this.start = event.start
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalContent)
      this.modalRef.result.then(resolve, resolve)
    })
  }

  new(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalContent)
      this.modalRef.result.then(resolve, resolve)
    })
  }

  async close(): Promise<void> {
    if (this.modalConfig.shouldClose === undefined || (await this.modalConfig.shouldClose())) {
      const result = this.modalConfig.onClose === undefined || (await this.modalConfig.onClose())

      this.modalRef.close(result)
    }
  }


  async dismiss(): Promise<void> {
    this.Data = {

      description: this.nouvelledepenseForm?.get("description")?.value,
      montant: this.nouvelledepenseForm?.get("montant")?.value,
      userId:this.userdata.idUtilisateur,
      date: this.nouvelledepenseForm?.get("date")?.value,
      categorieId:1


    },

  // debugger
  this.submitted = true;
  // debugger
  console.log(this.Data)
     
  if (this.nouvelledepenseForm.invalid) {
    // debugger 
    return;
  } else {
    this.backendService.createEvent(this.Data).subscribe(
     
      (response:any) => {
        // debugger
        
        console.log('Success:', response);

      },
      ( error: any) => {
        console.error('Error:', error);
      }
    );
  }
  this.submitted = false;
    
    
    if (this.modalConfig.shouldDismiss === undefined || (await this.modalConfig.shouldDismiss())) {
      const result = this.modalConfig.onDismiss === undefined || (await this.modalConfig.onDismiss())
      this.modalRef.dismiss(result)
    }
    this.eventCreated.emit({
      title: 'Nouvel événement',
      start: this.Data.date,
      description: this.Data.description,
      montant: this.Data.montant
    });
  }

 
  // Nouvelledepense() {
  //   this.Data = {

  //       description: this.nouvelledepenseForm?.get("description")?.value,
  //       montant: this.nouvelledepenseForm?.get("montant")?.value,
  //       userId:this.userdata.idUtilisateur,
  //       date: this.nouvelledepenseForm?.get("date")?.value,
  //       categorieId:1


  //     },

  //   // debugger
  //   this.submitted = true;
  //   // debugger
  //   console.log(this.Data)
       
  //   if (this.nouvelledepenseForm.invalid) {
  //     // debugger 
  //     return;
  //   } else {
  //     this.backendService.createEvent(this.Data).subscribe(
       
  //       (response:any) => {
  //         // debugger
          
  //         console.log('Success:', response);

  //       },
  //       ( error: any) => {
  //         console.error('Error:', error);
  //       }
  //     );
  //   }
  //   this.submitted = false;
  // }
  
  
}