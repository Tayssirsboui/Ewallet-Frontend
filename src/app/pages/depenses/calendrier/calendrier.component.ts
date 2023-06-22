import { Component, ChangeDetectorRef, ViewChild, Input } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/core';
import { MatDialog } from '@angular/material/dialog';

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
import { ModalComponent } from './modal/modal.component';
import { ModalNewComponent } from './modal-new/modal-new.component';

import { FullCalendarComponent } from '@fullcalendar/angular';
import { Depense } from 'src/app/models/depense.model';
import { BackendService } from 'src/app/_services/backend.service';

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css'],
})
export class CalendrierComponent {
  @ViewChild('fullCalendar') fullCalendar: FullCalendarComponent;

  @ViewChild('modal')
  private modalComponent!: ModalComponent;
  @ViewChild('modalnew')
  private modalNewComponent!: ModalNewComponent;
  // depenses= [];
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
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
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

  modalConfigg = {
    modalTitle: 'Ajouter Dépense',
    dismissButtonLabel: 'save',
    closeButtonLabel: 'Annuler',
  };

  currentEvents: EventApi[] = [];
  calendarEvents: any[] = [];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private modalService: NgbModal,
    private dialog: MatDialog,
    private backendService: BackendService
  ) {
    this.backendService.getDepense().subscribe((response) => {
      this.depenses = response;
      const events: any = [];

      // debugger
      this.depenses.forEach((item: any) => {
        // debugger
        const event = {
          id: item.idDepense,
          title: item.description + '-' + item.idDepense + '-' + item.montant,
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

  
  handleDateSelect(selectInfo: DateSelectArg) {

    this.modalNewComponent.new();

  
  }
  
  //  new function
  /*handleDateSelect(selectInfo: DateSelectArg) {
    // model Event
    // new Event()
    // debugger;
    debugger
    this.modalNewComponent.new();
    

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
  }*/

  //  edit function
  handleEventClick(args: any) {
    this.modalComponent.edit(args.event);

    this.backendService
      .getDepenseById(Number(args.event._def.title.split('-')[1]))
      .subscribe((response) => {
        // debugger;
        this.currentItem = response;
      });
    // this.modalService.open(modal);
    
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
  addEventToCalendar(event: any) {
    const calendarApi = this.fullCalendar.getApi();

    const newEvent = {
      title: event.title,
      start: event.start,
      description: event.description,
      montant: event.montant,
    };

    calendarApi.addEvent(newEvent);
  }
  handleEventCreated(event: any) {
    // debugger;
    console.log('Nouvel événement créé :', event);
    this.calendarEvents.push(event);
    this.addEventToCalendar(event);
  }
}
