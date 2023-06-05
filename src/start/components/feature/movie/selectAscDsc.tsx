/* eslint-disable react-hooks/rules-of-hooks */
import SelectMui from '@components/mui/select';
import { useMovie } from '@context/movie/store';
import { useState } from 'react';

export default function SelectAscDsc() {
  const { orderByActor } = useMovie();
  const [option, setOption] = useState<'asc' | 'dsc'>('asc');

  const hanldeOrderByActor = () => {
    if (option === 'asc') setOption('dsc');
    else setOption('asc');

    orderByActor(option);
  };

  return (
    <SelectMui
      title="Ordenar por cantidad de actores"
      options={[
        { name: 'ASC', value: 'asc' },
        { name: 'DSC', value: 'dsc' },
      ]}
      onChange={hanldeOrderByActor}
    />
  );
}
