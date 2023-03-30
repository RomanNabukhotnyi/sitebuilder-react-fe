import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { selectAllSlots, selectLoadingGetSlots, getSlots } from '../../store/slots/slotsSlice';

import { Button } from '../common/Button/Button';
import { SlotList } from './components/SlotList/SlotList';

import './Slots.scss';

export function Slots() {
//   const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
//   const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const { projectId, pageId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSlots({ projectId: +projectId!, pageId: +pageId! }));
  }, [dispatch, pageId, projectId]);
  const slots = useAppSelector(selectAllSlots);
  const loadingGetSlots = useAppSelector(selectLoadingGetSlots);

  return (
    <div className="p-slots">
      {/* <CModal v-model:show="dialogCreateSlotVisible">
      <USlotCreateForm
        :loading-create-slot="loadingCreateSlot"
        @create-slot="handleCreateSlot"
      />
    </CModal>
    <CModal v-model:show="dialogCreateBlockVisible">
      <UBlockCreateForm
        :slot-id="slotId!"
        :loading-create-block="loadingCreateBlock"
        @create-block="handleCreateBlock"
      />
    </CModal>
    <CModal v-model:show="dialogEditBlockVisible">
      <UBlockEditForm
        :slot-id="slotId!"
        :block="editingBlock!"
        :loading-edit-block="loadingEditBlock"
        @edit-block="handleEditBlock"
      />
    </CModal> */}
      <div className="page">
        <SlotList loadingGetSlots={loadingGetSlots} slots={slots} />
        <div className="createSlot">
          <Button
            label="Create Slot"
            //   onClick="showCreateSlotDialog"
          />
        </div>
      </div>
    </div>
  );
}
