const { faker } = require('@faker-js/faker');

let locationList = [
  {building: 'National Museum of the United States Air Force', room: 1, address: '1100 Spaatz St, Dayton, OH 45433', phone_number: '937-255-3286', hours: '9:00 a.m. –5 p.m. M-F', url: 'https://www.nationalmuseum.af.mil/'},
  {building: 'Building 830 Wright-Patterson Medical Center Auditorium', room: 2, address: '4881 Sugar Maple Dr, WPAFB, OH 45433', phone_number: '937-257-0837', hours: 'schedule', url: 'https://wrightpatterson.tricare.mil/'},
  {building: 'Building 2 ID Card Section, Military Personnel Flight, 88th FSS', room: 3, address: '2000 Allbrook Drive, Bldg. 2, Area A, WPAFB, Ohio 45433', phone_number: '937-522-3664', hours: '7:30 a.m. – 3 p.m. M-F', url: 'https://www.wpafb.af.mil/Welcome/Fact-Sheets/Display/Article/917300/88-abw-id-cards-military-personnel-flight/'},
  {building: 'Building 22 Housing Office', room: 6, address: '1450 Littrell Rd, Building 22, Area A, WPAFB, OH 45433', phone_number: '937-257-6547', hours: '7:30 a.m. – 4 p.m. M-F', url: 'https://www.housing.af.mil/Home/Units/Wright-Patterson/'},
  {building: 'Building 830 Wright-Patterson Medical Center', room: 5, address: '4881 Sugar Maple Dr, WPAFB, OH 45433', phone_number: '937-257-0837', hours: '7:30 a.m. – 4:30 p.m. M-F', url: 'https://wrightpatterson.tricare.mil/'},
  {building: 'Building 50 Wright-Patterson Air Force Base Adult Education Center', room: 6, address: '2130 5th Street, Area B, WPAFB, OH, 45433', phone_number: '937-904-4801', hours: '7 a.m. – 4 p.m. M-F', url: null},
  {building: 'Building 2 Military & Family Readiness Center', room: 7, address: '2000 Allbrook Drive, Bldg. 2, Area A, WPAFB, Ohio 45433', phone_number: '937-257-3592', hours: '6:30 a.m. – 5:45 p.m. M-F', url: 'https://www.wrightpattfss.com/military-family-readiness-center'},
  {building: 'Building 1403 New Horizons Child Development Center', room: 8, address: '1403 Kuglics Blvd, Bldg. 140, Area A, WPAFB, OH 45433', phone_number: '937-904-1444', hours: '6:30 a.m. – 5:45 p.m. M-F', url: null},
  {building: 'Building 630A Wright Field North Child Development Center ', room: 9, address: '3155 Auscani Blvd, Bldg. 630A, Area B, Ascani St., WPAFB, OH 45433', phone_number: '937-255-6254', hours: '6:30 a.m. – 5:45 p.m. M-F', url: null},
  {building: 'Building 630B Wright Field South Child Development Center', room: 10, address: '3155 Auscani Blvd, Bldg. 630B, Area B, Ascani St., WPAFB, OH 45433', phone_number: '937-255-6463', hours: '6:30 a.m. – 5:45 p.m. M-F', url: 'https://www.wrightpattfss.com/child-development-center'},
];

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Locations').del()
    .then(function () {
      // Inserts seed entries
      return knex('Locations').insert(locationList);
    });
};