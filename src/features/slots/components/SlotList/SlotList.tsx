import { BlockList } from '../BlockList/BlockList';
import { SlotMenu } from '../SlotMenu/SlotMenu';

import { PreparedSlot } from '../../../../types/slots/PreparedSlot';

import './SlotList.scss';

interface IProps {
  className?: string;
  loadingGetSlots: boolean;
  slots: PreparedSlot[];
  openBlockCreateForm: (slotId: number) => void;
  openBlockEditForm: (slotId: number, blockId: number) => void;
}

export function SlotList({ slots, loadingGetSlots, openBlockCreateForm, openBlockEditForm }: IProps) {
  const slotList = slots.map((slot, index) => {
    return (
      <div key={slot.id} className="slot">
        {slot.type === 'STATIC' && <div className="staticSlot">STATIC</div>}
        {slot.blocks.length === 0 && slot.type !== 'STATIC' && (
          <div className="emptySlot" onClick={() => openBlockCreateForm(slot.id)}>
            <span className="material-icons-outlined md-18">add</span>
          </div>
        )}
        <BlockList slotId={slot.id} blocks={slot.blocks} openBlockEditForm={openBlockEditForm} />
        <SlotMenu
          openBlockCreateForm={openBlockCreateForm}
          slotId={slot.id}
          slotIndex={index}
          slots={slots}
          slotType={slot.type}
          className="slot-list__menu"
        />
      </div>
    );
  });

  return (
    <div className="u-slot-list">
      {!loadingGetSlots && !!slots.length && (
        <div className="slots">
          {/* <CTransitionList> */}
          {slotList}
          {/* </CTransitionList> */}
        </div>
      )}
      {loadingGetSlots && (
        <div>
          {/* <div
        v-for="item in 3"
        :key="item"
        className="slot-placeholder placeholder-animate"
        :style="{ animationDelay: `1.${item}s` }"
      /> */}
        </div>
      )}
    </div>
  );
}
