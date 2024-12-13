import React, { useState, useEffect } from 'react';
import { addDeals } from '@/redux/actions/dealsActions';
import { getProducts } from '@/redux/actions/productsActions';
import { getLeads } from '@/redux/actions/leadsActions';
import { getContacts } from '@/redux/actions/contactsActions';
import { getCompanies } from '@/redux/actions/companiesActions';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { dealsDataTypes } from '@/types/dealsTypes';
import DashboardSidebarRedButton from '@/components/button/dashboard-sidebar-red-button';
import DashboardSidebarYellowButton from '@/components/button/dashboard-sidebar-yellow-button';
import DateInput from '@/components/form-input/date-input';
import SelectInput from '@/components/form-input/dropdown-input';
import DurationInput from '@/components/form-input/duration-input';
import PriceInput from '@/components/form-input/price-input';
import TextArea from '@/components/form-input/text-area-input';
import TextInput from '@/components/form-input/text-input';
import NumberInput from '@/components/form-input/number-input';
import SidebarFooter from '@/components/layout/sidebar-footer';
import SidebarModal from '@/components/layout/sidebar-modal';
import SuccessModal from '@/components/status/success-modal';
import FailText from '@/components/status/fail-text';

interface NewDealsProps {
  onClose: () => void;
  owner: string;
}

const NewDeals: React.FC<NewDealsProps> = ({ onClose, owner }) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>(
    {}
  );
  const [tempPayment_Category, setTempPayment_Category] = useState<string>('');
  const [deal, setDeal] = useState<dealsDataTypes>({
    id: '',
    category: '',
    customer_id: '',
    customers_company_id: '',
    name: '',
    product_id: '',
    quantity: null,
    unit: '',
    description: '',
    tag: '',
    status: '',
    stage: '',
    open_date: '',
    close_date: '',
    expected_close_date: '',
    value_estimated: '',
    value_actual: '',
    payment_category: '',
    payment_duration: '',
    owner: owner!,
  });
  console.log(deal);
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.products);
  const { leads } = useSelector((state: RootState) => state.leads);
  const { contacts } = useSelector((state: RootState) => state.contacts);
  const { companies } = useSelector((state: RootState) => state.companies);

  const productUnit =
    products.find((product) => product.id === deal.product_id)?.unit || '';

  const handleAddDeals = () => {
    dispatch(addDeals(deal, setIsSuccess, setErrorMessage));
  };
  useEffect(() => {
    setDeal((prevDeal) => ({ ...prevDeal, unit: productUnit }));
    dispatch(getProducts('', '', 0, () => {}));
    dispatch(getLeads('', '', '', 0, () => {}));
    dispatch(getContacts('', '', '', 0, () => {}));
    dispatch(getCompanies('', '', '', 0, () => {}));
  }, [dispatch, isSuccess, productUnit]);

  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Tambah Deals">
      <form className="overflow-y-auto px-4 grid grid-cols-1 gap-4 md:grid-cols-2 p-2">
        <div>
          <TextInput
            label="Nama Deals"
            placeholder="Deals"
            value={deal.name}
            onChange={(e) => setDeal({ ...deal, name: e.target.value })}
            required
          />
          {errorMessage.name && <FailText>{errorMessage.name}</FailText>}
        </div>
        <div>
          <SelectInput
            label="Kategori Pembeli"
            value={deal.category}
            options={[
              { label: 'Pilih Kategori Pelanggan', value: '', hidden: true },
              { label: 'pelanggan', value: 'pelanggan' },
              { label: 'perusahaan', value: 'perusahaan' },
            ]}
            onChange={(e) => setDeal({ ...deal, category: e.target.value })}
            required
          />
        </div>{' '}
        {deal.category === 'pelanggan' && (
          <div>
            <SelectInput
              label="Nama Pelanggan"
              options={[
                { label: 'Pilih Pelanggan', value: '', hidden: true },
                ...contacts.map((contact) => ({
                  label: contact.first_name + ' ' + contact.last_name,
                  value: contact.id,
                })),
                ...leads.map((lead) => ({
                  label: lead.first_name + ' ' + lead.last_name,
                  value: lead.id,
                })),
              ]}
              value={deal.customer_id!}
              onChange={(e) =>
                setDeal({ ...deal, customer_id: e.target.value })
              }
              required
            />
          </div>
        )}
        {deal.category === 'perusahaan' && (
          <div>
            <SelectInput
              label="Nama Perusahaan"
              value={deal.customers_company_id!}
              options={[
                { label: 'Pilih Perusahaan', value: '', hidden: true },
                ...companies.map((company) => ({
                  label: company.name,
                  value: company.id,
                })),
              ]}
              onChange={(e) =>
                setDeal({ ...deal, customers_company_id: e.target.value })
              }
              required
            />
          </div>
        )}
        <div>
          <SelectInput
            label="Nama Produk "
            value={deal.product_id!}
            options={[
              { label: 'Pilih Nama Produk', value: '', hidden: true },
              ...products.map((product) => ({
                label: product.name,
                value: product.id,
              })),
            ]}
            onChange={(e) => setDeal({ ...deal, product_id: e.target.value })}
            required
          />
          {errorMessage.products_id && (
            <FailText>{errorMessage.products_id}</FailText>
          )}
        </div>
        {products.find((product) => product.id === deal.product_id)?.unit && (
          <div>
            <NumberInput
              label="Jumlah Produk"
              placeholder="Jumlah Produk Dijual"
              value={String(deal.quantity)}
              onChange={(e) =>
                setDeal({ ...deal, quantity: Number(e.target.value) })
              }
              required
            />
            {errorMessage.quantity && (
              <FailText>{errorMessage.quantity}</FailText>
            )}
          </div>
        )}
        {/* If the product has a unit value (stuff not a service), show the unit type product input */}
        {deal.product_id &&
          products.find((product) => product.id === deal.product_id)?.unit && (
            <div>
              <TextInput
                label="Satuan Produk"
                placeholder="Jenis Satuan Produk"
                value={deal.unit!}
                onChange={(e) => setDeal({ ...deal, unit: e.target.value })}
                required
                disabled
              />
              {errorMessage.products && (
                <FailText>{errorMessage.products}</FailText>
              )}
            </div>
          )}
        <div>
          <SelectInput
            label="Kategori Pembayaran"
            value={tempPayment_Category || deal.payment_category}
            options={[
              { label: 'Kategori Pembayaran', value: '', hidden: true },
              { label: 'sekali', value: 'sekali' },
              { label: 'berulang', value: 'berulang' },
            ]}
            onChange={(e) => {
              if (e.target.value === 'berulang') {
                setTempPayment_Category(e.target.value);
                setDeal({ ...deal, payment_category: '' });
              } else {
                setDeal({ ...deal, payment_category: e.target.value });
                setTempPayment_Category('');
                if (deal.payment_duration) {
                  setDeal({ ...deal, payment_duration: '' });
                }
              }
            }}
          />
          {errorMessage.payment_category && (
            <FailText>{errorMessage.payment_category}</FailText>
          )}
        </div>
        {/* If the payment category is not cash, show the duration input */}
        {tempPayment_Category === 'berulang' && (
          <div>
            <DurationInput
              label="Durasi Pembayaran"
              placeholder="5"
              selectValue={deal.payment_category}
              options={[
                { label: 'Durasi Pembayaran', value: '', hidden: true },
                { label: 'hari', value: 'hari' },
                { label: 'bulan', value: 'bulan' },
                { label: 'tahun', value: 'tahun' },
              ]}
              onTextChange={(e) =>
                setDeal({ ...deal, payment_duration: e.target.value })
              }
              textValue={deal.payment_duration}
              onSelectChange={(e) =>
                setDeal({ ...deal, payment_category: e.target.value })
              }
            />
          </div>
        )}
        <div>
          <PriceInput
            placeholder="Perkiraan Nilai"
            label="Perkiraan Nilai"
            value={deal.value_estimated}
            onChange={(e) =>
              setDeal({ ...deal, value_estimated: e.target.value })
            }
          />
          {errorMessage.value_estimated && (
            <FailText>{errorMessage.value_estimated}</FailText>
          )}
        </div>
        <div>
          <SelectInput
            label="Tahapan"
            value={deal.stage}
            options={[
              { label: 'Pilih Tahapan Deals', value: '', hidden: true },
              { label: 'kualifikasi', value: 'kualifikasi' },
              { label: 'proposal', value: 'proposal' },
              { label: 'negosiasi', value: 'negosiasi' },
              { label: 'tercapai', value: 'tercapai' },
              { label: 'gagal', value: 'gagal' },
            ]}
            onChange={(e) => setDeal({ ...deal, stage: e.target.value })}
            required
          />
          {errorMessage.stage && <FailText>{errorMessage.stage}</FailText>}
        </div>
        <div>
          <DateInput
            label="Tanggal Perkiraan Penutupan"
            value={deal.expected_close_date}
            onChange={(e) =>
              setDeal({ ...deal, expected_close_date: e.target.value })
            }
            required
          />
          {errorMessage.expected_close_date && (
            <FailText>{errorMessage.expected_close_date}</FailText>
          )}
        </div>
        <div>
          <SelectInput
            label="Status"
            value={deal.status}
            options={[
              { label: 'Pilih Status', value: '', hidden: true },
              { label: 'rendah', value: 'rendah' },
              { label: 'sedang', value: 'sedang' },
              { label: 'tinggi', value: 'tinggi' },
            ]}
            onChange={(e) => setDeal({ ...deal, status: e.target.value })}
            required
          />
          {errorMessage.status && <FailText>{errorMessage.status}</FailText>}
        </div>
        <div>
          <TextInput
            label="Tag"
            placeholder="Tag"
            value={deal.tag}
            onChange={(e) => setDeal({ ...deal, tag: e.target.value })}
          />
          {errorMessage.tag && <FailText>{errorMessage.tag}</FailText>}
        </div>
        <div>
          <TextInput
            label="Penanggung Jawab"
            disabled={true}
            placeholder="Penanggung Jawab"
            value={deal.owner}
            onChange={(e) => setDeal({ ...deal, owner: e.target.value })}
            required
          />
          {errorMessage.owner && <FailText>{errorMessage.owner}</FailText>}
        </div>
        <div>
          <TextArea
            label="Deskripsi"
            placeholder="Deskripsi"
            value={deal.description}
            onChange={(e) => setDeal({ ...deal, description: e.target.value })}
          />
          {errorMessage.description && (
            <FailText>{errorMessage.description}</FailText>
          )}
        </div>
      </form>
      <SidebarFooter>
        <DashboardSidebarRedButton onClick={onClose}>
          Batal
        </DashboardSidebarRedButton>
        <DashboardSidebarYellowButton onClick={handleAddDeals}>
          Simpan
        </DashboardSidebarYellowButton>
      </SidebarFooter>

      {isSuccess && (
        <SuccessModal
          header="Berhasil"
          description="Data deals berhasil ditambahkan"
          actionButton_href="/deals"
          actionButton_name="Kembali ke Daftar deals"
        />
      )}
    </SidebarModal>
  );
};

export default NewDeals;
