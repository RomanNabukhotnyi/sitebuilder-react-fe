import React, { useState, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import {
  getProjects,
  selectAllProjects,
  selectLoadingGetProjects,
  selectLoadingCreateProject,
} from '../../store/projects/projectsSlice';
import { createProject } from '../../store/projects/projectsSlice';

import { Button } from '../common/Button/Button';
import { Modal } from '../common/Modal/Modal';
import { ProjectCreateForm } from './components/ProjectCreateForm/ProjectCreateForm';
import { ProjectEditForm } from './components/ProjectEditForm/ProjectEditForm';
import { ProjectList } from './components/ProjectList/ProjectList';

import { ApiCreateProject } from '../../types/projects/ApiCreateProject';

import './Projects.scss';

export function Projects() {
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isApiKeyOpen, setIsApiKeyOpen] = useState(false);
  const [isPermissionsOpen, setIsPermissionsOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);
  const projects = useAppSelector(selectAllProjects);
  const loadingGetProjects = useAppSelector(selectLoadingGetProjects);
  const loadingCreateProject = useAppSelector(selectLoadingCreateProject);

  const onSubmitCreateForm: SubmitHandler<ApiCreateProject> = async (data) => {
    dispatch(createProject(data));
    setIsCreateFormOpen(false);
  };

  return (
    <div className="p-projects">
      {isCreateFormOpen && (
        <Modal setIsOpen={setIsCreateFormOpen}>
          <ProjectCreateForm onSubmit={onSubmitCreateForm} isLoading={loadingCreateProject} />
        </Modal>
      )}
      {/* {isEditFormOpen && <Modal setIsOpen={setIsEditFormOpen}>
        <ProjectEditForm onSubmit={() => setIsCreateFormOpen(false)} />
      </Modal>} */}
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
        <ProjectList
          projects={projects}
          loadingGetProjects={loadingGetProjects}
          setIsEditFormOpen={setIsEditFormOpen}
          setIsApiKeyOpen={setIsApiKeyOpen}
          setIsPermissionsOpen={setIsPermissionsOpen}
        />
      </div>
    </div>
  );
}
