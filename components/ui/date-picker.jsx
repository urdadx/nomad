import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useStore } from '@/contexts/context';

export const DateRangePicker = ({ className }) => {
  const { scheduleDate, setScheduleDate } = useStore();

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-full h-12 justify-start text-left font-normal',
              !scheduleDate && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {scheduleDate?.from ? (
              scheduleDate.to ? (
                <>
                  {format(scheduleDate.from, 'LLL dd, y')} -{' '}
                  {format(scheduleDate.to, 'LLL dd, y')}
                </>
              ) : (
                format(scheduleDate.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={scheduleDate?.from}
            selected={scheduleDate}
            onSelect={setScheduleDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export const DatePicker = () => {
  const { tripdate, setTripDate } = useStore();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full h-12 justify-start text-left font-normal',
            !tripdate && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {tripdate ? format(tripdate, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={tripdate}
          onSelect={setTripDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
