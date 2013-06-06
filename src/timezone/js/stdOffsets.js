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
