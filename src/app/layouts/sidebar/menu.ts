import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'Dashboard',
        link: '/dashboards/saas',
        icon: 'bx-home-circle',
       /* badge: {
            variant: 'info',
            text: 'MENUITEMS.DASHBOARDS.BADGE',
        },*/
        /*subItems: [
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
        ]*/
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
        label: 'Utilisateurs',
        icon: 'bxs-user-detail',
        subItems: [
            {
                id: 49,
                label: 'Ajouter Utilisateur',
                link: '/contacts/grid',
                parentId: 48
            },
            {
                id: 50,
                label: 'Liste des Utilisateurs',
                link: '/contacts/list',
                parentId: 48
            },
            /*{
                id: 51,
                label: 'MENUITEMS.CONTACTS.LIST.PROFILE',
                link: '/contacts/profile:id',
                parentId: 48
            },*/
            
            {
                id: 52,
                label: 'Assigner Role',
                link: '/contacts/role',
                parentId: 48
            }
            
          
        ]
    },
    {
        id:53,
        label:"Effets",
        icon:"bxs-file",
        subItems: [
            {
                id: 54,
                label: 'Ajouter Effet',
                link: '/effets/add-effet',
                parentId: 53
            },
            {
                id: 55,
                label: 'Liste des Effets ',
                link: '/effets/list-effets',
                parentId: 53
            }
        ]
    }, {
            id: 52,
            label: 'Virement',
            icon: 'bxs-bank',
            subItems: [
                {
                    id: 53,
                    label: 'Ajouter Virement',
                    link: '/virements/add',
                    parentId: 52
                },
                {
                    id: 54,
                    label: 'Liste des Virements',
                    link: '/virements/historique',
                    parentId: 52
                }
            ]
   
        },{
        id: 56,
        label: 'Chéques',
        icon: 'bxs-wallet',
        subItems: [
            {
                id: 57,
                label: 'Ajouter Cheque',
                link: '/cheques/add-cheque',
                parentId: 56
            },  
            {
                id: 58,
                label: 'Liste des Cheques',
                link: '/cheques/list-cheques',
                parentId: 56
            }
        ]
        }


   
];

