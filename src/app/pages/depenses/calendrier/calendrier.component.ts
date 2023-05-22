import { Component, ChangeDetectorRef, ViewChild} from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from 'src/app/event-utils';

import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calendrier',
  templateUrl:'./calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent {
  @ViewChild('modal')
  private modalComponent!: ModalComponent;
  @ViewChild('modalNew')
  private modalComponentNew!: ModalComponent;
  calendarVisible = true;
  events:EventInput[] = [
    // Provide your event data here
    {
      title: 'Event 1',
      start: '2023-05-19',

      color:'red'
    },
    {
      title: 'Event 2',
      start: '2023-05-20',
      color:'green'
    },
    // Add more events as needed
  ]
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
    //initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    events: this.events,
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
  newequiForm: FormGroup;
  submitted = false;
  @ViewChild("content") content:any;
  @ViewChild("contentUpdate") contentUpdate:any;
  startDate :any;
  constructor(private changeDetector: ChangeDetectorRef,private modalService: NgbModal,private fb: FormBuilder) {
    this.newequiForm = this.fb.group({
      nom: ['', Validators.required],
      prix: ['', Validators.required],
      description: ['', Validators.required],
      equipment_type_id: ['', Validators.required]

    })
  }
  get f() { return this.newequiForm.controls; }
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
    this.modalService.open(this.content)
    this.startDate = selectInfo.startStr;

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
    console.log('args' , args.event)
    this.newequiForm.get('nom')?.setValue("habb")
     //this.modalComponent.edit(args.event)
     this.modalService.open(this.contentUpdate);
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  onSubmit()
  {
    this.events = [];
    this.events.push( {
      title: 'Event 1',
      start: '2023-05-19'
    } ,  {
      title: 'Event 2',
      start: '2023-05-20'
    }
   )
    console.log('data' , this.startDate);
    this.modalService.dismissAll()
    this.events.push({
      id: this.newequiForm.value.id,
      title: this.newequiForm.value.nom,
      start: this.startDate
    })

    this.calendarOptions = {
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
      //initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
      events: this.events,
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
  }
}