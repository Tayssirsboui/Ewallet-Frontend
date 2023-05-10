import { Component, ChangeDetectorRef, ViewChild} from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from 'src/app/event-utils';

import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';

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

  constructor(private changeDetector: ChangeDetectorRef,private modalService: NgbModal) {
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
    this.modalComponentNew.new()


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
     this.modalComponent.edit(args.event)
    // this.modalService.open(modal);
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
}