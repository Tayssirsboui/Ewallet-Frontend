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
import { Depense } from 'src/app/models/depense.model';
import { BackendService } from 'src/app/_services/backend.service';
import { CategorieService } from 'src/app/_services/categorie.service';
import { Categorie } from 'src/app/categorie';

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css'],
})
export class CalendrierComponent implements OnInit{
  @ViewChild('fullCalendar') fullCalendar: FullCalendarComponent;

  @ViewChild('modalNew') modalNew: ElementRef;
  @ViewChild('modalUpdate') modalUpdate: ElementRef;
  currentItem: Depense
  depenses: any[] = [];
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
   events:this.depenses,
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
  nouvelledepenseForm: FormGroup;
  userdata:any;
  userId:number ; 
  categorieList:Categorie[] = [] ;
  depenseDate:Date = new Date() ;
  constructor(
    private changeDetector: ChangeDetectorRef,
    private modalService: NgbModal,
    private backendService: BackendService,
    private fb: FormBuilder,
    private categorieService:CategorieService
  ) {
    this.userdata=JSON.parse(sessionStorage.getItem('auth-user')!)
    this.userId = this.userdata.idUtilisateur ; 
    this.nouvelledepenseForm = this.fb.group({
      description: ['', Validators.required],
      montant: ['', Validators.required],
   
      categorieId:1,
      userId:[]

    })
  
  }
  ngOnInit(): void {
    this.getAllCategories()
    this.getAllDepenses()
  }

  getAllDepenses()
  {
    this.backendService.getAllDepenses().subscribe((response) => {
      this.depenses = response;
      const events: any = [];

      // debugger
      this.depenses.forEach((item: any) => {
        // debugger
        const event = {
          id: item.idDepense,
          title: item.description + '-' + '-' + item.montant,
          start: item.date,
          allDay: true,
        };
        events.push(event);
      });
      this.depenses = events;
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
    this.nouvelledepenseForm.reset()
    this.modalService.open(this.modalNew)
    this.depenseDate =  selectInfo.start ; 
   
  }

  getDepense(id:number)
  {
    this.backendService
    .getDepenseById(id)
    .subscribe((res) => {
      console.log('res ' , res)
      // debugger;
      this.currentItem = res;
    } , error => {
      console.error(error)
    } , () =>{
        this.nouvelledepenseForm.patchValue(
          {
            "description":this.currentItem.description ,
            "montant":this.currentItem.montant ,
            "categorieId":this.currentItem.categorieId
          }
        )
    });
  }
  //  edit function
  handleEventClick(args: any) {
    this.getDepense( args.event.id)
    

    this.modalService.open(this.modalUpdate)

  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
 
 

  addDepense(){
    if (this.nouvelledepenseForm.invalid) {
      // debugger 
      return;
    } else {
      this.nouvelledepenseForm.get("userId")?.setValue(this.userId);
      this.nouvelledepenseForm.get("userId")?.updateValueAndValidity()
      
      let data :any = this.nouvelledepenseForm.value ; 
      data.date = this.depenseDate ; 
      this.backendService.saveDepense(data).subscribe(
       
        (response:any) => {
          this.modalService.dismissAll();
          this.getAllDepenses()
          this.depenseDate = new Date() ; 
          console.log('Success:', response);
  
        },
        ( error: any) => {
          console.error('Error:', error);
        }
      );
    }
   }

   getAllCategories()
   {
    this.categorieService.findAll().subscribe(
      res => {
        this.categorieList = res 
      } , error => {
        console.error(error)
      }
    )
   }

   updateDepense(){
    if (this.nouvelledepenseForm.invalid) {
      // debugger 
      return;
    } else {
     
      
      let data :any = this.nouvelledepenseForm.value ; 
     data.idDepense = this.currentItem.idDepense;
     data.date = this.currentItem.date;
     data.userId = this.currentItem.userId
     console.log('data ' , data)
      this.backendService.saveDepense(data).subscribe(
       
        (response:any) => {
          this.modalService.dismissAll();
          this.getAllDepenses()
          this.depenseDate = new Date() ; 
          console.log('Success:', response);
  
        },
        ( error: any) => {
          console.error('Error:', error);
        }
      );
    }
   }
}
