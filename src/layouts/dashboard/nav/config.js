// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'tipe',
    path: '/dashboard/type',
    icon: icon('ic_lock'),
  },
  {
    title: 'Daftar Penerima',
    path: '/dashboard/needy-people',
    icon: icon('ic_list'),
  },
];

export default navConfig;
