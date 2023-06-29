import { Component, ChangeDetectorRef, ViewChild, Input ,ElementRef, OnInit } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from 'src/app/event-utils';

import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Revenu } from 'src/app/models/revenu.model';
import { BackendService } from 'src/app/_services/backend.service';
import { CategorieService } from 'src/app/_services/categorie.service';
import { Categorie } from 'src/app/categorie';
import { RevenusService } from 'src/app/_services/revenuservice.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-calendrierrevenu',
  templateUrl: './calendrierrevenu.component.html',
  styleUrls: ['./calendrierrevenu.component.css'],
})
export class CalendrierrevenuComponent {
  @ViewChild('fullCalendar') fullCalendar: FullCalendarComponent;

  @ViewChild('modalNew') modalNew: ElementRef;
  @ViewChild('modalUpdate') modalUpdate: ElementRef;
  currentItem: Revenu
  
  revenu: any[] = [];
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
   events:this.revenu,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),

    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };

  modalConfig = {
    modalTitle: 'Modifier Dépense',
    dismissButtonLabel: 'save',
    closeButtonLabel: 'Annuler',
  };

  modalConfigNew = {
    modalTitle: 'Ajouter Dépense',
    dismissButtonLabel: 'save',
    closeButtonLabel: 'Annuler',
  };

  currentEvents: EventApi[] = [];
  calendarEvents: any[] = [];
  nouvellerevenuForm: FormGroup;
  userdata:any;
  userId:number ; 
  // categorieList:Categorie[] = [] ;
  revenuDate:Date = new Date() ;
  constructor(
    private changeDetector: ChangeDetectorRef,
    private modalService: NgbModal,
    private revenuService: RevenusService,
    private fb: FormBuilder,
    private categorieService:CategorieService
  ) {
    this.userdata=JSON.parse(sessionStorage.getItem('auth-user')!)
    this.userId = this.userdata.idUtilisateur ; 
    this.nouvellerevenuForm = this.fb.group({
      description: ['', Validators.required],
      montant: ['', Validators.required],
   
      // categorieId:1,
      userId:[]

    })
  
  }
  ngOnInit(): void {
    // this.getAllCategories()
    this. getOwnRevenus()
  }

  
  getOwnRevenus()
  {
    this.revenuService. getOwnRevenus().subscribe((response) => {
      this.revenu = response;
      const events: any = [];

      // debugger
      this.revenu.forEach((item: any) => {
        // debugger
        const event = {
          id: item.idDepense,
          title: item.description + '-' + '-' + item.montant,
          start: item.date,
          allDay: true,
        };
        events.push(event);
      });
      this.revenu = events;
    });
  }
  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  //  new function
  handleDateSelect(selectInfo: DateSelectArg) {
    this.nouvellerevenuForm.reset()
    this.modalService.open(this.modalNew)
    this.revenuDate =  selectInfo.start ; 
   
  }

  getRevenu(id:number)
  {
    this.revenuService
    .getRevenuById(id)
    .subscribe((res) => {
      console.log('res ' , res)
      // debugger;
      this.currentItem = res;
    } , error => {
      console.error(error)
    } , () =>{
        this.nouvellerevenuForm.patchValue(
          {
            "description":this.currentItem.description ,
            "montant":this.currentItem.montant ,
            // "categorieId":this.currentItem.categorieId
          }
        )
    });
  }
  //  edit function
  handleEventClick(args: any) {
    this.getRevenu( args.event.id)
    

    this.modalService.open(this.modalUpdate)

  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
 
 

  addRevenu(){
    if (this.nouvellerevenuForm.invalid) {
      // debugger 
      return;
    } else {
      this.nouvellerevenuForm.get("userId")?.setValue(this.userId);
      this.nouvellerevenuForm.get("userId")?.updateValueAndValidity()
      
      let data :any = this.nouvellerevenuForm.value ; 
      data.date = this.revenuDate ; 
      this.revenuService.saveRevenu(data).subscribe(
       
        (response:any) => {
          this.modalService.dismissAll();
          this.getOwnRevenus()
          this.revenuDate = new Date() ; 
          console.log('Success:', response);
  
        },
        ( error: any) => {
          console.error('Error:', error);
        }
      );
    }
   }

  //  getAllCategories()
  //  {
  //   this.categorieService.findAll().subscribe(
  //     res => {
  //       this.categorieList = res 
  //     } , error => {
  //       console.error(error)
  //     }
  //   )
  //  }

  updateRevenu(){
    if (this.nouvellerevenuForm.invalid) {
      // debugger 
      return;
    } else {
     
      
      let data :any = this.nouvellerevenuForm.value ; 
     data.idDepense = this.currentItem.idRevenu;
     data.date = this.currentItem.date;
     data.userId = this.currentItem.userId
     console.log('data ' , data)
      this.revenuService.saveRevenu(data).subscribe(
       
        (response:any) => {
          this.modalService.dismissAll();
          this.getOwnRevenus()
          this.revenuDate = new Date() ; 
          console.log('Success:', response);
  
        },
        ( error: any) => {
          console.error('Error:', error);
        }
      );
    }
   }
   deleteRevenu() {
    if (this.currentItem) {
      this.revenuService.deleteRevenu(this.currentItem).subscribe(
        () => {
          this.modalService.dismissAll();
          this.getOwnRevenus();
          console.log('Dépense supprimée avec succès');
        },
        (error) => {
          console.error('Erreur lors de la suppression de la dépense', error);
        }
      );
    }
    Swal.fire({
      title: 'Êtes vous sûr ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, supprimez la!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Supprimée!',
          'Dépense supprimée.',
          'success'
        )
      }
    })
  }
}