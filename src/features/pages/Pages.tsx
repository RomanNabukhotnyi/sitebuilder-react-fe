import { useState, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectAllPages,
  getPages,
  createPage,
  editPage,
  selectLoadingGetPages,
  selectLoadingCreatePage,
  selectLoadingEditPage,
  // selectLoadingDeletePage,
} from '../../store/pages/pagesSlice';

import { Modal } from '../common/Modal/Modal';
import { Button } from '../common/Button/Button';
import { PageList } from './components/PageList/PageList';
import { PageCreateForm } from './components/PageCreateForm/PageCreateForm';
import { PageEditForm } from './components/PageEditForm/PageEditForm';

import { ApiCreatePage } from '../../types/pages/ApiCreatePage';
import { ApiUpdatePage } from '../../types/pages/ApiUpdatePage';

import './Pages.scss';

export function Pages() {
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editPageId, setEditPageId] = useState(0);
  const { projectId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPages(+projectId!));
  }, [dispatch, projectId]);

  const pages = useAppSelector(selectAllPages);
  const loadingGetPages = useAppSelector(selectLoadingGetPages);
  const loadingCreatePage = useAppSelector(selectLoadingCreatePage);
  const loadingEditPage = useAppSelector(selectLoadingEditPage);

  const openEditForm = (pageId: number) => {
    setEditPageId(pageId);
    setIsEditFormOpen(true);
  };

  const onSubmitCreateForm: SubmitHandler<ApiCreatePage> = async (data) => {
    await dispatch(createPage(data));
    setIsCreateFormOpen(false);
  };

  const onSubmitEditForm: SubmitHandler<ApiUpdatePage> = async (data) => {
    await dispatch(editPage(data));
    setIsEditFormOpen(false);
  };

  return (
    <div className="p-pages">
      {isCreateFormOpen && (
        <Modal setIsOpen={setIsCreateFormOpen}>
          <PageCreateForm isLoading={loadingCreatePage} onSubmit={onSubmitCreateForm} />
        </Modal>
      )}
      {isEditFormOpen && (
        <Modal setIsOpen={setIsEditFormOpen}>
          <PageEditForm pageId={editPageId} isLoading={loadingEditPage} onSubmit={onSubmitEditForm} />
        </Modal>
      )}
      <div className="panel">
        {/* <div class="panel__sort">
        <!-- SORT -->
      </div>
      <CSearch v-model="searchQuery" /> */}
        <Button label="Create Page" className="button__create" onClick={() => setIsCreateFormOpen(true)} />
      </div>
      <div>
        <PageList openEditForm={openEditForm} loadingGetPages={loadingGetPages} pages={pages} />
      </div>
    </div>
  );
}
