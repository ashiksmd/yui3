YUI.add('datatype-date-timezone', function (Y, NAME) {

/*
 * Copyright 2012 Yahoo! Inc. All Rights Reserved. Based on code owned by VMWare, Inc.
 */
var TimezoneData, TimezoneLinks, Timezone, AjxTimezone, stdOffsets;

Y.namespace("Date.Timezone");

Y.Date.Timezone.__stdOffsets = {
   "187": { offset: 187 },
   "270": { offset: 270 },
   "240": { offset: 240 },
   "180": { offset: 180 },
   "360": { offset: 360 },
   "480": { offset: 480 },
   "390": { offset: 390 },
   "420": { offset: 420 },
   "540": { offset: 540 },
   "330": { offset: 330 },
   "427": { offset: 427 },
   "210": { offset: 210 },
   "300": { offset: 300 },
   "345": { offset: 345 },
   "-180": { offset: -180 },
   "-240": { offset: -240 },
   "-120": { offset: -120 },
   "-300": { offset: -300 },
   "-360": { offset: -360 },
   "-210": { offset: -210 },
   "600": { offset: 600 },
   "0": { offset: 0 },
   "9": { offset: 9 },
   "120": { offset: 120 },
   "660": { offset: 660 },
   "720": { offset: 720 },
   "60": { offset: 60 },
   "-60": { offset: -60 },
   "-600": { offset: -600 },
   "-420": { offset: -420 },
   "570": { offset: 570 },
   "525": { offset: 525 },
   "840": { offset: 840 },
   "-660": { offset: -660 },
   "690": { offset: 690 },
   "-480": { offset: -480 },
   "780": { offset: 780 }
};

stdOffsets = Y.Date.Timezone.__stdOffsets;
Y.Date.Timezone.__tzoneData = {
      TRANSITION_YEAR: 2012,
      TIMEZONE_RULES:{
      "Asia/Riyadh88": {
         standard: stdOffsets[187]
      },
      "Asia/Kabul": {
         standard: stdOffsets[270]
      },
      "Asia/Yerevan": {
         standard: stdOffsets[240]
      },
      "Asia/Baku": {
         standard: { offset: 240, mon: 10, week: -1, wkday: 1, hour: 5, min: 0, sec: 0 },
         daylight: { offset: 300, mon: 3, week: -1, wkday: 1, hour: 4, min: 0, sec: 0 }
      },
      "Asia/Bahrain": {
         standard: stdOffsets[180]
      },
      "Asia/Dhaka": {
         standard: stdOffsets[360]
      },
      "Asia/Thimphu": {
         standard: stdOffsets[360]
      },
      "Indian/Chagos": {
         standard: stdOffsets[360]
      },
      "Asia/Brunei": {
         standard: stdOffsets[480]
      },
      "Asia/Rangoon": {
         standard: stdOffsets[390]
      },
      "Asia/Phnom_Penh": {
         standard: stdOffsets[420]
      },
      "Asia/Harbin": {
         standard: stdOffsets[480]
      },
      "Asia/Shanghai": {
         standard: stdOffsets[480]
      },
      "Asia/Chongqing": {
         standard: stdOffsets[480]
      },
      "Asia/Urumqi": {
         standard: stdOffsets[480]
      },
      "Asia/Kashgar": {
         standard: stdOffsets[480]
      },
      "Asia/Hong_Kong": {
         standard: stdOffsets[480]
      },
      "Asia/Taipei": {
         standard: stdOffsets[480]
      },
      "Asia/Macau": {
         standard: stdOffsets[480]
      },
      "Asia/Nicosia": {
         standard: { offset: 120, mon: 10, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 180, mon: 3, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 }
      },
      "Asia/Tbilisi": {
         standard: stdOffsets[240]
      },
      "Asia/Dili": {
         standard: stdOffsets[540]
      },
      "Asia/Kolkata": {
         standard: stdOffsets[330]
      },
      "Asia/Jakarta": {
         standard: stdOffsets[427]
      },
      "Asia/Pontianak": {
         standard: stdOffsets[540]
      },
      "Asia/Tehran": {
         standard: stdOffsets[210]
      },
      "Asia/Baghdad": {
         standard: stdOffsets[180]
      },
      "Asia/Jerusalem": {
         standard: { offset: 120, mon: 10, week: 3, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: 180, mon: 3, week: 3, wkday: 6, hour: 2, min: 0, sec: 0 }
      },
      "Asia/Tokyo": {
         standard: stdOffsets[540]
      },
      "Asia/Amman": {
         standard: { offset: 120, mon: 10, week: -1, wkday: 6, hour: 0, min: 0, sec: 0 },
         daylight: { offset: 180, mon: 3, week: -1, wkday: 5, hour: 24, min: 0, sec: 0 }
      },
      "Asia/Almaty": {
         standard: stdOffsets[360]
      },
      "Asia/Qyzylorda": {
         standard: stdOffsets[360]
      },
      "Asia/Aqtobe": {
         standard: stdOffsets[300]
      },
      "Asia/Aqtau": {
         standard: stdOffsets[300]
      },
      "Asia/Oral": {
         standard: stdOffsets[300]
      },
      "Asia/Bishkek": {
         standard: stdOffsets[360]
      },
      "Asia/Seoul": {
         standard: stdOffsets[540]
      },
      "Asia/Kuwait": {
         standard: stdOffsets[180]
      },
      "Asia/Vientiane": {
         standard: stdOffsets[420]
      },
      "Asia/Beirut": {
         standard: { offset: 120, mon: 10, week: -1, wkday: 1, hour: 0, min: 0, sec: 0 },
         daylight: { offset: 180, mon: 3, week: -1, wkday: 1, hour: 0, min: 0, sec: 0 }
      },
      "Asia/Kuala_Lumpur": {
         standard: stdOffsets[480]
      },
      "Asia/Kuching": {
         standard: stdOffsets[480]
      },
      "Indian/Maldives": {
         standard: stdOffsets[300]
      },
      "Asia/Hovd": {
         standard: stdOffsets[420]
      },
      "Asia/Ulaanbaatar": {
         standard: stdOffsets[480]
      },
      "Asia/Choibalsan": {
         standard: stdOffsets[480]
      },
      "Asia/Kathmandu": {
         standard: stdOffsets[345]
      },
      "Asia/Muscat": {
         standard: stdOffsets[240]
      },
      "Asia/Karachi": {
         standard: stdOffsets[300]
      },
      "Asia/Gaza": {
         standard: { offset: 120, mon: 9, week: 1, wkday: 6, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 180, mon: 3, week: -1, wkday: 5, hour: 24, min: 0, sec: 0 }
      },
      "Asia/Hebron": {
         standard: { offset: 120, mon: 9, week: 1, wkday: 6, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 180, mon: 3, week: -1, wkday: 5, hour: 24, min: 0, sec: 0 }
      },
      "Asia/Manila": {
         standard: stdOffsets[480]
      },
      "Asia/Qatar": {
         standard: stdOffsets[180]
      },
      "Asia/Riyadh": {
         standard: stdOffsets[180]
      },
      "Asia/Singapore": {
         standard: stdOffsets[480]
      },
      "Asia/Colombo": {
         standard: stdOffsets[330]
      },
      "Asia/Damascus": {
         standard: { offset: 120, mon: 10, week: -1, wkday: 6, hour: 0, min: 0, sec: 0 },
         daylight: { offset: 180, mon: 3, week: -1, wkday: 6, hour: 0, min: 0, sec: 0 }
      },
      "Asia/Dushanbe": {
         standard: stdOffsets[300]
      },
      "Asia/Bangkok": {
         standard: stdOffsets[420]
      },
      "Asia/Ashgabat": {
         standard: stdOffsets[300]
      },
      "Asia/Dubai": {
         standard: stdOffsets[240]
      },
      "Asia/Samarkand": {
         standard: stdOffsets[300]
      },
      "Asia/Ho_Chi_Minh": {
         standard: stdOffsets[420]
      },
      "Asia/Aden": {
         standard: stdOffsets[180]
      },
      "America/Argentina/Buenos_Aires": {
         standard: stdOffsets[-180]
      },
      "America/Argentina/Cordoba": {
         standard: stdOffsets[-180]
      },
      "America/Argentina/Salta": {
         standard: stdOffsets[-180]
      },
      "America/Argentina/Tucuman": {
         standard: stdOffsets[-180]
      },
      "America/Argentina/La_Rioja": {
         standard: stdOffsets[-180]
      },
      "America/Argentina/San_Juan": {
         standard: stdOffsets[-180]
      },
      "America/Argentina/Jujuy": {
         standard: stdOffsets[-180]
      },
      "America/Argentina/Catamarca": {
         standard: stdOffsets[-180]
      },
      "America/Argentina/Mendoza": {
         standard: stdOffsets[-180]
      },
      "America/Argentina/San_Luis": {
         standard: stdOffsets[-240]
      },
      "America/Argentina/Rio_Gallegos": {
         standard: stdOffsets[-180]
      },
      "America/Argentina/Ushuaia": {
         standard: stdOffsets[-180]
      },
      "America/Aruba": {
         standard: stdOffsets[-240]
      },
      "America/La_Paz": {
         standard: stdOffsets[-240]
      },
      "America/Noronha": {
         standard: stdOffsets[-120]
      },
      "America/Belem": {
         standard: stdOffsets[-180]
      },
      "America/Santarem": {
         standard: stdOffsets[-180]
      },
      "America/Fortaleza": {
         standard: stdOffsets[-180]
      },
      "America/Recife": {
         standard: stdOffsets[-180]
      },
      "America/Araguaina": {
         standard: { offset: -180, mon: 2, week: 2, wkday: 1, hour: 0, min: 0, sec: 0 },
         daylight: { offset: -120, mon: 10, week: 2, wkday: 1, hour: 0, min: 0, sec: 0 }
      },
      "America/Maceio": {
         standard: stdOffsets[-180]
      },
      "America/Bahia": {
         standard: stdOffsets[-180]
      },
      "America/Sao_Paulo": {
         standard: { offset: -180, mon: 2, week: 2, wkday: 1, hour: 0, min: 0, sec: 0 },
         daylight: { offset: -120, mon: 10, week: 2, wkday: 1, hour: 0, min: 0, sec: 0 }
      },
      "America/Campo_Grande": {
         standard: { offset: -240, mon: 2, week: 2, wkday: 1, hour: 0, min: 0, sec: 0 },
         daylight: { offset: -180, mon: 10, week: 2, wkday: 1, hour: 0, min: 0, sec: 0 }
      },
      "America/Cuiaba": {
         standard: { offset: -240, mon: 2, week: 2, wkday: 1, hour: 0, min: 0, sec: 0 },
         daylight: { offset: -180, mon: 10, week: 2, wkday: 1, hour: 0, min: 0, sec: 0 }
      },
      "America/Porto_Velho": {
         standard: stdOffsets[-240]
      },
      "America/Boa_Vista": {
         standard: stdOffsets[-240]
      },
      "America/Manaus": {
         standard: stdOffsets[-240]
      },
      "America/Eirunepe": {
         standard: stdOffsets[-240]
      },
      "America/Rio_Branco": {
         standard: stdOffsets[-240]
      },
      "America/Santiago": {
         standard: { offset: -360, mon: 4, week: 3, wkday: 1, hour: 3, min: 0, sec: 0 },
         daylight: { offset: -300, mon: 9, week: 3, wkday: 1, hour: 4, min: 0, sec: 0 }
      },
      "America/Bogota": {
         standard: stdOffsets[-300]
      },
      "America/Curacao": {
         standard: stdOffsets[-240]
      },
      "America/Guayaquil": {
         standard: stdOffsets[-360]
      },
      "Atlantic/Stanley": {
         standard: stdOffsets[-180]
      },
      "America/Cayenne": {
         standard: stdOffsets[-180]
      },
      "America/Guyana": {
         standard: stdOffsets[-180]
      },
      "America/Asuncion": {
         standard: { offset: -240, mon: 3, week: 2, wkday: 1, hour: 0, min: 0, sec: 0 },
         daylight: { offset: -180, mon: 10, week: 2, wkday: 1, hour: 0, min: 0, sec: 0 }
      },
      "America/Lima": {
         standard: stdOffsets[-300]
      },
      "Atlantic/South_Georgia": {
         standard: stdOffsets[-120]
      },
      "America/Paramaribo": {
         standard: stdOffsets[-180]
      },
      "America/Port_of_Spain": {
         standard: stdOffsets[-240]
      },
      "America/Montevideo": {
         standard: { offset: -180, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -120, mon: 10, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Caracas": {
         standard: stdOffsets[-210]
      },
      "Antarctica/Casey": {
         standard: stdOffsets[480]
      },
      "Antarctica/Davis": {
         standard: stdOffsets[360]
      },
      "Indian/Kerguelen": {
         standard: stdOffsets[300]
      },
      "Antarctica/DumontDUrville": {
         standard: stdOffsets[600]
      },
      "Antarctica/Syowa": {
         standard: stdOffsets[180]
      },
      "Antarctica/Vostok": {
         standard: stdOffsets[360]
      },
      "Antarctica/Rothera": {
         standard: stdOffsets[-180]
      },
      "Antarctica/Palmer": {
         standard: { offset: -240, mon: 4, week: 3, wkday: 1, hour: 3, min: 0, sec: 0 },
         daylight: { offset: -180, mon: 9, week: 3, wkday: 1, hour: 4, min: 0, sec: 0 }
      },
      "Antarctica/McMurdo": {
         standard: { offset: 720, mon: 4, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: 780, mon: 9, week: -1, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "Europe/London": {
         standard: stdOffsets[0]
      },
      "WET": {
         standard: stdOffsets[0]
      },
      "Europe/Tirane": {
         standard: { offset: 60, mon: 10, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 120, mon: 3, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 }
      },
      "Europe/Andorra": {
         standard: { offset: 60, mon: 10, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 120, mon: 3, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 }
      },
      "Europe/Vienna": {
         standard: { offset: 60, mon: 10, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 120, mon: 3, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 }
      },
      "Europe/Minsk": {
         standard: stdOffsets[180]
      },
      "Europe/Brussels": {
         standard: { offset: 60, mon: 10, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 120, mon: 3, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 }
      },
      "Europe/Sofia": {
         standard: { offset: 120, mon: 10, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 180, mon: 3, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 }
      },
      "Europe/Prague": {
         standard: { offset: 60, mon: 10, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 120, mon: 3, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 }
      },
      "Europe/Copenhagen": {
         standard: { offset: 0, mon: 10, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 60, mon: 3, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 }
      },
      "America/Danmarkshavn": {
         standard: { offset: -240, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -180, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "Europe/Tallinn": {
         standard: { offset: 120, mon: 10, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 180, mon: 3, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 }
      },
      "Europe/Helsinki": {
         standard: { offset: 120, mon: 10, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 180, mon: 3, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 }
      },
      "Europe/Paris": {
         standard: stdOffsets[9]
      },
      "Europe/Berlin": {
         standard: { offset: 60, mon: 10, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 120, mon: 3, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 }
      },
      "Europe/Gibraltar": {
         standard: { offset: 60, mon: 10, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 120, mon: 3, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 }
      },
      "Europe/Athens": {
         standard: stdOffsets[120]
      },
      "Europe/Budapest": {
         standard: { offset: 60, mon: 10, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 120, mon: 3, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 }
      },
      "Atlantic/Reykjavik": {
         standard: stdOffsets[0]
      },
      "Europe/Rome": {
         standard: { offset: 60, mon: 10, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 120, mon: 3, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 }
      },
      "Europe/Riga": {
         standard: { offset: 120, mon: 10, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 180, mon: 3, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 }
      },
      "Europe/Vaduz": {
         standard: { offset: 60, mon: 10, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 120, mon: 3, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 }
      },
      "Europe/Vilnius": {
         standard: { offset: 120, mon: 10, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 180, mon: 3, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 }
      },
      "Europe/Luxembourg": {
         standard: { offset: 60, mon: 10, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 120, mon: 3, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 }
      },
      "Europe/Malta": {
         standard: { offset: 60, mon: 10, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 120, mon: 3, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 }
      },
      "Europe/Chisinau": {
         standard: { offset: 120, mon: 10, week: -1, wkday: 1, hour: 0, min: 0, sec: 0 },
         daylight: { offset: 180, mon: 3, week: -1, wkday: 1, hour: 0, min: 0, sec: 0 }
      },
      "Europe/Monaco": {
         standard: { offset: 60, mon: 10, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 120, mon: 3, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 }
      },
      "Europe/Amsterdam": {
         standard: { offset: 60, mon: 10, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 120, mon: 3, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 }
      },
      "Europe/Oslo": {
         standard: { offset: 60, mon: 10, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 120, mon: 3, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 }
      },
      "Europe/Warsaw": {
         standard: { offset: 60, mon: 10, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 120, mon: 3, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 }
      },
      "Europe/Lisbon": {
         standard: { offset: 0, mon: 10, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 60, mon: 3, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 }
      },
      "Europe/Bucharest": {
         standard: { offset: 120, mon: 10, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 180, mon: 3, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 }
      },
      "Europe/Kaliningrad": {
         standard: stdOffsets[180]
      },
      "Europe/Moscow": {
         standard: stdOffsets[240]
      },
      "Europe/Volgograd": {
         standard: stdOffsets[240]
      },
      "Europe/Samara": {
         standard: stdOffsets[240]
      },
      "Asia/Yekaterinburg": {
         standard: stdOffsets[360]
      },
      "Asia/Omsk": {
         standard: stdOffsets[420]
      },
      "Asia/Novosibirsk": {
         standard: stdOffsets[420]
      },
      "Asia/Novokuznetsk": {
         standard: stdOffsets[420]
      },
      "Asia/Krasnoyarsk": {
         standard: stdOffsets[480]
      },
      "Asia/Irkutsk": {
         standard: stdOffsets[540]
      },
      "Asia/Yakutsk": {
         standard: stdOffsets[600]
      },
      "Asia/Vladivostok": {
         standard: stdOffsets[660]
      },
      "Asia/Khandyga": {
         standard: stdOffsets[600]
      },
      "Asia/Sakhalin": {
         standard: stdOffsets[660]
      },
      "Asia/Magadan": {
         standard: stdOffsets[720]
      },
      "Asia/Ust-Nera": {
         standard: stdOffsets[660]
      },
      "Asia/Kamchatka": {
         standard: stdOffsets[720]
      },
      "Asia/Anadyr": {
         standard: stdOffsets[720]
      },
      "Europe/Belgrade": {
         standard: stdOffsets[60]
      },
      "Europe/Madrid": {
         standard: { offset: 0, mon: 10, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 60, mon: 3, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 }
      },
      "Europe/Stockholm": {
         standard: { offset: 60, mon: 10, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 120, mon: 3, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 }
      },
      "Europe/Zurich": {
         standard: { offset: 60, mon: 10, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 120, mon: 3, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 }
      },
      "Europe/Istanbul": {
         standard: stdOffsets[0]
      },
      "Europe/Kiev": {
         standard: { offset: 120, mon: 10, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 180, mon: 3, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 }
      },
      "Europe/Uzhgorod": {
         standard: { offset: 120, mon: 10, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 180, mon: 3, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 }
      },
      "Europe/Zaporozhye": {
         standard: { offset: 120, mon: 10, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 },
         daylight: { offset: 180, mon: 3, week: -1, wkday: 1, hour: 1, min: 0, sec: 0 }
      },
      "Europe/Simferopol": {
         standard: stdOffsets[120]
      },
      "Africa/Algiers": {
         standard: stdOffsets[60]
      },
      "Africa/Luanda": {
         standard: stdOffsets[60]
      },
      "Africa/Porto-Novo": {
         standard: stdOffsets[60]
      },
      "Africa/Gaborone": {
         standard: stdOffsets[120]
      },
      "Africa/Ouagadougou": {
         standard: stdOffsets[0]
      },
      "Africa/Bujumbura": {
         standard: stdOffsets[120]
      },
      "Africa/Douala": {
         standard: stdOffsets[60]
      },
      "Atlantic/Cape_Verde": {
         standard: stdOffsets[-60]
      },
      "Africa/Bangui": {
         standard: stdOffsets[60]
      },
      "Africa/Ndjamena": {
         standard: stdOffsets[60]
      },
      "Indian/Comoro": {
         standard: stdOffsets[180]
      },
      "Africa/Kinshasa": {
         standard: stdOffsets[120]
      },
      "Africa/Brazzaville": {
         standard: stdOffsets[60]
      },
      "Africa/Abidjan": {
         standard: stdOffsets[0]
      },
      "Africa/Djibouti": {
         standard: stdOffsets[180]
      },
      "Africa/Cairo": {
         standard: stdOffsets[120]
      },
      "Africa/Malabo": {
         standard: stdOffsets[60]
      },
      "Africa/Asmara": {
         standard: stdOffsets[180]
      },
      "Africa/Addis_Ababa": {
         standard: stdOffsets[180]
      },
      "Africa/Libreville": {
         standard: stdOffsets[60]
      },
      "Africa/Banjul": {
         standard: stdOffsets[0]
      },
      "Africa/Accra": {
         standard: stdOffsets[0]
      },
      "Africa/Conakry": {
         standard: stdOffsets[0]
      },
      "Africa/Bissau": {
         standard: stdOffsets[0]
      },
      "Africa/Nairobi": {
         standard: stdOffsets[180]
      },
      "Africa/Maseru": {
         standard: stdOffsets[120]
      },
      "Africa/Monrovia": {
         standard: stdOffsets[0]
      },
      "Africa/Tripoli": {
         standard: { offset: 60, mon: 10, week: -1, wkday: 6, hour: 2, min: 0, sec: 0 },
         daylight: { offset: 120, mon: 3, week: -1, wkday: 6, hour: 1, min: 0, sec: 0 }
      },
      "Indian/Antananarivo": {
         standard: stdOffsets[180]
      },
      "Africa/Blantyre": {
         standard: stdOffsets[120]
      },
      "Africa/Bamako": {
         standard: stdOffsets[0]
      },
      "Africa/Nouakchott": {
         standard: stdOffsets[0]
      },
      "Indian/Mauritius": {
         standard: stdOffsets[240]
      },
      "Indian/Mayotte": {
         standard: stdOffsets[180]
      },
      "Africa/Casablanca": {
         standard: stdOffsets[0]
      },
      "Africa/El_Aaiun": {
         standard: stdOffsets[0]
      },
      "Africa/Maputo": {
         standard: stdOffsets[120]
      },
      "Africa/Windhoek": {
         standard: { offset: 60, mon: 4, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: 120, mon: 9, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "Africa/Niamey": {
         standard: stdOffsets[60]
      },
      "Africa/Lagos": {
         standard: stdOffsets[60]
      },
      "Indian/Reunion": {
         standard: stdOffsets[240]
      },
      "Africa/Kigali": {
         standard: stdOffsets[120]
      },
      "Atlantic/St_Helena": {
         standard: stdOffsets[0]
      },
      "Africa/Sao_Tome": {
         standard: stdOffsets[0]
      },
      "Africa/Dakar": {
         standard: stdOffsets[0]
      },
      "Indian/Mahe": {
         standard: stdOffsets[240]
      },
      "Africa/Freetown": {
         standard: stdOffsets[0]
      },
      "Africa/Mogadishu": {
         standard: stdOffsets[180]
      },
      "Africa/Johannesburg": {
         standard: stdOffsets[120]
      },
      "Africa/Khartoum": {
         standard: stdOffsets[180]
      },
      "Africa/Juba": {
         standard: stdOffsets[180]
      },
      "Africa/Mbabane": {
         standard: stdOffsets[120]
      },
      "Africa/Dar_es_Salaam": {
         standard: stdOffsets[180]
      },
      "Africa/Lome": {
         standard: stdOffsets[0]
      },
      "Africa/Tunis": {
         standard: stdOffsets[60]
      },
      "Africa/Kampala": {
         standard: stdOffsets[180]
      },
      "Africa/Lusaka": {
         standard: stdOffsets[120]
      },
      "Africa/Harare": {
         standard: stdOffsets[120]
      },
      "Asia/Riyadh89": {
         standard: stdOffsets[187]
      },
      "EST": {
         standard: stdOffsets[0]
      },
      "America/New_York": {
         standard: { offset: -300, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -240, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Chicago": {
         standard: { offset: -360, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -300, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/North_Dakota/Center": {
         standard: { offset: -360, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -300, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/North_Dakota/New_Salem": {
         standard: { offset: -360, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -300, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/North_Dakota/Beulah": {
         standard: { offset: -360, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -300, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Denver": {
         standard: { offset: -420, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -360, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Los_Angeles": {
         standard: { offset: -480, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -420, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Juneau": {
         standard: { offset: -600, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -540, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "Pacific/Honolulu": {
         standard: stdOffsets[-600]
      },
      "America/Phoenix": {
         standard: stdOffsets[-420]
      },
      "America/Boise": {
         standard: { offset: -420, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -360, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Indiana/Indianapolis": {
         standard: { offset: -300, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -240, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Indiana/Marengo": {
         standard: { offset: -300, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -240, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Indiana/Vincennes": {
         standard: { offset: -300, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -240, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Indiana/Tell_City": {
         standard: { offset: -360, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -300, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Indiana/Petersburg": {
         standard: { offset: -300, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -240, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Indiana/Knox": {
         standard: { offset: -360, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -300, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Indiana/Winamac": {
         standard: { offset: -300, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -240, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Indiana/Vevay": {
         standard: { offset: -300, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -240, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Kentucky/Louisville": {
         standard: { offset: -300, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -240, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Kentucky/Monticello": {
         standard: { offset: -300, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -240, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Detroit": {
         standard: { offset: -300, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -240, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Menominee": {
         standard: { offset: -360, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -300, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/St_Johns": {
         standard: { offset: -150, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -90, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Goose_Bay": {
         standard: { offset: -240, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -180, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Halifax": {
         standard: { offset: -240, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -180, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Moncton": {
         standard: { offset: -240, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -180, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Blanc-Sablon": {
         standard: { offset: -300, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -240, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Toronto": {
         standard: stdOffsets[-300]
      },
      "America/Winnipeg": {
         standard: { offset: -360, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -300, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Regina": {
         standard: stdOffsets[-360]
      },
      "America/Edmonton": {
         standard: { offset: -420, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -360, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Vancouver": {
         standard: stdOffsets[-420]
      },
      "America/Pangnirtung": {
         standard: { offset: -300, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -240, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Iqaluit": {
         standard: { offset: -300, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -240, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Resolute": {
         standard: { offset: -360, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -300, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Rankin_Inlet": {
         standard: { offset: -360, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -300, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Cambridge_Bay": {
         standard: { offset: -480, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -420, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Cancun": {
         standard: { offset: -360, mon: 10, week: -1, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -300, mon: 4, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Merida": {
         standard: { offset: -360, mon: 10, week: -1, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -300, mon: 4, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Matamoros": {
         standard: { offset: -360, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -300, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Monterrey": {
         standard: { offset: -360, mon: 10, week: -1, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -300, mon: 4, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Mexico_City": {
         standard: { offset: -360, mon: 10, week: -1, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -300, mon: 4, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Ojinaga": {
         standard: { offset: -420, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -360, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Chihuahua": {
         standard: { offset: -420, mon: 10, week: -1, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -360, mon: 4, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Hermosillo": {
         standard: stdOffsets[-420]
      },
      "America/Mazatlan": {
         standard: { offset: -420, mon: 10, week: -1, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -360, mon: 4, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Bahia_Banderas": {
         standard: { offset: -360, mon: 10, week: -1, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -300, mon: 4, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Tijuana": {
         standard: { offset: -480, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -420, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Santa_Isabel": {
         standard: { offset: -480, mon: 10, week: -1, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -420, mon: 4, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Anguilla": {
         standard: stdOffsets[-240]
      },
      "America/Antigua": {
         standard: stdOffsets[-240]
      },
      "America/Nassau": {
         standard: { offset: -300, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -240, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Barbados": {
         standard: stdOffsets[-240]
      },
      "America/Belize": {
         standard: stdOffsets[-360]
      },
      "Atlantic/Bermuda": {
         standard: { offset: -240, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -180, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Cayman": {
         standard: stdOffsets[-300]
      },
      "America/Costa_Rica": {
         standard: stdOffsets[-360]
      },
      "America/Havana": {
         standard: { offset: -300, mon: 11, week: 2, wkday: 1, hour: 0, min: 0, sec: 0 },
         daylight: { offset: -240, mon: 3, week: 2, wkday: 1, hour: 0, min: 0, sec: 0 }
      },
      "America/Dominica": {
         standard: stdOffsets[-240]
      },
      "America/Santo_Domingo": {
         standard: stdOffsets[-240]
      },
      "America/El_Salvador": {
         standard: stdOffsets[-360]
      },
      "America/Grenada": {
         standard: stdOffsets[-240]
      },
      "America/Guadeloupe": {
         standard: stdOffsets[-240]
      },
      "America/Guatemala": {
         standard: stdOffsets[-360]
      },
      "America/Port-au-Prince": {
         standard: { offset: -300, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -240, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Tegucigalpa": {
         standard: stdOffsets[-360]
      },
      "America/Jamaica": {
         standard: stdOffsets[-300]
      },
      "America/Martinique": {
         standard: stdOffsets[-240]
      },
      "America/Montserrat": {
         standard: stdOffsets[-240]
      },
      "America/Managua": {
         standard: stdOffsets[-360]
      },
      "America/Panama": {
         standard: stdOffsets[-300]
      },
      "America/Puerto_Rico": {
         standard: stdOffsets[-240]
      },
      "America/St_Kitts": {
         standard: stdOffsets[-240]
      },
      "America/St_Lucia": {
         standard: stdOffsets[-240]
      },
      "America/Miquelon": {
         standard: { offset: -180, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -120, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/St_Vincent": {
         standard: stdOffsets[-240]
      },
      "America/Grand_Turk": {
         standard: { offset: -300, mon: 11, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: -240, mon: 3, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "America/Tortola": {
         standard: stdOffsets[-240]
      },
      "America/St_Thomas": {
         standard: stdOffsets[-240]
      },
      "Australia/Darwin": {
         standard: stdOffsets[570]
      },
      "Australia/Perth": {
         standard: stdOffsets[525]
      },
      "Australia/Brisbane": {
         standard: stdOffsets[600]
      },
      "Australia/Adelaide": {
         standard: { offset: 570, mon: 4, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: 630, mon: 10, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "Australia/Hobart": {
         standard: { offset: 600, mon: 4, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: 660, mon: 10, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "Australia/Melbourne": {
         standard: { offset: 600, mon: 4, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: 660, mon: 10, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "Australia/Sydney": {
         standard: { offset: 570, mon: 4, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: 630, mon: 10, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "Australia/Lord_Howe": {
         standard: { offset: 630, mon: 4, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: 660, mon: 10, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "Antarctica/Macquarie": {
         standard: stdOffsets[660]
      },
      "Indian/Christmas": {
         standard: stdOffsets[420]
      },
      "Pacific/Rarotonga": {
         standard: stdOffsets[-600]
      },
      "Indian/Cocos": {
         standard: stdOffsets[390]
      },
      "Pacific/Fiji": {
         standard: { offset: 720, mon: 1, week: 5, wkday: 1, hour: 3, min: 0, sec: 0 },
         daylight: { offset: 780, mon: 10, week: 5, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "Pacific/Gambier": {
         standard: stdOffsets[-600]
      },
      "Pacific/Guam": {
         standard: stdOffsets[600]
      },
      "Pacific/Tarawa": {
         standard: stdOffsets[840]
      },
      "Pacific/Saipan": {
         standard: stdOffsets[600]
      },
      "Pacific/Majuro": {
         standard: stdOffsets[720]
      },
      "Pacific/Chuuk": {
         standard: stdOffsets[660]
      },
      "Pacific/Nauru": {
         standard: stdOffsets[720]
      },
      "Pacific/Noumea": {
         standard: stdOffsets[660]
      },
      "Pacific/Auckland": {
         standard: { offset: 765, mon: 4, week: 2, wkday: 1, hour: 2, min: 0, sec: 0 },
         daylight: { offset: 825, mon: 9, week: -1, wkday: 1, hour: 2, min: 0, sec: 0 }
      },
      "Pacific/Niue": {
         standard: stdOffsets[-660]
      },
      "Pacific/Norfolk": {
         standard: stdOffsets[690]
      },
      "Pacific/Palau": {
         standard: stdOffsets[540]
      },
      "Pacific/Port_Moresby": {
         standard: stdOffsets[600]
      },
      "Pacific/Pitcairn": {
         standard: stdOffsets[-480]
      },
      "Pacific/Pago_Pago": {
         standard: stdOffsets[-660]
      },
      "Pacific/Apia": {
         standard: { offset: 780, mon: 4, week: 2, wkday: 1, hour: 4, min: 0, sec: 0 },
         daylight: { offset: 840, mon: 9, week: -1, wkday: 1, hour: 3, min: 0, sec: 0 }
      },
      "Pacific/Guadalcanal": {
         standard: stdOffsets[660]
      },
      "Pacific/Fakaofo": {
         standard: stdOffsets[780]
      },
      "Pacific/Tongatapu": {
         standard: stdOffsets[780]
      },
      "Pacific/Funafuti": {
         standard: stdOffsets[720]
      },
      "Pacific/Johnston": {
         standard: stdOffsets[-600]
      },
      "Pacific/Midway": {
         standard: stdOffsets[-660]
      },
      "Pacific/Wake": {
         standard: stdOffsets[720]
      },
      "Pacific/Efate": {
         standard: stdOffsets[660]
      },
      "Pacific/Wallis": {
         standard: stdOffsets[720]
      },
      "Asia/Riyadh87": {
         standard: stdOffsets[187]
      },
      "Etc/GMT": {
         standard: stdOffsets[0]
      },
      "Etc/GMT-14": {
         standard: stdOffsets[0]
      }
}};

TimezoneData = Y.Date.Timezone.__tzoneData;
Y.Date.Timezone.__tzoneLinks = {
   "Mideast/Riyadh88": "Asia/Riyadh88",
   "Europe/Nicosia": "Asia/Nicosia",
   "America/Lower_Princes": "America/Curacao",
   "America/Kralendijk": "America/Curacao",
   "Antarctica/South_Pole": "Antarctica/McMurdo",
   "Europe/Mariehamn": "Europe/Helsinki",
   "Europe/Busingen": "Europe/Zurich",
   "Europe/Vatican": "Europe/Rome",
   "Europe/San_Marino": "Europe/Rome",
   "Arctic/Longyearbyen": "Europe/Oslo",
   "Europe/Ljubljana": "Europe/Belgrade",
   "Europe/Podgorica": "Europe/Belgrade",
   "Europe/Sarajevo": "Europe/Belgrade",
   "Europe/Skopje": "Europe/Belgrade",
   "Europe/Zagreb": "Europe/Belgrade",
   "Europe/Bratislava": "Europe/Prague",
   "Mideast/Riyadh89": "Asia/Riyadh89",
   "Africa/Asmera": "Africa/Asmara",
   "Africa/Timbuktu": "Africa/Bamako",
   "America/Argentina/ComodRivadavia": "America/Argentina/Catamarca",
   "America/Atka": "America/Adak",
   "America/Buenos_Aires": "America/Argentina/Buenos_Aires",
   "America/Catamarca": "America/Argentina/Catamarca",
   "America/Coral_Harbour": "America/Atikokan",
   "America/Cordoba": "America/Argentina/Cordoba",
   "America/Ensenada": "America/Tijuana",
   "America/Fort_Wayne": "America/Indiana/Indianapolis",
   "America/Indianapolis": "America/Indiana/Indianapolis",
   "America/Jujuy": "America/Argentina/Jujuy",
   "America/Knox_IN": "America/Indiana/Knox",
   "America/Louisville": "America/Kentucky/Louisville",
   "America/Mendoza": "America/Argentina/Mendoza",
   "America/Porto_Acre": "America/Rio_Branco",
   "America/Rosario": "America/Argentina/Cordoba",
   "America/Virgin": "America/St_Thomas",
   "Asia/Ashkhabad": "Asia/Ashgabat",
   "Asia/Chungking": "Asia/Chongqing",
   "Asia/Dacca": "Asia/Dhaka",
   "Asia/Katmandu": "Asia/Kathmandu",
   "Asia/Calcutta": "Asia/Kolkata",
   "Asia/Macao": "Asia/Macau",
   "Asia/Tel_Aviv": "Asia/Jerusalem",
   "Asia/Saigon": "Asia/Ho_Chi_Minh",
   "Asia/Thimbu": "Asia/Thimphu",
   "Asia/Ujung_Pandang": "Asia/Makassar",
   "Asia/Ulan_Bator": "Asia/Ulaanbaatar",
   "Atlantic/Faeroe": "Atlantic/Faroe",
   "Atlantic/Jan_Mayen": "Europe/Oslo",
   "Australia/ACT": "Australia/Sydney",
   "Australia/Canberra": "Australia/Sydney",
   "Australia/LHI": "Australia/Lord_Howe",
   "Australia/NSW": "Australia/Sydney",
   "Australia/North": "Australia/Darwin",
   "Australia/Queensland": "Australia/Brisbane",
   "Australia/South": "Australia/Adelaide",
   "Australia/Tasmania": "Australia/Hobart",
   "Australia/Victoria": "Australia/Melbourne",
   "Australia/West": "Australia/Perth",
   "Australia/Yancowinna": "Australia/Broken_Hill",
   "Brazil/Acre": "America/Rio_Branco",
   "Brazil/DeNoronha": "America/Noronha",
   "Brazil/East": "America/Sao_Paulo",
   "Brazil/West": "America/Manaus",
   "Canada/Atlantic": "America/Halifax",
   "Canada/Central": "America/Winnipeg",
   "Canada/East-Saskatchewan": "America/Regina",
   "Canada/Eastern": "America/Toronto",
   "Canada/Mountain": "America/Edmonton",
   "Canada/Newfoundland": "America/St_Johns",
   "Canada/Pacific": "America/Vancouver",
   "Canada/Saskatchewan": "America/Regina",
   "Canada/Yukon": "America/Whitehorse",
   "Chile/Continental": "America/Santiago",
   "Chile/EasterIsland": "Pacific/Easter",
   "Cuba": "America/Havana",
   "Egypt": "Africa/Cairo",
   "Eire": "Europe/Dublin",
   "Europe/Belfast": "Europe/London",
   "Europe/Tiraspol": "Europe/Chisinau",
   "GB": "Europe/London",
   "GB-Eire": "Europe/London",
   "GMT+0": "Etc/GMT",
   "GMT-0": "Etc/GMT",
   "GMT0": "Etc/GMT",
   "Greenwich": "Etc/GMT",
   "Hongkong": "Asia/Hong_Kong",
   "Iceland": "Atlantic/Reykjavik",
   "Iran": "Asia/Tehran",
   "Israel": "Asia/Jerusalem",
   "Jamaica": "America/Jamaica",
   "Japan": "Asia/Tokyo",
   "Kwajalein": "Pacific/Kwajalein",
   "Libya": "Africa/Tripoli",
   "Mexico/BajaNorte": "America/Tijuana",
   "Mexico/BajaSur": "America/Mazatlan",
   "Mexico/General": "America/Mexico_City",
   "NZ": "Pacific/Auckland",
   "NZ-CHAT": "Pacific/Chatham",
   "Navajo": "America/Denver",
   "PRC": "Asia/Shanghai",
   "Pacific/Samoa": "Pacific/Pago_Pago",
   "Pacific/Yap": "Pacific/Chuuk",
   "Pacific/Truk": "Pacific/Chuuk",
   "Pacific/Ponape": "Pacific/Pohnpei",
   "Poland": "Europe/Warsaw",
   "Portugal": "Europe/Lisbon",
   "ROC": "Asia/Taipei",
   "ROK": "Asia/Seoul",
   "Singapore": "Asia/Singapore",
   "Turkey": "Europe/Istanbul",
   "UCT": "Etc/UCT",
   "US/Alaska": "America/Anchorage",
   "US/Aleutian": "America/Adak",
   "US/Arizona": "America/Phoenix",
   "US/Central": "America/Chicago",
   "US/East-Indiana": "America/Indiana/Indianapolis",
   "US/Eastern": "America/New_York",
   "US/Hawaii": "Pacific/Honolulu",
   "US/Indiana-Starke": "America/Indiana/Knox",
   "US/Michigan": "America/Detroit",
   "US/Mountain": "America/Denver",
   "US/Pacific": "America/Los_Angeles",
   "US/Samoa": "Pacific/Pago_Pago",
   "UTC": "Etc/UTC",
   "Universal": "Etc/UTC",
   "W-SU": "Europe/Moscow",
   "Zulu": "Etc/UTC",
   "US/Pacific-New": "America/Los_Angeles",
   "America/Shiprock": "America/Denver",
   "America/St_Barthelemy": "America/Guadeloupe",
   "America/Marigot": "America/Guadeloupe",
   "Mideast/Riyadh87": "Asia/Riyadh87",
   "GMT": "Etc/GMT",
   "Etc/Universal": "Etc/UTC",
   "Etc/Zulu": "Etc/UTC",
   "Etc/Greenwich": "Etc/GMT",
   "Etc/GMT-0": "Etc/GMT",
   "Etc/GMT+0": "Etc/GMT",
   "Etc/GMT0": "Etc/GMT"
};

TimezoneLinks = Y.Date.Timezone.__tzoneLinks;
/**
 * Timezone performs operations on a given timezone string represented in Olson tz database
 * This module uses parts of zimbra AjxTimezone to handle time-zones
 * @module datatype-date-timezone
 * @requires intl-common
 */

/**
 * Class to handle timezones
 * @class __zTimezone
 * @namespace Date
 * @private
 * @constructor
 */
Y.Date.__zTimezone = function() {};

AjxTimezone = Y.Date.__zTimezone;

Y.mix(AjxTimezone, {
    /**
     * Get DST trasition date
     * @method getTransition
     * @static
     * @param onset {Object} DST transition information
     * @param year {Number} Year in which transition date is calculated
     * @return {Array} Transition as [year, month, day]
     */
    getTransition: function(onset, year) {
        var trans = [ year || new Date().getFullYear(), onset.mon, 1 ], date, wkday, adjust, last, count;
        if (onset.mday) {
            trans[2] = onset.mday;
        }
        else if (onset.wkday) {
            date = new Date(year, onset.mon - 1, 1, onset.hour, onset.min, onset.sec);

            // last wkday of month
            if (onset.week === -1) {
                // NOTE: This creates a date of the *last* day of specified month by
                //       setting the month to *next* month and setting day of month
                //       to zero (i.e. the day *before* the first day).
                last = new Date(new Date(date.getTime()).setMonth(onset.mon, 0));
                count = last.getDate();
                wkday = last.getDay() + 1;
                adjust = wkday >= onset.wkday ? wkday - onset.wkday : 7 - onset.wkday - wkday;
                trans[2] = count - adjust;
            }

            // Nth wkday of month
            else {
                wkday = date.getDay() + 1;
                adjust = onset.wkday === wkday ? 1 :0;
                trans[2] = onset.wkday + 7 * (onset.week - adjust) - wkday + 1;
            }
        }
        return trans;
    },

    /**
     * Get dst transition rule
     * @method getRule
     * @static
     * @param tzId {Object} Timezone Id
     * @return {Object} The rule
     */
    getRule: function(tzId) {
        return TimezoneData.TIMEZONE_RULES[tzId];
    },

    /**
     * Get offset in minutes from GMT
     * @method getOffset
     * @static
     * @param tzId {String} Timezone ID
     * @param date {Date} Date on which the offset is to be found (offset may differ by date due to DST)
     * @return {Number} Offset in minutes from GMT
     */
    getOffset: function(tzId, date) {
        var rule = AjxTimezone.getRule(tzId), year, standard, stdTrans, dstTrans, month, stdMonth, dstMonth, isDST;
        if (rule && rule.daylight) {
            year = date.getFullYear();

            standard = rule.standard, daylight  = rule.daylight;
            stdTrans = AjxTimezone.getTransition(standard, year);
            dstTrans = AjxTimezone.getTransition(daylight, year);

            month    = date.getMonth()+1, day = date.getDate();
            stdMonth = stdTrans[1], stdDay = stdTrans[2];
            dstMonth = dstTrans[1], dstDay = dstTrans[2];

            // northern hemisphere
            isDST = false;
            if (dstMonth < stdMonth) {
                isDST = month > dstMonth && month < stdMonth;
                isDST = isDST || (month === dstMonth && day >= dstDay);
                isDST = isDST || (month === stdMonth && day <  stdDay);
            }

            // sorthern hemisphere
            else {
                isDST = month < dstMonth || month > stdMonth;
                isDST = isDST || (month === dstMonth && day <  dstDay);
                isDST = isDST || (month === stdMonth && day >= stdDay);
            }

            return isDST ? daylight.offset : standard.offset;
        }
        return rule ? rule.standard.offset : -(new Date().getTimezoneOffset());
    },

    /**
     * Compare rules to sort by offset
     * @method _BY_OFFSET
     * @static
     * @private
     * @param arule {Object} Rule to compare
     * @param brule {Object} Rule to compare
     * @return {Number} Difference in offsets between the rules.
               If offsets are equal, returns 1 if timezone id of arule comes first alphabetically, -1 otherwise
     */
    _BY_OFFSET: function(arule, brule) {
        // sort by offset and then by name
        var delta = arule.standard.offset - brule.standard.offset,
            aname = arule.tzId,
            bname = brule.tzId;
        if (delta === 0) {
            if (aname < bname) { delta = -1; }
            else if (aname > bname) { delta = 1; }
        }
        return delta;
    },

    _SHORT_NAMES: {},
    
    /**
     * Generate short name for a timezone like +0530 for IST
     * @method _generateShortName
     * @static
     * @private
     * @param offset {Number} Offset in minutes from GMT
     * @param [period=false] {Boolean} If true, a colon is inserted between hours and minutes
     * @return {String} Short name for timezone
     */
    _generateShortName: function(offset, period) {
        if (offset === 0) { return ""; }
        var sign = offset < 0 ? "-" : "+",
            stdOffset = Math.abs(offset),
            hours = Math.floor(stdOffset / 60),
            minutes = stdOffset % 60;

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return [sign,hours,period?":":"",minutes].join("");
    },

    /**
     * Get timezone ids matching raw offset
     * @method getCurrentTimezoneIds
     * @static
     * @param rawOffset {Number} Offset in seconds from GMT
     * @return {Array} timezone ids having the specified offset
     */
    getCurrentTimezoneIds: function(rawOffset) {
        rawOffset = rawOffset/60;	//Need offset in minutes

        var result = [],
            today = new Date(),
            tzId, link;

        for(tzId in TimezoneData.TIMEZONE_RULES) {
            if(rawOffset === 0 || AjxTimezone.getOffset(tzId, today) === rawOffset) {
                result.push(tzId);
            }
        }

        for(link in TimezoneLinks) {
            if(Y.Array.indexOf(result,TimezoneLinks[link]) !== -1) {
                result.push(link);
            }
        }
        return result;
    },

    /**
     * Get the first timezone matching rawOffset
     * @method getTimezoneIdForOffset
     * @static
     * @param rawOffset {Number} offset in seconds from GMT
     * @return {String} tzId of timezone that matches the offset. Returns empty string if no matches found
     */
    getTimezoneIdForOffset: function(rawOffset) {
        rawOffset = rawOffset/60;	//Need offset in minutes

        var etcGMTId = "Etc/GMT",
            today = new Date(),
            tzId;
        
        if(rawOffset % 60 === 0) {
            if(rawOffset !== 0) {
                etcGMTId += (rawOffset > 0? "-": "+") + rawOffset/60;
            }

            if(TimezoneData.TIMEZONE_RULES[etcGMTId] !== undefined) {
                return etcGMTId;
            }
        }
	
        for(tzId in TimezoneData.TIMEZONE_RULES) {
            if(AjxTimezone.getOffset(tzId, today) === rawOffset) {
                return tzId;
            }
        }

        return "";
    },

    /**
     * Check whether DST is active at specified date
     * @method isDST
     * @static
     * @param tzId {String} Timezone ID
     * @param date {Date}
     * @return {Number} 1 if DST is active, 0 if not, and -1 if specified timezone does not observe DST
     */
    isDST: function(tzId, date) {
        var rule = AjxTimezone.getRule(tzId),
            year,
            standard, daylight,
            stdTrans, dstTrans,
            month, day,
            stdMonth, stdDay,
            dstMonth, dstDay,
            isDSTActive;
            
        if (rule && rule.daylight) {
            year = date.getFullYear();

            standard = rule.standard, daylight  = rule.daylight;
            stdTrans = AjxTimezone.getTransition(standard, year);
            dstTrans = AjxTimezone.getTransition(daylight, year);

            month    = date.getMonth()+1, day = date.getDate();
            stdMonth = stdTrans[1], stdDay = stdTrans[2];
            dstMonth = dstTrans[1], dstDay = dstTrans[2];

            // northern hemisphere
            isDSTActive = false;
            if (dstMonth < stdMonth) {
                isDSTActive = month > dstMonth && month < stdMonth;
                isDSTActive = isDSTActive || (month === dstMonth && day >= dstDay);
                isDSTActive = isDSTActive || (month === stdMonth && day <  stdDay);
            }

            // sorthern hemisphere
            else {
                isDSTActive = month < dstMonth || month > stdMonth;
                isDSTActive = isDSTActive || (month === dstMonth && day <  dstDay);
                isDSTActive = isDSTActive || (month === stdMonth && day >= stdDay);
            }

            return isDSTActive? 1:0;
        }
        return -1;
    },

    /**
     * Check whether tzId is a valid timezone
     * @method isValidTimezoneId
     * @static
     * @param tzId {String} Timezone ID
     * @return {Boolean} true if tzId is valid, false otherwise
     */
    isValidTimezoneId: function(tzId) {
        return (TimezoneData.TIMEZONE_RULES[tzId] !== undefined || TimezoneLinks[tzId] !== undefined);
    }
});

Y.mix(AjxTimezone.prototype, {

    /**
     * Get short name of timezone
     * @method getShortName
     * @param tzId {String} Timezone ID
     * @return {String}
     */
    getShortName: function(tzId) {
        if(!AjxTimezone._SHORT_NAMES[tzId]) {
            AjxTimezone._SHORT_NAMES[tzId] = AjxTimezone._generateShortName(AjxTimezone.getOffset(tzId, new Date()), true);
        }
        var shortName = ["GMT",AjxTimezone._SHORT_NAMES[tzId]].join("");
        return shortName;
    },

    /**
     * Get medium length name of timezone
     * @method getMediumName
     * @param tzId {String} Timezone ID
     * @return {String}
     */
    getMediumName: function(tzId) {
        var mediumName = ['(',this.getShortName(tzId),') ',tzId].join("");
        return mediumName;
    },

    /**
     * Get long name of timezone
     * @method getLongName
     * @param tzId {String} Timezone Id
     * @return {String}
     */
    getLongName: AjxTimezone.prototype.getMediumName
});

/**
 * Timezone performs operations on a given timezone string represented in Olson tz database
 * @class Timezone
 * @constructor
 * @param {String} tzId TimeZone ID as in Olson tz database
 */
Y.Date.Timezone = function(tzId) {
    var normalizedId = Timezone.getNormalizedTimezoneId(tzId);
    if(normalizedId === "") {
	Y.error("Could not find timezone: " + tzId);
    }
    this.tzId = normalizedId;

    this._ajxTimeZoneInstance = new AjxTimezone();
};

Y.namespace("Date");
Timezone = Y.Date.Timezone;

Y.mix(Timezone, {
    /**
     * Get Day of Year(0-365) for the date passed
     * @method _getDOY
     * @private
     * @static
     * @param {Date} date
     * @return {Number} Day of Year
     */
    _getDOY: function (date) {
        var oneJan = new Date(date.getFullYear(),0,1);
        return Math.ceil((date - oneJan) / 86400000);
    },

    /**
     * Get integer part of floating point argument
     * @method _floatToInt
     * @static
     * @private
     * @param floatNum {Number} A real number
     * @return {Number} Integer part of floatNum
     */
    _floatToInt: function (floatNum) {
        return (floatNum < 0) ? Math.ceil(floatNum) : Math.floor(floatNum);
    },

    /**
     * Returns list of timezone Id's that have the same rawOffSet as passed in
     * @method getCurrentTimezoneIds
     * @static
     * @param {Number} rawOffset Raw offset (in seconds) from GMT.
     * @return {Array} array of timezone Id's that match rawOffset passed in to the API.
     */
    getCurrentTimezoneIds: function(rawOffset) {
        return AjxTimezone.getCurrentTimezoneIds(rawOffset);
    },

    /**
     * Given a raw offset in seconds, get the tz database ID that reflects the given raw offset, or empty string if there is no such ID.
     * Where available, the function will return an ID starting with "Etc/GMT".
     * For offsets where no such ID exists but that are used by actual time zones, the ID of one of those time zones is returned.
     * Note that the offset shown in an "Etc/GMT" ID is opposite to the value of rawOffset
     * @method getTimezoneIdForOffset
     * @static
     * @param {Number} rawOffset Offset from GMT in seconds
     * @return {String} timezone id
     */
    getTimezoneIdForOffset: function(rawOffset) {
        return AjxTimezone.getTimezoneIdForOffset(rawOffset);
    },

    /**
     * Given a wall time reference, convert it to UNIX time - seconds since Epoch
     * @method getUnixTimeFromWallTime
     * @static
     * @param {Object} walltime Walltime that needs conversion. Missing properties will be treat as 0.
     * @return {Number} UNIX time - time in seconds since Epoch
     */
    getUnixTimeFromWallTime: function(walltime) {
        /*
         * Initialize any missing properties.
         */
        if(!Y.Lang.isValue( walltime.year )) {
            walltime.year = new Date().getFullYear();	//Default to current year
        }
        if(!Y.Lang.isValue( walltime.mon )) {
            walltime.mon = 0;				//Default to January
        }
        if(!Y.Lang.isValue( walltime.mday )) {
            walltime.mday = 1;				//Default to first of month
        }
        if(!Y.Lang.isValue( walltime.hour )) {			//Default to 12 midnight
            walltime.hour = 0;
        }
        if(!Y.Lang.isValue( walltime.min )) {
            walltime.min = 0;
        }
        if(!Y.Lang.isValue( walltime.sec )) {
            walltime.sec = 0;
        }
        if(!Y.Lang.isValue( walltime.gmtoff )) {			//Default to UTC
            walltime.gmtoff = 0;
        }

        var utcTime = Date.UTC(walltime.year, walltime.mon, walltime.mday, walltime.hour, walltime.min, walltime.sec);
        utcTime -= walltime.gmtoff*1000;

        return Timezone._floatToInt(utcTime/1000);	//Unix time: count from midnight Jan 1 1970 UTC
    },

    /**
     * Checks if the timestamp passed in is a valid timestamp for this timezone and offset.
     * @method isValidTimestamp
     * @static
     * @param {String} timeStamp Time value in UTC RFC3339 format - yyyy-mm-ddThh:mm:ssZ or yyyy-mm-ddThh:mm:ss+/-HH:MM
     * @param {Number} rawOffset An offset from UTC in seconds.
     * @return {Boolean} true if valid timestamp, false otherwise
     */
    isValidTimestamp: function(timeStamp, rawOffset) {
        var regex = /^(\d\d\d\d)\-([0-1][0-9])\-([0-3][0-9])([T ])([0-2][0-9]):([0-6][0-9]):([0-6][0-9])(Z|[+\-][0-1][0-9]:[0-3][0-9])?$/,
            matches = (new RegExp(regex)).exec(timeStamp),
            year, month, day, hours, minutes, seconds, tZone,
            m31, maxDays,
            dateTimeSeparator, offset;

        //No match
        if(matches === null) {
            return false;
        }

        year = parseInt(matches[1], 10),
        month = parseInt(matches[2], 10),
        day = parseInt(matches[3], 10),
        dateTimeSeparator = matches[4],
        hours = parseInt(matches[5], 10),
        minutes = parseInt(matches[6], 10),
        seconds = parseInt(matches[7], 10),
        tZone = matches[8];
        //Month should be in 1-12
        if(month < 1 || month > 12) {
            return false;
        }

        //Months with 31 days
        m31 = [1,3,5,7,8,10,12];
        maxDays = 30;
        if(Y.Array.indexOf(m31,month) !== -1) {
            maxDays = 31;
        } else if(month === 2) {
            if(year % 400 === 0) {
                maxDays = 29;
            } else if(year % 100 === 0) {
                maxDays = 28;
            } else if(year % 4 === 0) {
                maxDays = 29;
            } else {
                maxDays = 28;
            }
        }

        //Day should be valid day for month
        if(day < 1 || day > maxDays) {
            return false;
        }

        //Hours should be in 0-23
        if(hours < 0 || hours > 23) {
            return false;
        }

        //Minutes and Seconds should in 0-59
        if(minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
            return false;
        }

        //Now verify timezone
        if(dateTimeSeparator === " " && tZone === undefined) {
            //SQL Format
            return true;
        } else if(dateTimeSeparator === "T" && tZone !== undefined) {
            //RFC3339 Format
            offset = 0;
            if(tZone !== "Z") {
                //Not UTC TimeZone
                offset = parseInt(tZone.substr(1,3), 10)*60 + parseInt(tZone.substr(4), 10);
                offset = offset*60;	//To seconds

                offset = offset * (tZone.charAt(0) === "+" ? 1 : -1);
            }
            //Check offset in timeStamp with passed rawOffset
            if(offset === rawOffset) {
                return true;
            }
        }

        //If reached here, wrong format
        return false;
    },

    /**
     * Checks if tzId passed in is a valid Timezone id in tz database.
     * @method isValidTimezoneId
     * @static
     * @param {String} tzId timezoneId to be checked for validity
     * @return {Boolean} true if tzId is a valid timezone id in tz database.
               tzId could be a "zone" id or a "link" id to be a valid tz Id. False otherwise
     */
    isValidTimezoneId: function(tzId) {
        return AjxTimezone.isValidTimezoneId(tzId);
    },

    /**
     * Returns the normalized version of the time zone ID, or empty string if tzId is not a valid time zone ID.
     * If tzId is a link Id, the standard name will be returned.
     * @method getNormalizedTimezoneId
     * @static
     * @param {String} tzId The timezone ID whose normalized form is requested.
     * @return {String} The normalized version of the timezone Id, or empty string if tzId is not a valid time zone Id.
     */
    getNormalizedTimezoneId: function(tzId) {
        if(!Timezone.isValidTimezoneId(tzId)) {
            return "";
        }
        var normalizedId,
            next = tzId;

        while(next !== undefined) {
            normalizedId = next;
            next = TimezoneLinks[normalizedId];
        }

        return normalizedId;
    }
});

Y.mix(Timezone.prototype, {
    /**
     * Parse RFC3339 date format and return the Date
     * Format: yyyy-mm-ddThh:mm:ssZ
     * @method _parseRFC3339
     * @private
     * @param {String} dString The date string to be parsed
     * @return {Date} The date represented by dString
     */
    _parseRFC3339: function(dString){
        var regexp = /(\d+)(\-)?(\d+)(\-)?(\d+)(T)?(\d+)(:)?(\d+)(:)?(\d+)(\.\d+)?(Z|([+\-])(\d+)(:)?(\d+))/,
            result = new Date(),
            d = dString.match(regexp),
            offset = 0;

        result.setUTCDate(1);
        result.setUTCFullYear(parseInt(d[1],10));
        result.setUTCMonth(parseInt(d[3],10) - 1);
        result.setUTCDate(parseInt(d[5],10));
        result.setUTCHours(parseInt(d[7],10));
        result.setUTCMinutes(parseInt(d[9],10));
        result.setUTCSeconds(parseInt(d[11],10));
        if (d[12]) {
            result.setUTCMilliseconds(parseFloat(d[12]) * 1000);
        } else {
            result.setUTCMilliseconds(0);
        }
        if (d[13] !== 'Z') {
            offset = (d[15] * 60) + parseInt(d[17],10);
            offset *= ((d[14] === '-') ? -1 : 1);
            result.setTime(result.getTime() - offset * 60 * 1000);
        }
        return result;
    },

    /**
     * Parse SQL date format and return the Date
     * Format: yyyy-mm-dd hh:mm:ss
     * @method _parseSQLFormat
     * @private
     * @param {String} dString The date string to be parsed
     * @return {Date} The date represented by dString
     */
    _parseSQLFormat: function(dString) {
        var dateTime = dString.split(" "),
            date = dateTime[0].split("-"),
            time = dateTime[1].split(":"),
            offset = AjxTimezone.getOffset(this.tzId, new Date(date[0], date[1] - 1, date[2]));
            
        return new Date(Date.UTC(date[0], date[1] - 1, date[2], time[0], time[1], time[2]) - offset*60*1000);
    },

    /**
     * Return a short name for the timezone
     * @method getShortName
     * @return {String} Short name
     */
    getShortName: function() {
        return this._ajxTimeZoneInstance.getShortName(this.tzId);
    },

    /**
     * Return a medium length name for the timezone
     * @method getMediumName
     * @return {String} Medium length name
     */
    getMediumName: function() {
        return this._ajxTimeZoneInstance.getMediumName(this.tzId);
    },

    /**
     * Return a long name for the timezone
     * @method getLongName
     * @return {String} Long name
     */
    getLongName: function() {
        return this._ajxTimeZoneInstance.getLongName(this.tzId);
    },

    /**
     * Given a timevalue representation in RFC 3339 or SQL format, convert to UNIX time - seconds since Epoch ie., since 1970-01-01T00:00:00Z
     * @method convertToIncrementalUTC
     * @param {String} timeValue TimeValue representation in RFC 3339 or SQL format.
     * @return {Number} UNIX time - time in seconds since Epoch
     */
    convertToIncrementalUTC: function(timeValue) {
        if(Y.Array.indexOf(timeValue,"T") !== -1) {
            //RFC3339
            return this._parseRFC3339(timeValue).getTime() / 1000;
        } else {
            //SQL
            return this._parseSQLFormat(timeValue).getTime() / 1000;
        }
    },

    /**
     * Given UNIX time - seconds since Epoch ie., 1970-01-01T00:00:00Z, convert the timevalue to RFC3339 format - "yyyy-mm-ddThh:mm:ssZ"
     * @method convertUTCToRFC3339Format
     * @param {Number} timeValue time value in seconds since Epoch.
     * @return {String} RFC3339 format timevalue - "yyyy-mm-ddThh:mm:ssZ"
     */
    convertUTCToRFC3339Format: function(timeValue) {
        var uTime = new Date(timeValue * 1000),
            offset = AjxTimezone.getOffset(this.tzId, uTime),
            offsetString = "Z",
            rfc3339, offsetSign,
            Utils = Y.Intl.Common;

        if(offset !== 0) {
            offsetSign = (offset > 0 ? "+": "-");
            offsetString = offsetSign + Utils.zeroPad(Math.abs(Timezone._floatToInt(offset/60)), 2) + ":" + Utils.zeroPad(offset % 60, 2);
        }

        uTime.setTime(timeValue*1000 + offset*60*1000);

        rfc3339 = Utils.zeroPad(uTime.getUTCFullYear(), 4) + "-"
                      + Utils.zeroPad((uTime.getUTCMonth() + 1), 2) + "-" + Utils.zeroPad(uTime.getUTCDate(), 2)
                      + "T" + Utils.zeroPad(uTime.getUTCHours(), 2) + ":" + Utils.zeroPad(uTime.getUTCMinutes(), 2)
                      + ":" + Utils.zeroPad(uTime.getUTCSeconds(), 2) + offsetString;

        return rfc3339;
    },

    /**
     * Given UNIX Time - seconds since Epoch ie., 1970-01-01T00:00:00Z, convert the timevalue to SQL Format - "yyyy-mm-dd hh:mm:ss"
     * @method convertUTCToSQLFormat
     * @param {Number} timeValue time value in seconds since Epoch.
     * @return {String} SQL Format timevalue - "yyyy-mm-dd hh:mm:ss"
     */
    convertUTCToSQLFormat: function(timeValue) {
        var uTime = new Date(timeValue * 1000),
            offset = AjxTimezone.getOffset(this.tzId, uTime),
            sqlDate,
            Utils = Y.Intl.Common;
            
        uTime.setTime(timeValue*1000 + offset*60*1000);

        sqlDate = Utils.zeroPad(uTime.getUTCFullYear(), 4) + "-" + Utils.zeroPad((uTime.getUTCMonth() + 1), 2)
                      + "-" + Utils.zeroPad(uTime.getUTCDate(), 2) + " " + Utils.zeroPad(uTime.getUTCHours(), 2)
                      + ":" + Utils.zeroPad(uTime.getUTCMinutes(), 2) + ":" + Utils.zeroPad(uTime.getUTCSeconds(), 2);

        return sqlDate;
    },

    /**
     * Gets the offset of this timezone in seconds from UTC
     * @method getRawOffset
     * @return {Number} offset of this timezone in seconds from UTC
     */
    getRawOffset: function() {
        return AjxTimezone.getOffset(this.tzId, new Date()) * 60;
    },

    /**
     * Given a unix time, convert it to wall time for this timezone.
     * @method getWallTimeFromUnixTime
     * @param {Number} timeValue value in seconds from Epoch.
     * @return {Object} an object with the properties: sec, min, hour, mday, mon, year, wday, yday, isdst, gmtoff, zone.
           All of these are integers except for zone, which is a string. isdst is 1 if DST is active, and 0 if DST is inactive.
     */
    getWallTimeFromUnixTime: function(timeValue) {
        var offset = AjxTimezone.getOffset(this.tzId, new Date(timeValue*1000)) * 60,
            localTimeValue = timeValue + offset,
            date = new Date(localTimeValue*1000),
            walltime = {
                sec: date.getUTCSeconds(),
                min: date.getUTCMinutes(),
                hour: date.getUTCHours(),
                mday: date.getUTCDate(),
                mon: date.getUTCMonth(),
                year: date.getUTCFullYear(),
                wday: date.getUTCDay(),
                yday: Timezone._getDOY(date),
                isdst: AjxTimezone.isDST(this.tzId, new Date(timeValue)),
                gmtoff: offset,
                zone: this.tzId
            };

        return walltime;
    }
});


}, '@VERSION@', {"requires": ["intl-common"]});
