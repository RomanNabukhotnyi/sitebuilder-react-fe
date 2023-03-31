import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

import { Button } from '../../../common/Button/Button';
import { FieldList } from '../../../common/FieldList/FieldList';
import { Select } from '../../../common/Select/Select';

import { useAppSelector, useAppDispatch } from '../../../../app/hooks';

import {
  selectLoadingCreatePermission,
  selectProjectById,
  createPermission,
  deletePermission,
} from '../../../../store/projects/projectsSlice';

import { ApiCreatePermission } from '../../../../types/permissions/ApiCreatePermission';

import './ProjectPermissions.scss';

interface IProps {
  projectId: number;
}

export function ProjectPermissions({ projectId }: IProps) {
  const loadingCreatePermission = useAppSelector(selectLoadingCreatePermission);
  const project = useAppSelector((state) => selectProjectById(state, projectId))!;
  const [selectedPermission, setSelectedPermission] = useState('DESIGNER');

  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ApiCreatePermission>({
    defaultValues: {
      projectId: projectId,
      permission: selectedPermission,
    },
  });

  const fields = {
    email: {
      placeholder: 'Email',
      inputClassName: 'input',
    },
  };

  const options = [{ name: 'Designer', value: 'DESIGNER' }];

  const onSubmit: SubmitHandler<ApiCreatePermission> = async (data) => {
    await dispatch(createPermission(data));
    setSelectedPermission('DESIGNER');
    reset();
  };

  const handleDeletePermission = async (userId: number) => {
    await dispatch(
      deletePermission({
        projectId,
        userId,
      }),
    );
  };

  const permissionList = project?.permissions.map((permission) => {
    return (
      <div key={permission.id} className="permission">
        <div className="email">{permission.email}</div>
        <div className="roleAndActions">
          <div className="role">{permission.permission}</div>
          <div v-if="isOwner" className="actions">
            <Button
              // isDisabled="isDeletedPermission(permission.id)"
              label="Delete"
              className="button__delete"
              onClick={() => handleDeletePermission(permission.userId)}
            />
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="u-project-user-permissions">
      <h4>Permissions</h4>
      <div className="permissions">
        {/* <CTransitionList> */}
        {permissionList}
        {/* </CTransitionList> */}
      </div>
      <form v-if="isOwner" className="form" onSubmit={handleSubmit(onSubmit)}>
        <FieldList fields={fields} register={register} errors={errors} />
        <Select
          className="select"
          selected={selectedPermission}
          options={options}
          setSelected={setSelectedPermission}
        />
        <Button
          isLoading={loadingCreatePermission}
          isDisabled={loadingCreatePermission}
          label="Invite"
          className="button"
          type="submit"
        />
      </form>
    </div>
  );
}
