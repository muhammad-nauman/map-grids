var map,
    // myCenter = new google.maps.LatLng(23.1027909, 61.5539133),
    myCenter = new google.maps.LatLng(29.36847417787891, 70.04310603094801),
    gridstyle = { strokeColor: 'yellow', strokeWeight: 1 };
    gridstyleWithDoctors = { strokeColor: 'red', strokeWeight: 1 };
    selectedGrids = { strokeColor: '#92C83E', strokeWeight: 5 };
    polygons = [],
    markers = []

const SPEED = 350;
const ANIMATE_HEIGHT = { height:'toggle' }
const ANIMATE_WIDTH = { width:'toggle' }
const $SIDEBAR = $('.sidebar');
const $ACTION_BUTTON = $('.float');
let COORDS = [];
let DOCTORS = [];
let SLICK = null;
let EMPLOYEES = [];
let SPOS = [];
let TEAMS = [];
let RSM = [];
let TEAM_NAME = '';
let RSM_NAME = '';
let SPO_NAME = '';
let TERRITORY_NAME = '';
let SELECTED_GRIDS = [];
let CITIES = [];