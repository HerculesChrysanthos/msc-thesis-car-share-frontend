import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  setHours,
  setMinutes,
  addHours,
  isSameDay,
  startOfDay,
  endOfDay,
} from 'date-fns';
import { el } from 'date-fns/locale';
import { LuCalendarDays } from 'react-icons/lu';

function DatesSearch({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  handleStartDateChange,
  handleEndDateChange,
}) {
  const now = new Date();
  const nextHour = setMinutes(setHours(now, now.getHours() + 1), 0);

  return (
    <>
      <h2>Παραλαβή</h2>
      <div className='search'>
        <div className='input-container'>
          <div className='icon'>
            <LuCalendarDays />
          </div>
          <DatePicker
            wrapperClassName='datePicker'
            selected={startDate}
            onChange={handleStartDateChange}
            showTimeSelect
            timeFormat='HH:mm'
            timeIntervals={60}
            timeCaption='Ώρα'
            minDate={new Date()}
            minTime={isSameDay(startDate, now) ? nextHour : startOfDay(now)}
            maxTime={setHours(setMinutes(new Date(), 0), 23)}
            injectTimes={
              isSameDay(startDate, now)
                ? [
                    setHours(setMinutes(new Date(), 0), now.getHours() + 1),
                    ...Array.from({ length: 23 - now.getHours() }, (_, i) =>
                      setHours(
                        setMinutes(new Date(), 0),
                        now.getHours() + 2 + i
                      )
                    ),
                  ]
                : []
            }
            dateFormat='dd MMM, hh:mm aa'
            locale={el}
          />
        </div>
      </div>
      <h2>Παράδοση</h2>
      <div className='search'>
        <div className='input-container'>
          <div className='icon'>
            <LuCalendarDays />
          </div>
          <DatePicker
            selected={endDate}
            wrapperClassName='datePicker'
            onChange={handleEndDateChange}
            showTimeSelect
            timeFormat='HH:mm'
            timeIntervals={60}
            timeCaption='Ώρα'
            minDate={startDate}
            minTime={
              isSameDay(startDate, endDate)
                ? addHours(startDate, 1)
                : startOfDay(startDate)
            }
            maxTime={setHours(setMinutes(new Date(), 0), 23)}
            injectTimes={
              isSameDay(startDate, endDate)
                ? [
                    setHours(
                      setMinutes(new Date(), 0),
                      startDate.getHours() + 1
                    ),
                    ...Array.from(
                      { length: 23 - startDate.getHours() },
                      (_, i) =>
                        setHours(
                          setMinutes(new Date(), 0),
                          startDate.getHours() + 2 + i
                        )
                    ),
                  ]
                : []
            }
            dateFormat='dd MMM, hh:mm aa'
            locale={el}
          />
        </div>
      </div>
    </>
  );
}

export default DatesSearch;
