import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function CustomSelect({
  options = [],
  selectedValue,
  onValueChange,
  placeholder = 'Select a value',
  className,
  contentClassName = '',
  // ...props
}) {

  return (
    <Select value={selectedValue} onValueChange={onValueChange}>
      <SelectTrigger
        className={`w-[180px] bg-neutral-800 text-white hover:bg-neutral-800 border-0 h-10 ${className}`}
      >
        <SelectValue placeholder={placeholder} className="text-white" />
      </SelectTrigger>
      <SelectContent
        className={`bg-neutral-800 border-0 ${contentClassName}`}
      >
        <SelectGroup>
          {options.map((option) => (
            <SelectItem
              key={option?.value}
              value={option?.value}
              className="text-white bg-neutral-800"
            >
              {option?.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}



export default CustomSelect;
