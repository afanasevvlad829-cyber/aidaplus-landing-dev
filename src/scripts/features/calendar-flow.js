/* src/scripts/features/calendar-flow.js */
(function(){
  function createCalendarFlow(ctx = {}){
    const getShifts = typeof ctx.getShifts === 'function' ? ctx.getShifts : (() => []);
    const bookingText = typeof ctx.bookingText === 'function' ? ctx.bookingText : (() => '');
    const calendarWeekdaysShort = typeof ctx.calendarWeekdaysShort === 'function' ? ctx.calendarWeekdaysShort : (() => []);
    const calendarMonthNames = typeof ctx.calendarMonthNames === 'function' ? ctx.calendarMonthNames : (() => []);
    const closeTransientModals = typeof ctx.closeTransientModals === 'function' ? ctx.closeTransientModals : (() => {});
    const emitModularEvent = typeof ctx.emitModularEvent === 'function' ? ctx.emitModularEvent : (() => {});
    const track = typeof ctx.track === 'function' ? ctx.track : (() => {});
    const getShiftOptionPanels = typeof ctx.getShiftOptionPanels === 'function' ? ctx.getShiftOptionPanels : (() => ({
      desktop:{aboutId:null, calendarId:null},
      mobile:{aboutId:null, calendarId:null}
    }));
    const setShiftOptionPanels = typeof ctx.setShiftOptionPanels === 'function' ? ctx.setShiftOptionPanels : (() => {});
    const renderShiftOptions = typeof ctx.renderShiftOptions === 'function' ? ctx.renderShiftOptions : (() => {});

    function parseShiftDate(dateStr){
      const m = String(dateStr || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if(!m) return null;
      return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    }

    function renderCalendar(shift){
      const grid = document.getElementById('calendarGrid');
      const title = document.getElementById('calendarTitle');
      if(!grid || !title || !shift) return;

      const start = parseShiftDate(shift.start);
      const end = parseShiftDate(shift.end);
      if(!start || !end) return;

      const ruWeek = calendarWeekdaysShort();
      const ruMonth = calendarMonthNames();

      title.textContent = `${start.toLocaleDateString('ru-RU')} — ${end.toLocaleDateString('ru-RU')}`;

      const firstMonth = new Date(start.getFullYear(), start.getMonth(), 1);
      const lastMonth = new Date(end.getFullYear(), end.getMonth(), 1);
      const cursor = new Date(firstMonth);
      const isMultiMonthRange = firstMonth.getTime() !== lastMonth.getTime();
      let html = '';

      while(cursor <= lastMonth){
        const year = cursor.getFullYear();
        const month = cursor.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        let displayFrom = 1;
        let displayTo = daysInMonth;

        if(isMultiMonthRange){
          const isFirst = year === firstMonth.getFullYear() && month === firstMonth.getMonth();
          const isLast = year === lastMonth.getFullYear() && month === lastMonth.getMonth();
          if(isFirst){
            displayFrom = Math.max(1, daysInMonth - 13);
          }else if(isLast){
            displayTo = Math.min(daysInMonth, 14);
          }
        }

        const leading = new Date(year, month, displayFrom).getDay();
        html += `
          <div class="calendar-month">
            <div class="calendar-month-title">${ruMonth[month]} ${year}</div>
            <div class="calendar-month-grid">
        `;

        for(let i = 0; i < leading; i += 1){
          html += '<div class="calendar-day empty"></div>';
        }
        for(let day = displayFrom; day <= displayTo; day += 1){
          const d = new Date(year, month, day);
          const isInRange = d >= start && d <= end;
          html += `
            <div class="calendar-day ${isInRange ? 'active' : ''}">
              <span>${day}</span>
              <small>${ruWeek[d.getDay()]}</small>
            </div>
          `;
        }
        html += '</div></div>';
        cursor.setMonth(cursor.getMonth() + 1);
      }

      grid.innerHTML = html;
    }

    function renderSeasonCalendar(){
      const grid = document.getElementById('calendarGrid');
      const title = document.getElementById('calendarTitle');
      if(!grid || !title) return;
      const shifts = getShifts();
      const seasonShifts = shifts
        .map((shift, idx) => ({
          ...shift,
          startDate: parseShiftDate(shift.start),
          endDate: parseShiftDate(shift.end),
          colorIndex: idx % 6
        }))
        .filter((shift) => shift.startDate && shift.endDate)
        .sort((a, b) => a.startDate - b.startDate);
      if(!seasonShifts.length) return;
      const seasonShiftById = new Map(seasonShifts.map((shift) => [shift.id, shift]));

      const ruWeek = calendarWeekdaysShort();
      const ruMonth = calendarMonthNames();
      const colorPalette = ['#ff8a00', '#38bdf8', '#a78bfa', '#22c55e', '#f43f5e', '#f59e0b'];
      const minStart = seasonShifts[0].startDate;
      const maxEnd = seasonShifts[seasonShifts.length - 1].endDate;
      const firstMonth = new Date(minStart.getFullYear(), minStart.getMonth(), 1);
      const lastMonth = new Date(maxEnd.getFullYear(), maxEnd.getMonth(), 1);
      const cursor = new Date(firstMonth);

      title.textContent = bookingText('seasonCalendarTitle');
      let html = '';

      while(cursor <= lastMonth){
        const year = cursor.getFullYear();
        const month = cursor.getMonth();
        if(month === 6){
          cursor.setMonth(cursor.getMonth() + 1);
          continue;
        }
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const leading = new Date(year, month, 1).getDay();
        html += `
          <div class="calendar-month">
            <div class="calendar-month-title">${ruMonth[month]} ${year}</div>
            <div class="calendar-month-grid">
        `;
        const cells = [];
        for(let i = 0; i < leading; i += 1){
          cells.push({ empty: true, hasShift: false, html: '<div class="calendar-day empty"></div>' });
        }
        for(let day = 1; day <= daysInMonth; day += 1){
          const date = new Date(year, month, day);
          const matched = seasonShifts.filter((shift) => date >= shift.startDate && date <= shift.endDate);
          const parentOverlays = matched
            .map((shift) => (shift.sourceId ? seasonShiftById.get(shift.sourceId) : null))
            .filter((shift) => shift && date >= shift.startDate && date <= shift.endDate);
          parentOverlays.forEach((parentShift) => {
            if(!matched.some((shift) => shift.id === parentShift.id)){
              matched.push(parentShift);
            }
          });
          matched.sort((a, b) => {
            if(a.id === 'shift-2' && b.id !== 'shift-2') return -1;
            if(b.id === 'shift-2' && a.id !== 'shift-2') return 1;
            const aChild = !!a.sourceId;
            const bChild = !!b.sourceId;
            if(aChild !== bChild) return aChild ? 1 : -1;
            return (a.startDate - b.startDate) || String(a.id).localeCompare(String(b.id));
          });
          if(!matched.length){
            cells.push({
              empty: false,
              hasShift: false,
              html: `<div class="calendar-day"><span>${day}</span><small>${ruWeek[date.getDay()]}</small></div>`
            });
            continue;
          }
          const primary = matched[0];
          const multi = matched.length > 1;
          const hasParentOverlay = matched.some((shift) => shift.id === 'shift-2') && matched.some((shift) => shift.sourceId === 'shift-2');
          const parentShift = matched.find((shift) => shift.id === 'shift-2') || null;
          const childShift = matched.find((shift) => shift.sourceId === 'shift-2') || matched[1] || matched[0];
          const mixA = colorPalette[matched[0].colorIndex] || colorPalette[0];
          const mixB = colorPalette[matched[1]?.colorIndex ?? matched[0].colorIndex] || colorPalette[1];
          const mixC = colorPalette[matched[2]?.colorIndex ?? matched[0].colorIndex] || colorPalette[2];
          const parentOverlayColor = colorPalette[parentShift?.colorIndex ?? matched[0].colorIndex] || colorPalette[0];
          const childOverlayColor = colorPalette[childShift?.colorIndex ?? matched[1]?.colorIndex ?? matched[0].colorIndex] || colorPalette[1];
          const overlayColorStyle = `--shift-mix-a:${mixA};--shift-mix-b:${mixB};--shift-mix-c:${mixC};` +
            `--parent-overlay-color:${parentOverlayColor};--child-overlay-color:${childOverlayColor};`;
          const shiftClasses = [
            `shift-color-${primary.colorIndex}`,
            multi ? `multi stack-${Math.min(matched.length, 4)}` : '',
            hasParentOverlay ? 'has-parent-overlay' : ''
          ].filter(Boolean).join(' ');
          const shiftTitle = matched.map((shift) => `${shift.label || shift.title}: ${shift.dates}`).join(' · ');
          cells.push({
            empty: false,
            hasShift: true,
            html: `<div class="calendar-day active ${shiftClasses}" style="${overlayColorStyle}" title="${shiftTitle}"><span>${day}</span><small>${ruWeek[date.getDay()]}${multi ? ` · ${matched.length}` : ''}</small></div>`
          });
        }
        while(cells.length % 7 !== 0){
          cells.push({ empty: true, hasShift: false, html: '<div class="calendar-day empty"></div>' });
        }
        for(let i = 0; i < cells.length; i += 7){
          const week = cells.slice(i, i + 7);
          if(!week.some((cell) => cell.hasShift)) continue;
          html += `<div class="calendar-week">${week.map((cell) => cell.html).join('')}</div>`;
        }
        html += '</div></div>';
        cursor.setMonth(cursor.getMonth() + 1);
      }

      grid.innerHTML = html;
    }

    function openCalendar(shiftId){
      const shifts = getShifts();
      const shift = shifts.find((s) => s.id === shiftId);
      if(!shift) return;
      closeTransientModals('calendar');
      renderCalendar(shift);
      document.getElementById('calendarModal')?.classList.remove('hidden');
      emitModularEvent('calendar:opened', {
        mode: 'shift',
        shiftId: shift.id,
        shiftLabel: shift.label || shift.title || ''
      });
    }

    function openSeasonCalendar(){
      closeTransientModals('calendar');
      renderSeasonCalendar();
      document.getElementById('calendarModal')?.classList.remove('hidden');
      emitModularEvent('calendar:opened', {
        mode: 'season',
        shiftId: '',
        shiftLabel: ''
      });
      track('season_calendar_open');
    }

    function closeCalendar(){
      document.getElementById('calendarModal')?.classList.add('hidden');
      emitModularEvent('calendar:closed', { mode: 'modal' });
    }

    function toggleShiftOptionPanel(viewKey, panelType, shiftId){
      const safeView = viewKey === 'mobile' ? 'mobile' : 'desktop';
      const panels = getShiftOptionPanels();
      const current = panels[safeView]?.[panelType] || null;
      const nextPanels = {
        ...panels,
        [safeView]: {
          ...(panels[safeView] || {}),
          [panelType]: current === shiftId ? null : shiftId
        }
      };
      setShiftOptionPanels(nextPanels);
      renderShiftOptions(safeView);
    }

    function clearShiftOptionPanels(){
      setShiftOptionPanels({
        desktop:{aboutId:null, calendarId:null},
        mobile:{aboutId:null, calendarId:null}
      });
    }

    return Object.freeze({
      parseShiftDate,
      renderCalendar,
      renderSeasonCalendar,
      openCalendar,
      openSeasonCalendar,
      closeCalendar,
      toggleShiftOptionPanel,
      clearShiftOptionPanels
    });
  }

  window.AC_FEATURES = window.AC_FEATURES || {};
  window.AC_FEATURES.calendarFlow = Object.freeze({ create: createCalendarFlow });
})();
