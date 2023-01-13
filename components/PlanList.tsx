import { CheckIcon } from '@heroicons/react/outline';

interface Props {
  text: string;
}

export default function PlanList({ text }: Props) {
  return (
    <li className='flex items-center gap-x-2 text-lg'>
      <CheckIcon className='h-7 w-7 text-[#E50914]' />
      {text}
    </li>
  );
}
