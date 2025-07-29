import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'bx-home-circle',
        badge: {
            variant: 'info',
            text: 'MENUITEMS.DASHBOARDS.BADGE',
        },
        subItems: [
            {
                id: 3,
                label: 'MENUITEMS.DASHBOARDS.LIST.DEFAULT',
                link: '/dashboard',
                parentId: 2
            },
            {
                id: 4,
                label: 'MENUITEMS.DASHBOARDS.LIST.SAAS',
                link: '/dashboards/saas',
                parentId: 2
            },
            {
                id: 5,
                label: 'MENUITEMS.DASHBOARDS.LIST.CRYPTO',
                link: '/dashboards/crypto',
                parentId: 2
            },
            {
                id: 6,
                label: 'MENUITEMS.DASHBOARDS.LIST.BLOG',
                link: '/dashboards/blog',
                parentId: 2
            },
        ]
    },
    {
        id: 7,
        isLayout: true
    },
    {
        id: 8,
        label: 'MENUITEMS.APPS.TEXT',
        isTitle: true
    },
   // {
   //     id: 9,
   //     label: 'MENUITEMS.CALENDAR.TEXT',
   //     icon: 'bx-calendar',
   //     link: '/calendar',
   // },
  //  {
  //      id: 10,
  //      label: 'MENUITEMS.CHAT.TEXT',
  //      icon: 'bx-chat',
  //      link: '/chat',
        
  //  },
  //  {
  //      id: 11,
 //       label: 'MENUITEMS.FILEMANAGER.TEXT',
  //      icon: 'bx-file',
   //     link: '/filemanager',
   //     badge: {
   //         variant: 'success',
   //         text: 'MENUITEMS.FILEMANAGER.BADGE',
    //    },
   // },
   
 
    
    
  
    {
        id: 48,
        label: 'User',
        icon: 'bxs-user-detail',
        subItems: [
            {
                id: 49,
                label: 'Add User',
                link: '/contacts/grid',
                parentId: 48
            },
            {
                id: 50,
                label: 'MENUITEMS.CONTACTS.LIST.USERLIST',
                link: '/contacts/list',
                parentId: 48
            },
            {
                id: 51,
                label: 'MENUITEMS.CONTACTS.LIST.PROFILE',
                link: '/contacts/profile',
                parentId: 48
            },
            {
                id: 52,
                label: 'Assign Role',
                link: '/contacts/role',
                parentId: 48
            }
          
        ]
    },
   
];

