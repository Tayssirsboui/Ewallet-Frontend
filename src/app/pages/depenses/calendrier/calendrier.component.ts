import { Component, ChangeDetectorRef, ViewChild} from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from 'src/app/event-utils';

import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import {  OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import {Validation} from 'src/app/utils/validation';
@Component({
  selector: 'app-calendrier',
  templateUrl:'./calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent implements OnInit
{
  

  form: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  submitted = false;
  

  @ViewChild('modal')
  private modalComponent!: ModalComponent;
  @ViewChild('modalNew')
 
  private modalComponentNew!: ModalComponent;

  @ViewChild('content')
  private content:any
 
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };

  modalConfig = {
    modalTitle: "SHOW event",
    dismissButtonLabel: "save",
    closeButtonLabel: "close",
  }

  modalConfigNew = {
    modalTitle: "New event",
    dismissButtonLabel: "save",
    closeButtonLabel: "close",
  }


  currentEvents: EventApi[] = [];

  constructor(private changeDetector: ChangeDetectorRef,private modalService: NgbModal,private formBuilder: FormBuilder) {
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
    // model Event
    // new Event()
    //this.modalComponentNew.new()
    this.modalService.open(this.content,{ windowClass: 'customModal', backdrop: 'static', keyboard: false, centered: true })

    // const title = prompt('Please enter a new title for your event');
    // const calendarApi = selectInfo.view.calendar;

    // calendarApi.unselect(); // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   });
    // }
  }
  

  //  edit function
  handleEventClick(args: any) {
     this.modalComponent.open(args.event)
    // this.modalService.open(modal);
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
  ngOnInit():void{this.form = this.formBuilder.group(
    {
      fullname: ['', Validators.required],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]
      ],
      email: ['', [Validators.required, Validators.email]],
    //   password: [
    //     '',
    //     [
    //       Validators.required,
    //       Validators.minLength(6),
    //       Validators.maxLength(40)
    //     ]
    //   ],
    //   confirmPassword: ['', Validators.required],
    //   acceptTerms: [false, Validators.requiredTrue]
    // },
    // {
    //   validators: [Validation.match('password', 'confirmPassword')]
    // }
  // );}
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}

