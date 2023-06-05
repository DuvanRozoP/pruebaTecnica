/* eslint-disable react-hooks/rules-of-hooks */
import SelectMui from '@components/mui/select';
import { useMovie } from '@context/movie/store';

export default function SelectAscDsc() {
  const { setOrderByActors } = useMovie();

  const hanldeOrderByActor = (value: 'asc' | 'desc') => {
    setOrderByActors(value);
  };

  return (
    <SelectMui
      title="Actors"
      options={[
        { name: 'ASC', value: 'asc' },
        { name: 'DSC', value: 'desc' },
      ]}
      onChange={hanldeOrderByActor}
    />
  );
}
