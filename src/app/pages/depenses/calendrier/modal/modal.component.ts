import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core'
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
  @Input()
  public modalConfig!: ModalConfig
  @ViewChild('modal')
  private modalContent!: TemplateRef<ModalComponent>
  private modalRef!: NgbModalRef
  public title = ""
  public start = ""
  public id = ""
  neweventForm: FormGroup;
  submitted = false;
  Data:any;

  // selectedEvent

  constructor(private modalService: NgbModal,private fb: FormBuilder,private backendService: BackendService) {
    this.neweventForm = this.fb.group({
      description: ['', Validators.required],
      montant: ['', Validators.required],

    })
  }
  get f() { return this.neweventForm.controls; }


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


  Newevent() {
    this.Data = {

        description: this.neweventForm?.get("description")?.value,
        montant: this.neweventForm?.get("montant")?.value,

      },

    // debugger
    this.submitted = true;
    debugger
    if (this.neweventForm.invalid) {
      return;
    } else {
      this.backendService.createEvent(this.Data).subscribe(
        (response:any) => {
          console.log('Success:', response);

        },
        ( error: any) => {
          console.error('Error:', error);
        }
      );
    }
    this.submitted = false;
  }

}