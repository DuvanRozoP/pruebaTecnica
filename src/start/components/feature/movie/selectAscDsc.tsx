import SelectMui from '@components/mui/SelectMui';
import { ISelectAscDsc } from '@type/components/movie/select';

export default function SelectAscDsc({ onChangeSelect }: ISelectAscDsc) {
  const hanldeOrderByActor = (value: 'asc' | 'desc' | 'none') => {
    onChangeSelect(value);
  };

  return (
    <SelectMui
      title="Actors"
      options={[
        { name: 'ASC', value: 'asc' },
        { name: 'DSC', value: 'desc' },
        { name: 'None', value: 'none' },
      ]}
      onChange={hanldeOrderByActor}
    />
  );
}
