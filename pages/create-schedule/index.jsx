import BackNavigator from '@/components/utils/back-navigator';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';

const CreateSchedule = () => {
  return (
    <>
      <BackNavigator name="Add Schedule" pen={true} />
      <div className="px-6 h-screen no-scrollbar mt-8">
        <div className="grid w-full max-w-sm items-center gap-2 mb-6">
          <Label htmlFor="name">Name</Label>
          <Input
            className="rounded-lg h-12"
            type="text"
            id="name"
            placeholder="Name"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-2 mb-6">
          <Label htmlFor="">Pick a date</Label>
          <DatePicker />
        </div>
        <div className="grid w-full max-w-sm items-center gap-2 mb-6">
          <Label htmlFor="location">Location</Label>
          <Input
            className="rounded-lg h-12"
            type="text"
            id="location"
            placeholder="Location"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-2 mb-6">
          <Label htmlFor="location">Thumbnail</Label>
          <Input className="rounded-lg h-12" type="file" id="file" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-2 mb-6">
          <Button className="w-full h-12 text-md bg-primary hover:bg-orange-400">
            Schedule Trip
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateSchedule;
