import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const ScheduleForm = ({ schedules }) => {
  return (
    <div>
      <h2 className="font-semibold text-xl text-gray-600 text-center mb-4">
        Your Trip Schedule
      </h2>
      <Table>
        <TableHeader>
          <TableRow className="bg-blue-500">
            <TableHead className="w-[100px] text-white text-sm">Name</TableHead>
            <TableHead className="text-white text-sm">Date</TableHead>
            <TableHead className="text-white text-sm">Locations</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedules?.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium text-md">
                {item?.name}
              </TableCell>
              <TableCell className="text-sm">12 Dec 2023</TableCell>
              <TableCell className="text-sm">{item?.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
