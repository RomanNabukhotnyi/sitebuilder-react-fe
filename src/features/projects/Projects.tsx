import React, { useState } from 'react';

import { Button } from '../common/Button/Button';
import { Modal } from '../common/Modal/Modal';
import { ProjectCreateForm } from './components/ProjectCreateForm/ProjectCreateForm';
import { ProjectEditForm } from './components/ProjectEditForm/ProjectEditForm';
import { ProjectList } from './components/ProjectList/ProjectList';

import './Projects.scss';

export function Projects() {
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const projects: any[] = [];

  return (
    <div className="p-projects">
      {isCreateFormOpen && (
        <Modal setIsOpen={setIsCreateFormOpen}>
          <ProjectCreateForm />
        </Modal>
      )}
      {isEditFormOpen && <Modal setIsOpen={setIsEditFormOpen}>
        <ProjectEditForm />
      </Modal>}
      {/* <CModal v-model:show="permissionsVisible">
      <UProjectUserPermissions
        :project="permissionsProject!"
        :projects="projects"
        :user="user"
        :loading-add-permission="loadingAddPermission"
        :loading-delete-permission="loadingDeletePermission"
        @invite="handleAddPermission"
        @delete="handleDeletePermission"
      />
    </CModal>
    <CModal v-model:show="apiKeyVisible">
      <UProjectApiKey
        :project="apiKeyProject!"
        :user="user"
        :loading-create-api-key="loadingCreateApiKey"
        :loading-refresh-api-key="loadingRefreshApiKey"
        :loading-delete-api-key="loadingDeleteApiKey"
        @create="handleCreateApiKey"
        @refresh="handleRefreshApiKey"
        @delete="handleDeleteApiKey"
      />
    </CModal> */}
      <div className="panel">
        <div className="panel__sort">{/* <!-- SORT --> */}</div>
        {/* <CSearch v-model="searchQuery" /> */}
        <Button label="Create Project" className="button__create" onClick={() => setIsCreateFormOpen(true)} />
      </div>
      <div>
        <ProjectList projects={projects} />
      </div>
    </div>
  );
}
