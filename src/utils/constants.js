export const mapCatagory_1 = [
    {
        name: "Environment",
        isSelected: false
    },
    {
        name: "Social",
        isSelected: false
    },
    {
        name: "Governance",
        isSelected: false
    },
    {
        name: "General",
        isSelected: false
    },
    {
        name: "Goverment",
        isSelected: false
    }
];

export const mapCatagory_2 = [
    {
        name: "Environment",
        isSelected: false
    },
    {
        name: "Social",
        isSelected: false
    },
    {
        name: "Governance",
        isSelected: false
    },
    {
        name: "General",
        isSelected: false
    },
    {
        name: "Goverment",
        isSelected: false
    }
];

export const questions = {
    dataType: [
        {
            label: 'N/A',
            value: 'N/A',
        },{
        label: 'Varchar',
        value: 'Varchar',
        selected: ''
    },
    {
        label: 'Number',
        value: 'Number'
    },
    {
        label: '%',
        value: '%',
        selected: ''
    },
    {
        label: 'Currency',
        value: 'Currency'
    },
    {
        label: 'Datetime',
        value: 'Datetime'
    }],
    inputType: [
        {
            label: 'N/A',
            value: 'N/A',
            selected: 'selected'
        },{
        label: 'Input',
        value: 'Input'
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
        value: 'Currency'
    }, {
        label: 'Multiselect',
        value: 'Multiselect',
        field_choices: []
    }],
    unitType: [{
        label: 'N/A',
        value: 'N/A'
    }, {
        label: 'Numbers',
        value: 'Numbers'
    },
    {
        label: 'Sq Mt',
        value: 'Sq Mt'
    },
    {
        label: 'kWh',
        value: 'kWh'
    }, {
        label: 'Liters',
        value: 'Liters'
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
    route: '/adminuser'
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
    {
        clsName: '',
        label: "Sectors",
        isActive: false,
        route: '/sector',
    },
    {
        clsName: '',
        label: "SubSector",
        isActive: false,
        route: '/subsector',
    },
]
},
{
    clsName: '',
    role: 'client',
    label: "System Settings",
    isActive: false,
    icon1: 'settings-icon.svg',
    // icon2: 'plus-icon.svg',
    route: '/systemsettings'
}]