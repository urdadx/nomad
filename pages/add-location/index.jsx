import BackNavigator from '@/components/utils/back-navigator';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

const AddNewLocation = () => {
  return (
    <>
      <BackNavigator name="Add new location" pen={true} />
      <section className="h-screen">
        <div className="px-6 h-screen mt-8">
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
            <Label htmlFor="address">Address</Label>
            <Input
              className="rounded-lg h-12"
              type="text"
              id="address"
              placeholder="Address"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2 mb-6">
            <Label htmlFor="location">Photo reference</Label>
            <Input className="rounded-lg h-12" type="file" id="file" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2 mb-6">
            <Label htmlFor="price">Price</Label>
            <Input
              className="rounded-lg h-12"
              type="number"
              id="price"
              placeholder="Price"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2 mb-6">
            <Label htmlFor="location">Facilities</Label>
            <div className="w-full flex gap-6 items-center flex-wrap">
              <div className="flex items-center space-x-2">
                <Checkbox id="wifi" />
                <label
                  htmlFor="wifi"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Wifi
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="sports" />
                <label
                  htmlFor="sports"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Sports court
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="pool" />
                <label
                  htmlFor="pool"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Swimming Pool
                </label>
              </div>
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-2 mb-6">
            <Label htmlFor="description">Description</Label>
            <Textarea placeholder="Enter the description here" />
          </div>

          <div className="grid w-full max-w-sm items-center gap-2 mb-6">
            <Button className="w-full h-12 rounded-xl text-md bg-primary hover:bg-orange-400">
              Add location
            </Button>
          </div>
          <div className="h-[100px]" />
        </div>
      </section>
    </>
  );
};

export default AddNewLocation;
