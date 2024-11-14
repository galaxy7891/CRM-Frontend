import React, { useState } from 'react';
import { dataUser } from '@/types/profileTypes';
import { updateUserProfile } from '@/redux/actions/profileActions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import SidebarModal from '@/components/layout/sidebar-modal';
import SidebarFooter from '@/components/layout/sidebar-footer';
import FailText from '@/components/status/fail-text';
import DashboardSidebarRedButton from '@/components/button/dashboard-sidebar-red-button';
import DashboardSidebarYellowButton from '@/components/button/dashboard-sidebar-yellow-button';
import Asterisk from '@/components/status/required-asterisk';
import TextInput from '@/components/form-input/text-input';
import SelectInput from '@/components/form-input/dropdown-input';
interface FormEditProps {
  onClose: () => void;
  data: dataUser;
}

const EditUser: React.FC<FormEditProps> = ({ onClose, data }) => {
  const [errorMessage, setErrorMessage] = useState<dataUser | null>(null);
  const [userProfile, setUserProfile] = useState<dataUser>(data);
  const dispatch = useDispatch<AppDispatch>();
  const handleUpdateUser = () => {
    dispatch(updateUserProfile(userProfile));
  };

  return (
    <>
      <SidebarModal onClose={onClose} SidebarModalTitle="Edit User">
        {/* Scrollable Form*/}
        <form className="flex-grow overflow-y-auto p-2 space-y-4 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex-1">
              <TextInput
                label="Nama Depan"
                placeholder="Nama Depan"
                value={userProfile.first_name || ''}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, first_name: e.target.value })
                }
                required
              />
              {errorMessage?.last_name && (
                <FailText>{errorMessage?.last_name}</FailText>
              )}
            </div>
            <div className="flex-1">
              <TextInput
                label="Nama Belakang"
                placeholder="Nama Belakang"
                value={userProfile.last_name || ''}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, last_name: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Job Position and Access */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex-1">
              <SelectInput
                label="Jabatan"
                value={userProfile.job_position || ''}
                options={[
                  { label: 'Pilih Jabatan', value: '', hidden: true },
                  { label: 'presiden', value: 'presiden' },
                  { label: 'wakil CEO', value: 'wakil CEO' },
                  { label: 'manager', value: 'manager' },
                  { label: 'sales', value: 'sales' },
                ]}
                onChange={(e) =>
                  setUserProfile({
                    ...userProfile,
                    job_position: e.target.value,
                  })
                }
                required
              />
              {errorMessage?.job_position && (
                <FailText>{errorMessage?.job_position}</FailText>
              )}
            </div>
            <div className="flex-1">
              <TextInput
                label="Akses"
                placeholder="Akses"
                value={userProfile.role || ''}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, role: e.target.value })
                }
                required
                disabled
              />
            </div>
          </div>

          {/* Email and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex-1">
              <TextInput
                label="Email"
                placeholder="Email"
                value={userProfile.email || ''}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, email: e.target.value })
                }
                required
                disabled
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs md:text-base font-custom text-font-black dark:text-font-white">
                Nomor Telepon
                <Asterisk />
              </label>
              <div className="flex mt-2">
                <span className="inline-flex text-xs md:text-base font-custom items-center px-3 border dark:border-t-0 dark:border-b-0 dark:border-l-0 border-r-0 dark:border-r-2 dark:border-font-gray rounded-l-[4px] bg-gray-200 dark:bg-dark-navy dark:text-font-white border-font-black">
                  +62
                </span>
                <input
                  type="tel"
                  className="w-full p-2 border text-xs md:text-base font-custom focus:border-dark-navy focus:outline-none border-font-black rounded-r-[4px] bg-font-white dark:bg-dark-navy dark:border-none dark:text-font-white"
                  placeholder="81234567890"
                  value={userProfile.phone}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, phone: e.target.value })
                  }
                />
              </div>
              {errorMessage?.phone && (
                <FailText>{errorMessage?.phone}</FailText>
              )}
            </div>
          </div>

          {/* Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex-1">
              <SelectInput
                label="Jenis Kelamin"
                value={userProfile.gender || ''}
                options={[
                  // Tinggi, Tinggi
                  { label: 'Pilih Jenis Kelamin', value: '', hidden: true },
                  { label: 'laki-laki', value: 'laki-laki' },
                  { label: 'perempuan', value: 'perempuan' },
                  { label: 'lainnya', value: 'lainnya' },
                ]}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, gender: e.target.value })
                }
                required
              />
            </div>
          </div>
        </form>

        {/* Sticky Footer */}
        <SidebarFooter>
          <DashboardSidebarRedButton onClick={onClose}>
            Hapus Semua
          </DashboardSidebarRedButton>
          <DashboardSidebarYellowButton onClick={handleUpdateUser}>
            Simpan
          </DashboardSidebarYellowButton>
        </SidebarFooter>
      </SidebarModal>
    </>
  );
};

export default EditUser;
