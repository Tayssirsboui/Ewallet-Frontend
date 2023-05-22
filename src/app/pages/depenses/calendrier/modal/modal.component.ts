import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
import { ModalConfig } from './modal.config'

@Component({
  selector: 'custom-modal',
  templateUrl: './modal.component.html'
})
@Injectable()
export class ModalComponent implements OnInit {
  @Input()
  public modalConfig!: ModalConfig
  @ViewChild('modal')
  private modalContent!: TemplateRef<ModalComponent>
  private modalRef!: NgbModalRef
  public title = ""
  public start = ""
  public id = ""
  newequiForm: FormGroup;
  submitted = false;
  myForm: any;
  backendService: any;


  // selectedEvent

  constructor(private modalService: NgbModal,private fb: FormBuilder,) {
    this.newequiForm = this.fb.group({
      nom: ['', Validators.required],
      prix: ['', Validators.required],
      description: ['', Validators.required],
      equipment_type_id: ['', Validators.required]

    })
  }
  get f() { return this.newequiForm.controls; }


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
    if (this.modalConfig.shouldDismiss === undefined || (await this.modalConfig.shouldDismiss())) {
      const result = this.modalConfig.onDismiss === undefined || (await this.modalConfig.onDismiss())
      this.modalRef.dismiss(result)
    }
  }
  onSubmit() {
    this.submitted=true
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      
      this.backendService.postFormData(formData).subscribe(
        (        response: any) => {
          console.log('Success:', response);
          // Faire quelque chose en cas de succès
        },
        (        error: any) => {
          console.error('Error:', error);
          // Faire quelque chose en cas d'erreur
        }
      );
    }
  }
}