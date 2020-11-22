<template>
  <FullCalendar :events="bookings" :options="options" />
</template>

<script>
import '@fullcalendar/core/main.min.css';
import '@fullcalendar/daygrid/main.min.css';
import '@fullcalendar/timegrid/main.min.css';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ref } from 'vue';
import { formatDate } from '@/helpers/date';
import FullCalendar from 'primevue/fullcalendar';

export default {
  components: { FullCalendar },
  props: {
    bookings: {
      type: Array,
      default: new Array()
    }
  },
  emits: ['click', 'fetch'],
  setup(props, { emit }) {
    const options = ref({
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: formatDate({ date: new Date() }),
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: false,
      defaultView: 'timeGridWeek',
      height: 'auto',
      eventClick: (e) => {
        //handle date click
        emit('click', e);
      },
      datesRender: (e) => {
        const start = e.view.activeStart;
        const end = e.view.activeEnd;
        emit('fetch', { start, end });
      }
    });

    return { event, options };
  }
};
</script>

<style lang="scss" scoped>
.fc {
  ::v-deep(.fc-event) {
    cursor: pointer;
  }
}
</style>
