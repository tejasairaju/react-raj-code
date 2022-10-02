export const questions = {
    dataType: [{
        label: 'Varchar',
        value: 'varchar'
    },
    {
        label: 'Number',
        value: 'number'
    },
    {
        label: '%',
        value: 'percentage'
    },
    {
        label: 'Currency',
        value: 'currency'
    },
    {
        label: 'Datetime',
        value: 'datetime'
    }],
    inputType: [{
        label: 'Input',
        value: 'input'
    }, {
        label: 'Dropdown',
        value: 'Dropdown',
        field_choices: []
    },
    {
        label: 'Radio button',
        value: 'Radio button',
        field_choices: []
    },
    {
        label: 'Currency',
        value: 'currency'
    }, {
        label: 'Multiselect',
        value: 'Multiselect',
        field_choices: []
    }],
    unitType: [{
        label: 'N/A',
        value: 'notapplicable'
    }, {
        label: 'Numbers',
        value: 'numbers'
    },
    {
        label: 'Sq Mt',
        value: 'sqmt'
    },
    {
        label: 'kWh',
        value: 'kwh'
    }, {
        label: 'Liters',
        value: 'liters'
    }]
}


export const clientUserMenu = [{
    clsName: '',
    role: 'client',
    label: "Home",
    isActive: true,
    icon1: 'home-icon.svg',
    icon2: '',
    route: '/'
},
{
    clsName: '',
    role: 'client',
    label: "Manage Framework",
    isActive: false,
    icon1: 'frame-icon.svg',
    icon2: 'plus-icon.svg',
    subMenu: [{
        clsName: '',
        label: "Create Framework",
        isActive: false,
        route: '/createframe',
    },
    {
        clsName: '',
        label: "Manage Framework",
        isActive: false,
        route: '/manageframework',
    },
    {
        clsName: '',
        label: "Map Disclosures",
        isActive: false,
        route: '/mapdisclosures',
    }]
},
{
    clsName: '',
    role: 'client',
    label: "Manage Client",
    isActive: false,
    icon1: 'client-icon.svg',
    icon2: '',
    route: '/manageclient'
},
{
    clsName: '',
    role: 'client',
    label: "Manage Users",
    isActive: false,
    icon1: 'users-icon.svg',
    icon2: '',
    route: '/manageusers'
}, {
    clsName: '',
    role: 'client',
    label: "Manage Masters",
    isActive: false,
    icon1: 'masters-icon.svg',
    icon2: 'plus-icon.svg',
    subMenu: [{
        clsName: '',
        label: "Country",
        isActive: false,
        route: '/country',
    },
    {
        clsName: '',
        label: "Category",
        isActive: false,
        route: '/category',
    },
]
},
{
    clsName: '',
    role: 'client',
    label: "System Settings",
    isActive: false,
    icon1: 'settings-icon.svg',
    icon2: 'plus-icon.svg',
    route: '/'
}]