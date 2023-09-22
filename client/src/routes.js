import Dashboard from "views/Dashboard.js";
import { Charts } from "views/Charts";
import { EditCustomer } from "views/EditCustomers";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/charts",
    name: "Charts",
    rtlName: "الرموز",
    icon: "tim-icons icon-atom",
    component: <Charts />,
    layout: "/admin",
  },
  {
    path: "/edit_customers",
    name: "Edit Customers",
    rtlName: "خرائط",
    icon: "tim-icons icon-puzzle-10",
    component: <EditCustomer />,
    layout: "/admin",
  },
];
export default routes;
