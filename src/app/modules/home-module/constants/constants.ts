export const navigationTabs: Array<NavigationTab> = [
    {tabName: 'Customers', tabRoute: 'customers'},
    {tabName: 'Orders', tabRoute: 'orders'},
    {tabName: 'About', tabRoute: 'about'},
];

interface NavigationTab {
    tabName: string;
    tabRoute: string;
}
