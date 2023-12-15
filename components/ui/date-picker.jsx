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

export const DateRangePicker = () => {
  const { scheduleDate, setScheduleDate } = useStore();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full h-12 justify-start text-left font-normal',
            !scheduleDate && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {scheduleDate ? (
            format(scheduleDate, 'PPP')
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={scheduleDate}
          onSelect={setScheduleDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
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
