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
            label: 'Select',
            value: 'Select',
        },{
        label: 'Alphanumeric',
        value: 'Alphanumeric',
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
            label: 'Select',
            value: 'Select',
            selected: 'selected'
        },{
        label: 'Input',
        value: 'Input'
    },
     {
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
    unitType: [
        {
            label: 'Select',
            value: 'Select'
        },
        {
            "label": "AUD",
            "value": "AUD"
        },
        {
            "label": "Barrels",
            "value": "Barrels"
        },
        {
            "label": "Celsius",
            "value": "Celsius"
        },
        {
            "label": "Centimeter",
            "value": "Centimeter"
        },
        {
            "label": "Cubit Meters",
            "value": "Cubit Meters"
        },
        {
            "label": "Day",
            "value": "Day"
        },
        {
            "label": "EURO",
            "value": "EURO"
        },
        {
            "label": "Fahrenheit",
            "value": "Fahrenheit"
        },
        {
            "label": "Feet",
            "value": "Feet"
        },
        {
            "label": "Fluid Ounce",
            "value": "Fluid Ounce"
        },
        {
            "label": "Gallon",
            "value": "Gallon"
        },
        {
            "label": "GBP",
            "value": "GBP"
        },
        {
            "label": "Gram",
            "value": "Gram"
        },
        {
            "label": "Hour",
            "value": "Hour"
        },
        {
            "label": "hours",
            "value": "hours"
        },
        {
            "label": "Inch",
            "value": "Inch"
        },
        {
            "label": "Kelvin",
            "value": "Kelvin"
        },
        {
            "label": "Kilogram",
            "value": "Kilogram"
        },
        {
            "label": "Kilolitre",
            "value": "Kilolitre"
        },
        {
            "label": "Kilometer",
            "value": "Kilometer"
        },
        {
            "label": "kWh",
            "value": "kWh"
        },
        {
            "label": "Litres",
            "value": "Litres"
        },
        {
            "label": "Meter",
            "value": "Meter"
        },
        {
            "label": "Metric tones Co2-e",
            "value": "Metric tones Co2-e"
        },
        {
            "label": "Metric tonnes",
            "value": "Metric tonnes"
        },
        {
            "label": "Metric tons (t)",
            "value": "Metric tons (t)"
        },
        {
            "label": "Metric tons CO-e (t)",
            "value": "Metric tons CO-e (t)"
        },
        {
            "label": "Mile",
            "value": "Mile"
        },
        {
            "label": "Milligram",
            "value": "Milligram"
        },
        {
            "label": "Millilitre",
            "value": "Millilitre"
        },
        {
            "label": "Millimeter",
            "value": "Millimeter"
        },
        {
            "label": "Million standard cubic feet",
            "value": "Million standard cubic feet"
        },
        {
            "label": "Million standard cubic feet per day (MMscf/day)",
            "value": "Million standard cubic feet per day (MMscf/day)"
        },
        {
            "label": "Minute",
            "value": "Minute"
        },
        {
            "label": "Month",
            "value": "Month"
        },
        {
            "label": "Numbers",
            "value": "Numbers"
        },
        {
            "label": "Ounce",
            "value": "Ounce"
        },
        {
            "label": "Pint",
            "value": "Pint"
        },
        {
            "label": "Pound",
            "value": "Pound"
        },
        {
            "label": "Second",
            "value": "Second"
        },
        {
            "label": "SGD",
            "value": "SGD"
        },
        {
            "label": "Ton",
            "value": "Ton"
        },
        {
            "label": "USD",
            "value": "USD"
        },
        {
            "label": "Week",
            "value": "Week"
        },
        {
            "label": "Yard",
            "value": "Yard"
        },
        {
            "label": "Year",
            "value": "Year"
        }
    ]
}

export const empCount = [
    {
        label: 'Select',
        value: ''
    },
    {
        label: '0-50',
        value: '50'
    },
    {
        label: '50-100',
        value: '100'
    },
    {
        label: '100-150',
        value: '150'
    }, {
        label: '150-200',
        value: '200-250'
    }
];


export const esg_admin = [{
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
    // {
    //     clsName: '',
    //     label: "Sub Sector",
    //     isActive: false,
    //     route: '/subsector',
    // },
]
},
{
    clsName: '',
    role: 'client',
    label: "Settings",
    isActive: false,
    icon1: 'settings-icon.svg',
    // icon2: 'plus-icon.svg',
    route: '/systemsettings'
}];
export const client_admin = [{
    clsName: '',
    role: 'client-admin',
    label: "Dashboard",
    isActive: true,
    icon1: 'home-icon.svg',
    icon2: '',
    route: '/'
},
{
    clsName: '',
    role: 'client-admin',
    label: "Manage Framework",
    isActive: false,
    icon1: 'frame-icon.svg',
    icon2: 'plus-icon.svg',
    subMenu: [
        {
            clsName: '',
            label: "Select Framework",
            isActive: false,
            route: '/report/create',
        },
        {
            clsName: '',
            label: "Assign Disclosures",
            isActive: false,
            route: '/report/view?isAssignDisClosure=true',
        },
    {
        clsName: '',
        label: "Create Bespoke Framework",
        isActive: false,
        route: '/template',
    },
    {
        clsName: '',
        label: "Edit Framework",
        isActive: false,
        route: '/view/template',
    }]
},
{
    clsName: '',
    role: 'client-admin',
    label: "Answer Questions",
    isActive: false,
    icon1: 'answer-question-menu.png',
    icon2: '',
    route: '/task/reports'
}, 
{
    clsName: '',
    role: 'client-admin',
    label: "Organisational Info",
    isActive: false,
    icon1: 'organisation-info-menu.png',
    icon2: '',
    route: '/organisation/info?isEditable=true'
}, 
{
    clsName: '',
    role: 'client-admin',
    label: "Publish Reports",
    isActive: false,
    icon1: 'masters-icon.svg',
    icon2: '',
    route: '/report/view'
}, 
{
    clsName: '',
    role: 'client-admin',
    label: "Intelligent Mapping",
    isActive: false,
    icon1: 'client-icon.svg',
    icon2: '',
    route: '/intelligent/mapping'
}, 
{
    clsName: '',
    role: 'client-admin',
    label: "Manage Users",
    isActive: false,
    icon1: 'settings-icon.svg',
    // icon2: 'plus-icon.svg',
    route: '/client/users'
}];

export const client_user = [{
    clsName: '',
    role: 'client-admin',
    label: "Dashboard",
    isActive: true,
    icon1: 'home-icon.svg',
    icon2: '',
    route: '/'
},
{
    clsName: '',
    role: 'client-admin',
    label: "Answer Questions",
    isActive: false,
    icon1: 'answer-question-menu.png',
    icon2: '',
    route: '/task/reports'
},  
{
    clsName: '',
    role: 'client-admin',
    label: "Publish Reports",
    isActive: false,
    icon1: 'masters-icon.svg',
    icon2: '',
    route: '/report/view'
}];