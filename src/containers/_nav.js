// import React from 'react'
// import CIcon from '@coreui/icons-react'

const _nav = [
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Menu']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Post Management',
    route: '/postmanagement',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'List Post',
        icon: 'cil-star',
        to: '/postmanagement/listpost',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New',
        icon: 'cil-star',
        to: '/postmanagement/addpost',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Blog',
        icon: 'cil-star',
        to: '/postmanagement/blog',
      }
    ],
  },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Contact Management',
  //   route: '/contactmanagement',
  //   icon: 'cil-user',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'List Contact',
  //       icon: 'cil-people',
  //       to: '/contactmanagement/listcontact',
  //     }
  //   ],
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Charts',
  //   route: '/contactmanagement',
  //   icon: 'cil-chart-pie',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Chart Bar',
  //       icon: 'cil-chart-pie',
  //       to: '/charts',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Chart Doughnut',
  //       icon: 'cil-chart-pie',
  //       to: '/chartsdoughnut',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Chart Line',
  //       icon: 'cil-chart-pie',
  //       to: '/chartsline',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Chart Pie',
  //       icon: 'cil-chart-pie',
  //       to: '/chartspie',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Chart Polar Area',
  //       icon: 'cil-chart-pie',
  //       to: '/chartspolararea',
  //     }
  //   ],
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Icons',
  //   route: '/icons',
  //   icon: 'cil-star',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'CoreUI Free',
  //       to: '/icons/coreui-icons',
  //       badge: {
  //         color: 'success',
  //         text: 'NEW',
  //       },
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'CoreUI Flags',
  //       to: '/icons/flags',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'CoreUI Brands',
  //       to: '/icons/brands',
  //     },
  //   ],
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Notifications',
  //   route: '/notifications',
  //   icon: 'cil-bell',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Alerts',
  //       to: '/notifications/alerts',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Badges',
  //       to: '/notifications/badges',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Modal',
  //       to: '/notifications/modals',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Toaster',
  //       to: '/notifications/toaster'
  //     }
  //   ]
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Widgets',
  //   to: '/widgets',
  //   icon: 'cil-calculator',
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  {
    _tag: 'CSidebarNavDivider'
  },
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  }
]

export default _nav
