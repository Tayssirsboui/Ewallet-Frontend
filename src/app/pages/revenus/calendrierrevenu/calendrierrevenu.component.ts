import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
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
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ModalComponent } from '../../depenses/calendrier/modal/modal.component';
import { BackendService } from 'src/app/_services/backend.service';
import { RevenusService } from 'src/app/_services/revenuservice.service';
import { co } from '@fullcalendar/core/internal-common';
@Component({
  selector: 'app-calendrierrevenu',
  templateUrl: './calendrierrevenu.component.html',
  styleUrls: ['./calendrierrevenu.component.css'],
})
export class CalendrierrevenuComponent {
  @ViewChild('fullCalendar') fullcalendar: FullCalendarComponent;
  @ViewChild('modal')
  private modalComponent!: ModalComponent;
  revenus: any[] = [];

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
    modalTitle: 'Modifier Revenu',
    dismissButtonLabel: 'save',
    closeButtonLabel: 'Annuler',
  };
  modalConfigNew = {
    modalTitle: 'Ajouter Revenu',
    dismissButtonLabel: 'save',
    closeButtonLabel: 'Annuler',
  };

  currentEvents: EventApi[] = [];
  calendarEvents: any[] = [];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private revenuservice: RevenusService
  ) {
    this.revenuservice.getAllRevenus().subscribe((response) => {
      this.revenus = response;
      const events: any = [];
      this.revenus.forEach((item: any) => {
        const event = {
          id: item.idRevenu,
          title: item.source + '-' + item.montant,
          start: item.date,
          allDay: true,
        };
        events.push(event);
      });
      debugger
      this.revenus = events;
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
    debugger;
  }

  handleEventClick(args: any) {
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove();
    // }
    debugger
    this.modalComponent.edit(args.event);
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  addEventToCalendar(event: any) {
    const calendarApi = this.fullcalendar.getApi();

    const newEvent = {
      title: event.title,
      start: event.start,
      source: event.source,
      montant: event.montant,
    };
    calendarApi.addEvent(newEvent);
  }

  handleEventCreated(event: any) {
    // debugger
    this.calendarEvents.push(event);
    this.addEventToCalendar(event);
  }
}
