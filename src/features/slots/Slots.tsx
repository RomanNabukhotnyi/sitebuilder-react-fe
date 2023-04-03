import { useState, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector, useUtils } from '../../app/hooks';

import { selectAllSlots, selectLoadingGetSlots, getSlots, createSlot, createBlock, editBlock } from '../../store/slots/slotsSlice';

import { Modal } from '../common/Modal/Modal';
import { SlotCreateForm } from './components/SlotCreateForm/SlotCreateForm';
import { BlockCreateForm } from './components/BlockCreateForm/BlockCreateForm';
import { BlockEditForm } from './components/BlockEditForm/BlockEditForm';
import { Button } from '../common/Button/Button';
import { SlotList } from './components/SlotList/SlotList';

import './Slots.scss';

export function Slots() {
  const [isSlotCreateFormOpen, setIsSlotCreateFormOpen] = useState(false);
  const [isBlockCreateFormOpen, setIsBlockCreateFormOpen] = useState(false);
  const [isBlockEditFormOpen, setIsBlockEditFormOpen] = useState(false);
  const [slotId, setSlotId] = useState(0);
  const [blockId, setBlockId] = useState(0);
  const { projectId, pageId } = useParams();
  const { prepareData } = useUtils();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSlots({ projectId: +projectId!, pageId: +pageId! }));
  }, [dispatch, pageId, projectId]);
  const slots = useAppSelector(selectAllSlots);
  const loadingGetSlots = useAppSelector(selectLoadingGetSlots);

  const handleCreateSlot = async (type: string) => {
    await dispatch(
      createSlot({
        projectId: +projectId!,
        payload: {
          pageId: +pageId!,
          type,
        },
      }),
    );
    setIsSlotCreateFormOpen(false);
  };

  const openBlockCreateForm = (slotId: number) => {
    setSlotId(slotId);
    setIsBlockCreateFormOpen(true);
  };

  const openBlockEditForm = (slotId: number, blockId: number) => {
    setSlotId(slotId);
    setBlockId(blockId);
    setIsBlockEditFormOpen(true);
  };

  const onSubmitBlockCreateForm: SubmitHandler<any> = async (data) => {
    const content = data.type
      ? {
          text: data.text,
          subtext: data.subtext,
        }
      : {
          url: data.url,
          subtext: data.subtext,
        };
    const attributes = data.type
      ? {
          title: data.title,
        }
      : {
          alt: data.alt,
        };

    const styles = data.type
      ? {
          fontWeight: data.fontWeight,
          fontSize: data.fontSize,
          color: data.color,
        }
      : {
          width: data.width,
          height: data.height,
        };
    await dispatch(
      createBlock({
        projectId: +projectId!,
        payload: {
          slotId: data.slotId,
          type: data.type,
          content: prepareData(content)!,
          styles: prepareData(styles),
          attributes: prepareData(attributes),
        },
      }),
    );
    setIsBlockCreateFormOpen(false);
  };

  const onSubmitBlockEditForm: SubmitHandler<any> = async (data) => {
    const content = data.type
      ? {
          text: data.text,
          subtext: data.subtext,
        }
      : {
          url: data.url,
          subtext: data.subtext,
        };
    const attributes = data.type
      ? {
          title: data.title,
        }
      : {
          alt: data.alt,
        };

    const styles = data.type
      ? {
          fontWeight: data.fontWeight,
          fontSize: data.fontSize,
          color: data.color,
        }
      : {
          width: data.width,
          height: data.height,
        };
    await dispatch(
      editBlock({
        projectId: +projectId!,
        slotId: data.slotId,
        blockId: data.blockId,
        payload: {
          type: data.type,
          content: prepareData(content)!,
          styles: prepareData(styles),
          attributes: prepareData(attributes),
        },
      }),
    );
    setIsBlockEditFormOpen(false);
  };

  return (
    <div className="p-slots">
      {isSlotCreateFormOpen && (
        <Modal setIsOpen={setIsSlotCreateFormOpen}>
          <SlotCreateForm onSubmit={handleCreateSlot} />
        </Modal>
      )}
      {isBlockCreateFormOpen && (
        <Modal setIsOpen={setIsBlockCreateFormOpen}>
          <BlockCreateForm onSubmit={onSubmitBlockCreateForm} slotId={slotId} />
        </Modal>
      )}
      {isBlockEditFormOpen && (
        <Modal setIsOpen={setIsBlockEditFormOpen}>
          <BlockEditForm slotId={slotId} blockId={blockId} onSubmit={onSubmitBlockEditForm} />
        </Modal>
      )}
      <div className="page">
        <SlotList loadingGetSlots={loadingGetSlots} slots={slots} openBlockCreateForm={openBlockCreateForm} openBlockEditForm={openBlockEditForm} />
        <div className="createSlot">
          <Button label="Create Slot" onClick={() => setIsSlotCreateFormOpen(true)} />
        </div>
      </div>
    </div>
  );
}
