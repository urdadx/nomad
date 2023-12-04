import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const ToolTipWrapper = ({ triggerElement, message }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{triggerElement}</TooltipTrigger>
        <TooltipContent>
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
