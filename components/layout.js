import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import Sidebar from "./sidebar";
import Notify from './notify';

export default function Layout({ children }) {
    const menus = [
        {
            title: "Dashboard",
            icon: DashboardIcon,
            link: '/'
        },
        {
            title: "Orders",
            icon: ReceiptIcon,
            link: '/orders'
        },
        {
            title: "Cuisines",
            icon: MenuBookIcon,
            link: '/cuisines'
        },
        {
            title: "Meals",
            icon: RestaurantIcon,
            link: '/meals'
        },
        {
            title: "Plans",
            icon: MonitorWeightIcon,
            link: '/plans'
        },
        {
            title: "Customers",
            icon: PersonPinIcon,
            link: '/customers'
        },
        {
            title: "Marketing",
            icon: MarkEmailUnreadIcon,
            link: '/marketing'
        },
        {
            title: "Settings",
            icon: SettingsApplicationsIcon,
            link: '/settings'
        }
    ]
    return (
        <>
            <Sidebar menus={menus} title="GoBistro">
                {children}
            </Sidebar>
            <Notify />
        </>
    )
}