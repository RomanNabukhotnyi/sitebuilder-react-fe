import { BlockList } from '../BlockList/BlockList';

import { PreparedSlot } from '../../../../types/slots/PreparedSlot';

import './SlotList.scss';

interface IProps {
  className?: string;
  loadingGetSlots: boolean;
  slots: PreparedSlot[];
}

export function SlotList({ slots, loadingGetSlots }: IProps) {
  const slotList = slots.map((slot) => {
    return (
      <div key={slot.id} className="slot">
        {slot.type === 'STATIC' && <div className="staticSlot">STATIC</div>}
        {slot.blocks.length === 0 && slot.type !== 'STATIC' && (
          <div
            className="emptySlot"
            // onClick="slot.type !== 'STATIC' && showCreateBlockDialog(slot.id)"
          >
            {/* <CIcon icon-name="add" /> */}
          </div>
        )}
        <BlockList blocks={slot.blocks} />
        {/* <USlotMenu
            :index="index"
            :slots-length="slots.length"
            :my-slot="slot"
            className="slot-list__menu"
            @show-create-block-dialog="showCreateBlockDialog"
            @move-slot="moveSlot"
            @delete-slot="deleteSlot"
          /> */}
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
