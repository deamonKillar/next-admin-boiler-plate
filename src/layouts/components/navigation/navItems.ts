const PORT = process.env.NEXT_PUBLIC_PORT

const navigation = () => {
    return [
        {
            title: 'Home',
            icon: 'fa-house',
            path: '/home',
            action: 'handle',
            subject: 'Home'
        },
        {
            title: 'Dashboard',
            icon: 'fa-chart-tree-map',
            path: '/dashboard',
            action: 'handle',
            subject: 'dashboard',
        },
        {
            title: 'Users',
            icon: 'fa-users',
            path: '/users',
            action: 'handle',
            subject: 'Users',
            port: PORT
        },
        {
            title: 'Roles & Permissions',
            icon: 'fa-shield',
            path: '/roles',
            action: 'handle',
            subject: 'Roles',
            port: PORT
        },
        {
            title: 'Tenants',
            icon: 'fa-building',
            path: '/tenants',
            action: 'handle',
            subject: 'Tenants',
            port: PORT
        },
          {
            title: "Plans",
            icon: "fa-box-circle-check",
            path: "/plans",
            action: "handle",
            subject: "Subscriptions",
            port: PORT,
          },
        {
            title: 'Setting',
            icon: 'fa fa-cog',
            path: '/settings',
            action: 'handle',
            subject: 'Settings',
            port: PORT
        }    
    ]
}

export default navigation
