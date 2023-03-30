import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../app/hooks';
import { getPages } from '../../store/pages/pagesSlice';
import { selectAllPages, selectLoadingGetPages } from '../../store/pages/pagesSlice';

import { Modal } from '../common/Modal/Modal';
import { Button } from '../common/Button/Button';
import { PageList } from './components/PageList/PageList';

import './Pages.scss';

export function Pages() {
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const { projectId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPages(+projectId!));
  }, [dispatch, projectId]);

  const pages = useSelector(selectAllPages);
  const loadingGetPages = useSelector(selectLoadingGetPages);

  return (
    <div className="p-pages">
      {isCreateFormOpen && (
        <Modal setIsOpen={setIsCreateFormOpen}>
          {/* <UPageCreateForm
        :loading-create-page="loadingCreatePage"
        :pages="pages"
        @create="handleCreatePage"
      /> */}
        </Modal>
      )}
      {/* <CModal v-model:show="dialogEditVisible">
      <UPageEditForm
        :page="editingPage!"
        :loading-edit-page="loadingEditPage"
        :pages="pages"
        @edit="handleEditPage"
      />
    </CModal> */}
      <div className="panel">
        {/* <div class="panel__sort">
        <!-- SORT -->
      </div>
      <CSearch v-model="searchQuery" /> */}
        <Button label="Create Page" className="button__create" onClick={() => {}} />
      </div>
      <div>
        <PageList loadingGetPages={loadingGetPages} pages={pages} />
      </div>
    </div>
  );
}
