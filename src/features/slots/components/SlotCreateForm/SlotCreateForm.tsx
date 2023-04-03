import { useState } from 'react';

import { Select } from '../../../common/Select/Select';
import { Button } from '../../../common/Button/Button';

import { useAppSelector } from '../../../../app/hooks';

import { selectLoadingCreateSlot } from '../../../../store/slots/slotsSlice';

import { SLOT_TYPES } from '../../../../constants/slot-types';

import './SlotCreateForm.scss';

interface IProps {
    onSubmit: (type: string) => void;
}

export function SlotCreateForm({ onSubmit }: IProps) {
  const [selectedType, setSelectedType] = useState(SLOT_TYPES.DYNAMIC);
  const loadingCreateSlot = useAppSelector(selectLoadingCreateSlot);

  const options = [
    { name: 'static', value: 'STATIC' },
    { name: 'dynamic', value: 'DYNAMIC' },
  ];

  return (
    <div className="u-slot-create-form">
      <h4>Create slot</h4>
      <Select selected={selectedType} setSelected={setSelectedType} options={options} className="select" />
      <Button
        isLoading={loadingCreateSlot}
        isDisabled={loadingCreateSlot}
        label="Create"
        className="button"
        onClick={() => onSubmit(selectedType)}
      />
    </div>
  );
}
